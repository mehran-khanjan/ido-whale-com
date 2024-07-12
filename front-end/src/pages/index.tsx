import Header from "@/components/shared/Header";
import SingleLaunchpad from "@/components/shared/SingleLaunchpad";
import Footer from "@/components/shared/Footer";


export default function Home() {
  return (
    <>
        <Header/>

        <SingleLaunchpad title={'first launchpad'} description={'first description'}/>
        <SingleLaunchpad title={'first launchpad'} description={'first description'}/>
        <SingleLaunchpad title={'first launchpad'} description={'first description'}/>
        <SingleLaunchpad title={'first launchpad'} description={'first description'}/>

        <Footer/>
    </>
  );
}
