import React, {ReactElement} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/index";
import NoPageComponent from "@/components/shared/NoPageComponent";
import CustomHead from "@/components/shared/CustomHead";

const LaunchpadsHome: NextPageWithLayout = () => {
    return (
        <>
            <CustomHead title={'Launchpads List'}/>

            LaunchpadsHome
        </>
    );
}

LaunchpadsHome.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default LaunchpadsHome;