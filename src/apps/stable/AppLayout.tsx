import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import AppBody from 'components/AppBody';
import { DASHBOARD_APP_PATHS } from 'apps/dashboard/routes/routes';
import Backdrop from 'components/Backdrop';
import AppHeader from 'components/AppHeader';
import NickJellyfin from './NickJellyfin'

export default function AppLayout() {
    const location = useLocation();
    const isNewLayoutPath = Object.values(DASHBOARD_APP_PATHS)
        .some(path => location.pathname.startsWith(`/${path}`));

    return (
        <>
            <Backdrop />
            <AppHeader isHidden={isNewLayoutPath} />
            <NickJellyfin />
            <AppBody>
                <Outlet />
                
            </AppBody>
        </>
    );
}
