import React, {ReactElement} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/index";
import NoPageComponent from "@/components/shared/NoPageComponent";

const NoPage: NextPageWithLayout = () => {
    return (
        <>
            <NoPageComponent/>
        </>
    );
}

NoPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default NoPage;