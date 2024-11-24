import React from 'react';
import SecondStyleLaunchpadItem from "@/components/user/launchpads/SecondStyleLaunchpadItem";

const SecondStyleLaunchpadList: React.FC = () => {
    const fakeArray = [1,2,3,4];

    return (
        <>
            <section className="nft-item__area">
                <div className="container custom-container">
                    <div className="row justify-content-center">
                        {
                            fakeArray.map((v: any, i: any) => {
                                return(
                                    <SecondStyleLaunchpadItem key={i} />
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default SecondStyleLaunchpadList;