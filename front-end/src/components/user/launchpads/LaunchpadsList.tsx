import React from 'react';
import LaunchpadSingle from "@/components/user/launchpads/LaunchpadSingle";

const LaunchpadsList: React.FC = () => {
    const fakeArray = [1, 2, 3, 4, 5, 6];

    return (
        <>
            <section className="tournament-area section-pt-120 section-pb-90">
                <div className="container">
                    <div className="tournament__wrapper">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-7 col-md-10">
                                <div className="section__title text-center mb-60">
                                    <span className="sub-title tg__animate-text">our tournament</span>
                                    <h3 className="title">play to earn games</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center gutter-25">
                            {
                                fakeArray.map((v: any, i: any) => {
                                    return (
                                        <LaunchpadSingle key={i} itemId={i}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LaunchpadsList;