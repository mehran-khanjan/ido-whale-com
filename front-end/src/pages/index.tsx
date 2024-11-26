import Head from "next/head";
import CustomHead from "@/components/shared/CustomHead";
import {ReactElement} from "react";
import MainLayout from "@/layouts/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";
import HomeHero from "@/components/user/home/HomeHero";
import LaunchpadsList from "@/components/user/launchpads/LaunchpadsList";
import SecondStyleLaunchpadList from "@/components/user/launchpads/SecondStyleLaunchpadList";
import RoadmapComponent from "@/components/user/about/RoadmapComponent";


const Home: NextPageWithLayout = () => {
    return (
        <>
            <CustomHead title={'Home'}/>

            <HomeHero title={'IDO Whale'} description={'Don\'t miss any IDO'} isNeedButton={true}/>

            <LaunchpadsList/>

            <SecondStyleLaunchpadList/>

            <RoadmapComponent/>

        </>
    );
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default Home;
