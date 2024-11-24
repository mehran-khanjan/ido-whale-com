import React from 'react';
import {useRouter} from "next/router";

type PropsType = {
    itemId: number;
}

const LaunchpadSingle: React.FC<PropsType> = (props: PropsType) => {
    const router = useRouter();

    const createCSSClass = (uniqueId: number) => {
        let firstString = '';
        switch (uniqueId) {
            case 0:
                firstString = 'active';
                break;
            case 1:
                firstString = 'active1';
                break;
            case 2:
                firstString = 'active2';
                break;
            case 3:
                firstString = 'active3';
                break;
            case 4:
                firstString = 'active4';
                break;
            case 5:
                firstString = 'active5';
                break;
        }

        return firstString;
    }

    const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        router.push('/launchpad/bsc/0xabc');
    }

    return (
        <>
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-9"
                 onClick={handleItemClick}
                 style={{cursor: 'pointer'}}
            >
                <div className={`tournament__box-wrap ${createCSSClass(props.itemId)}`}>
                    <svg className="main-bg" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 357 533"
                         fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M2.00021 63H103C103 63 114.994 62.778 128 50C141.006 37.222 168.042 13.916 176 10C183.958 6.084 193 1.9 213 2C233 2.1 345 1 345 1C347.917 1.66957 350.51 3.33285 352.334 5.70471C354.159 8.07658 355.101 11.0093 355 14C355.093 25.1 356 515 356 515C356 515 357.368 529.61 343 530C328.632 530.39 15.0002 532 15.0002 532C15.0002 532 0.937211 535.85 1.00021 522C1.06321 508.15 2.00021 63 2.00021 63Z"
                              fill="#19222B" stroke="#4C4C4C" stroke-width="0.25"/>
                    </svg>
                    <svg className="price-bg" preserveAspectRatio="none" viewBox="0 0 166 56" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M0.00792892 55V11C0.00792892 11 -0.729072 0.988 12.0079 1C24.7449 1.012 160.008 0 160.008 0C160.008 0 172.491 1.863 161.008 10C148.995 18.512 115.008 48 115.008 48C115.008 48 110.021 55.238 90.0079 55C69.9949 54.762 0.00792892 55 0.00792892 55Z"
                              fill="currentcolor"/>
                    </svg>
                    <div className="tournament__box-price">
                        <i className="fas fa-trophy"></i>
                        <span>25000</span>
                    </div>
                    <div className="tournament__box-countdown">
                        <div className="coming-time" data-countdown="2025/5/16"></div>
                    </div>
                    <div className="tournament__box-caption">
                        <span className="sub">TOURNAMENT</span>
                        <h4 className="title">of weekly</h4>
                    </div>
                    <div className="tournament__box-prize">
                        <i className="fas fa-trophy"></i>
                        <span>3 prize Places</span>
                    </div>
                    <ul className="tournament__box-list list-wrap">
                        <li>
                            <div className="tournament__box-list-item">
                                <div className="tournament__player-thumb">
                                    <img src="assets/img/others/tournament01.jpg" alt="img"/>
                                </div>
                                <h6 className="tournament__player-name">black ninja</h6>
                                <span className="tournament__player-price">$ 75000 <i
                                    className="fas fa-bolt"></i></span>
                            </div>
                        </li>
                        <li>
                            <div className="tournament__box-list-item">
                                <div className="tournament__player-thumb">
                                    <img src="assets/img/others/tournament02.jpg" alt="img"/>
                                </div>
                                <h6 className="tournament__player-name">Foxtie Max</h6>
                                <span className="tournament__player-price">$ 65000 <i
                                    className="fas fa-bolt"></i></span>
                            </div>
                        </li>
                        <li>
                            <div className="tournament__box-list-item">
                                <div className="tournament__player-thumb">
                                    <img src="assets/img/others/tournament03.jpg" alt="img"/>
                                </div>
                                <h6 className="tournament__player-name">Holam Doxe</h6>
                                <span className="tournament__player-price">$ 55000 <i
                                    className="fas fa-bolt"></i></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default LaunchpadSingle;