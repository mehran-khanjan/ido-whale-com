import React, {ReactElement} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/layouts/MainLayout";
import CustomHead from "@/components/shared/CustomHead";
import CreateLaunchpadGuide from "@/components/user/launchpads/CreateLaunchpadGuide";
import CreateLaunchpadFormStepOne from "@/components/user/launchpads/CreateLaunchpadFormStepOne";
import CreateLaunchpadFormStepTwo from "@/components/user/launchpads/CreateLaunchpadFormStepTwo";
import CreateLaunchpadHistory from "@/components/user/launchpads/CreateLaunchpadHistory";

const LaunchpadCreate: NextPageWithLayout = () => {
    return (
        <>
            <CustomHead title={'Launchpads Create'}/>

            {/*<CreateLaunchpadGuide/>*/}

            <CreateLaunchpadHistory/>

            <CreateLaunchpadFormStepOne/>

            {/*step two is getting approval from token contract address for launchpad contract*/}

            <CreateLaunchpadFormStepTwo/>

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