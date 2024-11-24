import React, {ReactElement} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/layouts/MainLayout";
import CustomHead from "@/components/shared/CustomHead";

const LaunchpadCreate: NextPageWithLayout = () => {
    return (
        <>
            <CustomHead title={'Launchpads Create'}/>

            LaunchpadCreate
        </>
    );
}

LaunchpadCreate.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default LaunchpadCreate;