import React, { ReactPortal, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import AppBody from 'components/AppBody';
import { DASHBOARD_APP_PATHS } from 'apps/dashboard/routes/routes';
import Backdrop from 'components/Backdrop';
import AppHeader from 'components/AppHeader';
import NickJellyfin from './NickJellyfin'
import ReactDOM from 'react-dom';

export default function AppLayout() {
    const location = useLocation();
    const isNewLayoutPath = Object.values(DASHBOARD_APP_PATHS)
        .some(path => location.pathname.startsWith(`/${path}`));

    const [node, setNode] = useState<ReactPortal>();

    useEffect(()=>{
        setTimeout(() => {
            debugger
            const targetDom = document.querySelector("#iJellyfin-photos")
            if(targetDom) setNode(ReactDOM.createPortal(
                <p>
                    <h2>iJellyfin</h2>
                    <NickJellyfin></NickJellyfin>
                </p>
                , targetDom as Element))
            }, 800);
        
         
    },[])


let observer: MutationObserver;
let root: any;
function init() {
  observer?.disconnect();
  root?.unmount();

  let app ;
  // 选择需要观察变动的节点
  const targetNode = document.querySelector(".mainAnimatedPages");
  debugger
  // 观察器的配置（需要观察什么变动）
  const config = { attributes: false, childList: true, subtree: true };
  // 当观察到变动时执行的回调函数
  const callback = (mutationsList: any, observer: any) => {
    const page = document.querySelector("#itemDetailPage:not(.hide)") ?? document.querySelector(".itemView:not(.hide)")
    const sourceDom = page?.querySelector("#iJellyfin-photos")
    if (sourceDom) {
      observer?.disconnect();
      try {
        ReactDOM.createPortal(NickJellyfin, sourceDom as Element)

      } catch (error) {
        observer.observe(targetNode, config);
        console.log(error);
      }
    }
  };

  // 创建一个观察器实例并传入回调函数
  observer = new MutationObserver(callback);

  // 以上述配置开始观察目标节点
  observer.observe(targetNode as any, config);

  // 之后，可停止观察
  // observer.disconnect();
}
// init()

window.addEventListener("viewshow", (event) => {
  
  init();
});


    return (
        <>
            <Backdrop />
            <AppHeader isHidden={isNewLayoutPath} />
            {/* <NickJellyfin /> */}
            {node}
            <AppBody>
                <Outlet />
            </AppBody>
        </>
    );
}
