import React from 'react';

const RoadmapComponent: React.FC = () => {
    return(
        <>
            <section className="roadMap__area roadMap-bg section-pt-150 section-pb-150" data-background="assets/img/bg/roadmap_bg.jpg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="roadMap__inner">
                                <div className="row">
                                    <div className="col-xl-5 col-lg-6">
                                        <div className="roadMap__content">
                                            <h2 className="title">a look into roadmaps seasons</h2>
                                            <p>With Season 1 Ending with our play and Duis elementum sollicitudin is yaugue euismods Nulla ulla Player-focused updates games from Mobile App and Enjoy.</p>
                                            <a href="contact.html" className="tg-btn-1 -btn-yellow">
                                                <span>roadmap</span>
                                                <svg preserveAspectRatio="none" viewBox="0 0 197 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path className="cls-1" fill-rule="evenodd" clip-rule="evenodd"
                                                          d="M30.976 0.755987L0.75499 30.977L29.717 58.677H165.717L195.938 30.977L165.717 0.755987H30.976Z"
                                                          stroke="white" stroke-width="1.5"></path>
                                                    <path className="cls-2" fill-rule="evenodd" clip-rule="evenodd"
                                                          d="M166.712 2.01899L196.933 30.98L166.712 58.68L188.118 29.719L166.712 2.01899Z" fill="white"></path>
                                                    <path className="cls-2" fill-rule="evenodd" clip-rule="evenodd"
                                                          d="M30.235 2.01899L0.0139923 30.977L30.235 58.677L8.82899 29.719L30.235 2.01899Z" fill="white"></path>
                                                </svg>
                                            </a>
                                        </div>
                                        <div className="roadMap__img">
                                            <img src="assets/img/others/roadmap.png" className="tg-parallax"  data-scale="1.5" data-orientation="down" alt=""/>
                                        </div>
                                    </div>
                                    <div className="col-xl-7 col-lg-6">
                                        <div className="roadMap__steps-wrap">
                                            <div className="roadMap__steps-item active">
                                                <h3 className="title">season 1</h3>
                                                <ul className="roadMap__list list-wrap">
                                                    <li className="active tg__animate-text style2">Battle Practice Mode</li>
                                                    <li className="active tg__animate-text style2">Android Mobile</li>
                                                    <li className="active tg__animate-text style2">iOS Open Beta</li>
                                                    <li className="active tg__animate-text style2">Land Creation & Building</li>
                                                </ul>
                                                <img src="assets/img/others/roadmap_img.png" alt="img" className="roadMap__steps-img"/>
                                            </div>
                                            <div className="roadMap__steps-item">
                                                <h3 className="title">season 2</h3>
                                                <ul className="roadMap__list list-wrap">
                                                    <li className="active tg__animate-text style2">Land Creation & Building</li>
                                                    <li className="active tg__animate-text style2">Android Mobile</li>
                                                    <li className="tg__animate-text style2">iOS Open Beta</li>
                                                    <li className="tg__animate-text style2">Land Creation & Building</li>
                                                </ul>
                                                <img src="assets/img/others/roadmap_img.png" alt="img" className="roadMap__steps-img"/>
                                            </div>
                                            <div className="roadMap__steps-item">
                                                <h3 className="title">season 3</h3>
                                                <ul className="roadMap__list list-wrap">
                                                    <li className="tg__animate-text style2">Switch to 3D gameplay</li>
                                                    <li className="tg__animate-text style2">Android Mobile</li>
                                                    <li className="tg__animate-text style2">iOS Open Beta</li>
                                                    <li className="tg__animate-text style2">Land Creation & Building</li>
                                                </ul>
                                                <img src="assets/img/others/roadmap_img.png" alt="img" className="roadMap__steps-img"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RoadmapComponent;