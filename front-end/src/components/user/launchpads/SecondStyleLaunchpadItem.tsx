import React from 'react';
import {useRouter} from "next/router";

const SecondStyleLaunchpadItem: React.FC = () => {
    const router = useRouter();

    const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        router.push('/launchpad/bsc/0xabc');
    }

    return(
        <>
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-9" onClick={handleItemClick}
            style={{cursor: 'pointer'}}>
                <div className="nft-item__box">
                    <div className="nft-item__thumb">
                        <a href="shop-details.html"><img src="assets/img/nft/nft_img01.jpg" alt="img"/></a>
                    </div>
                    <div className="nft-item__content">
                        <h4 className="title"><a href="shop-details.html">wolf gaming art</a></h4>
                        <div className="nft-item__avatar">
                            <div className="avatar-img">
                                <a href="shop-details.html"><img src="assets/img/nft/nft_avatar.png"
                                                                 alt="img"/></a>
                            </div>
                            <div className="avatar-name">
                                <h5 className="name"><a href="shop-details.html">Alax Max</a></h5>
                                <span className="designation">Creator</span>
                            </div>
                        </div>
                        <div className="nft-item__bid">
                            <div className="nft-item__price">
                                <p>1.002 <span className="currency">Eth</span></p>
                                <a href="shop-details.html" className="bid-btn">Bid <i
                                    className="fas fa-long-arrow-alt-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SecondStyleLaunchpadItem;