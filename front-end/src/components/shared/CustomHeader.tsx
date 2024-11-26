import React, {useState} from 'react';
import UserMenu from "@/components/shared/UserMenu";

const CustomHeader: React.FC = () => {
    const [mobileMenu, setMobileMenu] = useState('');

    const handleMobileMenuClick = (e: any) => {
        if (mobileMenu === '') {
            setMobileMenu('mobile-menu-visible');
        } else if (mobileMenu === 'mobile-menu-visible') {
            setMobileMenu('');
        }
    }

    return(
        <>
            <header>
                <div id="sticky-header" className="tg-header__area transparent-header" style={{position: 'relative'}}>
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-12">
                                <div className="mobile-nav-toggler" onClick={handleMobileMenuClick}>
                                    <i className="fas fa-bars"></i>
                                </div>
                                <div className="tgmenu__wrap">
                                    <nav className="tgmenu__nav">
                                        <div className="logo">
                                            <a href="index.html"><img src="assets/img/logo/logo.png" alt="Logo"/></a>
                                        </div>
                                        <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">

                                            <UserMenu handleMobileMenuClick={handleMobileMenuClick} isMobile={false}/>

                                        </div>
                                        <div className="tgmenu__action d-none d-md-block">
                                            <ul className="list-wrap">
                                                {/*<li className="search">*/}
                                                {/*    <a href="javascript:void(0)">*/}
                                                {/*        <i className="flaticon-search-1"></i>*/}
                                                {/*    </a>*/}
                                                {/*</li>*/}
                                                <li className="header-btn">
                                                    <a href="login.html" className="tg-border-btn">
                                                        <svg preserveAspectRatio="none" viewBox="0 0 157 48" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M131.75 2L155.75 25L131.75 47L148.75 24L131.75 2Z" fill="currentColor"></path>
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M25 1L1 24.5111L25 47L8 23.4889L25 1Z" fill="currentColor"></path>
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.75 1L0.75 25L23.75 47H131.75L155.75 25L131.75 1H24.75Z" stroke="currentColor" stroke-width="1.5"></path>
                                                        </svg>
                                                        {/*<i className="flaticon-edit"></i>*/}
                                                        Connect Wallet
                                                    </a>
                                                </li>
                                                {/*<li className="side-toggle-icon">*/}
                                                {/*    <span></span>*/}
                                                {/*    <span></span>*/}
                                                {/*    <span></span>*/}
                                                {/*</li>*/}
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Mobile Menu*/}
                <div className={mobileMenu}>
                    <div className="tgmobile__menu">
                        <nav className="tgmobile__menu-box">
                            <div className="close-btn" onClick={handleMobileMenuClick}>
                                <i className="flaticon-swords-in-cross-arrangement"></i>
                            </div>
                            <div className="nav-logo">
                                <a href="index.html"><img src="assets/img/logo/logo.png" alt="Logo"/></a>
                            </div>
                            <div className="tgmobile__search">
                                <form action="#">
                                    <input type="text" placeholder="Search here..."/>
                                    <button><i className="flaticon-loupe"></i></button>
                                </form>
                            </div>
                            <div className="tgmobile__menu-outer">
                                <UserMenu handleMobileMenuClick={handleMobileMenuClick} isMobile={true}/>
                            </div>
                            <div className="social-links">
                                <ul className="list-wrap">
                                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li>
                                        <a href="#">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.33192 5.92804L13.5438 0H12.3087L7.78328 5.14724L4.16883 0H0L5.46575 7.78353L0 14H1.2351L6.01407 8.56431L9.83119 14H14L8.33192 5.92804ZM6.64027 7.85211L6.08648 7.07704L1.68013 0.909771H3.57718L7.13316 5.88696L7.68694 6.66202L12.3093 13.1316H10.4123L6.64027 7.85211Z"
                                                    fill="currentColor" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                    <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="tgmobile__menu-backdrop"></div>
                </div>
                {/*End Mobile Menu*/}

                {/*header-search*/}
                <div className="search__popup-wrap">
                    <div className="search__layer"></div>
                    <div className="search__close">
                        <span><i className="flaticon-swords-in-cross-arrangement"></i></span>
                    </div>
                    <div className="search__wrap text-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="title">... <span>Search Here</span> ...</h2>
                                    <div className="search__form">
                                        <form action="#">
                                            <input type="text" name="search" placeholder="Type keywords here" required/>
                                                <button className="search-btn"><i className="flaticon-loupe"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*header-search-end*/}

                {/*offCanvas-area*/}
                <div className="offCanvas__wrap">
                    <div className="offCanvas__body">
                        <div className="offCanvas__top">
                            <div className="offCanvas__logo logo">
                                <a href="index.html"><img src="assets/img/logo/logo.png" alt="Logo"/></a>
                            </div>
                            <div className="offCanvas__toggle">
                                <i className="flaticon-swords-in-cross-arrangement"></i>
                            </div>
                        </div>
                        <div className="offCanvas__content">
                            <h2 className="title">Best Seller of Month Ideas for <span>NFT Wallet</span></h2>
                            <div className="offCanvas__contact">
                                <h4 className="small-title">CONTACT US</h4>
                                <ul className="offCanvas__contact-list list-wrap">
                                    <li><a href="tel:93332225557">+9 333 222 5557</a></li>
                                    <li><a href="mailto:info@webmail.com">info@webmail.com</a></li>
                                    <li>New Central Park W7 Street ,New York</li>
                                </ul>
                            </div>
                            <div className="offCanvas__newsletter">
                                <h4 className="small-title">Subscribe</h4>
                                <form action="#" className="offCanvas__newsletter-form">
                                    <input type="email" placeholder="Get News & Updates"/>
                                        <button type="submit"><i className="flaticon-send"></i></button>
                                </form>
                                <p>Subscribe dolor sitamet, consectetur adiping eli. Duis esollici tudin augue.</p>
                            </div>
                            <ul className="offCanvas__social list-wrap">
                                <li>
                                    <a href="#">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.33192 5.92804L13.5438 0H12.3087L7.78328 5.14724L4.16883 0H0L5.46575 7.78353L0 14H1.2351L6.01407 8.56431L9.83119 14H14L8.33192 5.92804ZM6.64027 7.85211L6.08648 7.07704L1.68013 0.909771H3.57718L7.13316 5.88696L7.68694 6.66202L12.3093 13.1316H10.4123L6.64027 7.85211Z"
                                                fill="currentColor" />
                                        </svg>
                                    </a>
                                </li>
                                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                            </ul>
                        </div>
                        <div className="offCanvas__copyright">
                            <p>Copyright © 2024 - By <span>IDO Whale</span></p>
                        </div>
                    </div>
                </div>
                <div className="offCanvas__overlay"></div>
                {/*offCanvas-area-end*/}

            </header>
        </>
    )
}

export default CustomHeader;