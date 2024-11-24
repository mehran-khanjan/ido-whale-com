import React from 'react';

type PropsType = {
    title: string;
    description?: string;
    subDescription?: string;
    isNeedButton?: boolean;
}

const HomeHero: React.FC<PropsType> = (props: PropsType) => {
    return (
        <>
            <section className="slider__area slider__bg" data-background="assets/img/slider/slider_bg.jpg">
                <div className="slider-activee">
                    <div className="single-slider">
                        <div className="container custom-container">
                            <div className="row justify-content-between">
                                <div className="col-12">
                                    <div className="slider__content text-center">

                                        {props.subDescription &&
                                            <>
                                                <h6 className="custom-sub-title" data-wow-delay=".2s">
                                                    {props.subDescription}
                                                </h6>
                                            </>
                                        }

                                        {
                                            <h2 className="title wow fadeInUp" data-wow-delay=".5s">
                                                {props.title}
                                            </h2>
                                        }

                                        {props.description &&
                                            <p className="wow fadeInUp" data-wow-delay=".8s">
                                                {props.description}
                                            </p>
                                        }

                                        {props.isNeedButton &&
                                            <div className="slider__btn wow fadeInUp" data-wow-delay="1.2s">
                                                <a href="contact.html" className="tg-btn-1">
                                                    <span>Explore Launchpads</span>
                                                    <svg preserveAspectRatio="none" viewBox="0 0 197 60" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path className="cls-1" fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M30.976 0.755987L0.75499 30.977L29.717 58.677H165.717L195.938 30.977L165.717 0.755987H30.976Z"
                                                              stroke="white"
                                                              stroke-width="1.5"></path>
                                                        <path className="cls-2" fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M166.712 2.01899L196.933 30.98L166.712 58.68L188.118 29.719L166.712 2.01899Z"
                                                              fill="white"></path>
                                                        <path className="cls-2" fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M30.235 2.01899L0.0139923 30.977L30.235 58.677L8.82899 29.719L30.235 2.01899Z"
                                                              fill="white"></path>
                                                    </svg>
                                                </a>
                                            </div>
                                        }

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

export default HomeHero;