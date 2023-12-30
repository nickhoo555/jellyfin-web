import { useEffect, useState } from "react";
import "./NickJellyfin.css";

import PhotoAlbum from "react-photo-album";

import Lightbox, {
    GenericSlide,
    Slide,
    useLightboxState,
} from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import ServerConnections from "../../components/ServerConnections";
import { appHost } from '../../components/apphost';

function NickJellyfin() {
    // return <></>
    const [count, setCount] = useState(0);
    const [photos, setPhotos] = useState([
        {
            src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
            index: 0,
            width: 100,
            height: 50,
        },
    ] as any);
    const [index, setIndex] = useState(-1);
    let emby_credentials: any;

    const [animationDuration, setAnimationDuration] = useState(300);
    const [maxZoomPixelRatio, setMaxZoomPixelRatio] = useState(5);
    const [zoomInMultiplier, setZoomInMultiplier] = useState(1.5);
    const [doubleTapDelay, setDoubleTapDelay] = useState(300);
    const [doubleClickDelay, setDoubleClickDelay] = useState(300);
    const [doubleClickMaxStops, setDoubleClickMaxStops] = useState(1.5);
    const [keyboardMoveDistance, setKeyboardMoveDistance] = useState(50);
    const [wheelZoomDistanceFactor, setWheelZoomDistanceFactor] = useState(100);
    const [pinchZoomDistanceFactor, setPinchZoomDistanceFactor] = useState(100);
    const [scrollToZoom, setScrollToZoom] = useState(true);

    try {
        // iJellyfin();

        // function iJellyfin() {
        // debugger
        const url = new URL(location.href.replace("#", ""));
        const searchParams = new URLSearchParams(url.search);
        const itemKey = searchParams.get("id");

        const itemId = searchParams.get("id")??'';
        const serverId = searchParams.get("serverId")??'';
        const apiClient = ServerConnections.getApiClient(serverId);

        /* const DeviceId = localStorage.getItem("_deviceId2");
    const jellyfin_credentials = localStorage.getItem("jellyfin_credentials")
    emby_credentials = localStorage.getItem("servercredentials3")
    const Credentials = JSON.parse(
      jellyfin_credentials || emby_credentials || "{}"
    );
    const token = Credentials?.Servers[0].AccessToken;

    if (!itemKey || !DeviceId || !token) {
      // return;
      debugger
    }  */

        useEffect(() => {
            (async () => {
                debugger;

                const imageInfos = await apiClient.getItemImageInfos(itemId);
                console.log("imageInfos", imageInfos);
                console.log("appHost",appHost);
                

                /* return;
                const response = await fetch(
                    `https://jellyfin.h.nickhoo.com:10443/Items/${itemKey}/Images`,
                    {
                        headers: {
                            accept: "application/json",
                            "x-emby-authorization": `MediaBrowser Client=\"Jellyfin Web\", Device=\"Chrome\", DeviceId=\"${DeviceId}\", Version=\"10.8.11\", Token=\"${token}\"`,
                        },
                        referrerPolicy: "no-referrer",
                        body: null,
                        method: "GET",
                        mode: "cors",
                        credentials: "omit",
                    }
                );
                const data = await response.json();*/
                const images: any = [];
                const data = imageInfos
                data.forEach((item: any) => {
                    if (item.ImageType === "Backdrop") {
                        try {
                            const regex = /fanart(\d+)\./;
                            const match = item.Path.match(regex);
                            let number = 0;
                            if (match) {
                                number = match[1];
                            }

                            images.push({
                                src: `https://jellyfin.h.nickhoo.com:10443/Items/${itemKey}/Images/Backdrop/${item.ImageIndex}`,
                                index: number,
                                width: item.Width,
                                height: item.Height,
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
                images.sort((a: any, b: any) => {
                    return a.index - b.index;
                });
                setPhotos(images); 
            })();
        }, []);
    } catch (error) {
        console.log("ccccatch", error);
    }

    // }

    return (
        <div className={`iJellyfin ${emby_credentials ? "emby-photo" : ""}`}>
            <h2>Photos</h2>
            <PhotoAlbum
                photos={photos}
                layout="rows"
                targetRowHeight={200}
                onClick={({ index }) => setIndex(index)}
            />

            <Lightbox
                slides={photos}
                carousel={{ preload: 3, padding: 0 }}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                // enable optional lightbox plugins
                plugins={[
                    Captions,
                    Fullscreen,
                    Slideshow,
                    Thumbnails,
                    Video,
                    Zoom,
                ]}
                animation={{ zoom: animationDuration }}
                zoom={{
                    maxZoomPixelRatio,
                    zoomInMultiplier,
                    doubleTapDelay,
                    doubleClickDelay,
                    doubleClickMaxStops,
                    keyboardMoveDistance,
                    wheelZoomDistanceFactor,
                    pinchZoomDistanceFactor,
                    scrollToZoom,
                }}
            />
        </div>
    );
}

export default NickJellyfin;
