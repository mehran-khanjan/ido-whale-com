import React, {ReactElement} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/layouts/MainLayout";
import CustomHead from "@/components/shared/CustomHead";

const NetworkLaunchpadHome: NextPageWithLayout = () => {
    return (
        <>
            <CustomHead title={'Launchpads On A Network'}/>

            NetworkLaunchpadHome
        </>
    );
}

NetworkLaunchpadHome.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default NetworkLaunchpadHome;