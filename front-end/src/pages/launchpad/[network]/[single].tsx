import React, {ReactElement} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/layouts/MainLayout";
import HomeHero from "@/components/user/home/HomeHero";
import CustomHead from "@/components/shared/CustomHead";
import * as Yup from "yup";
import {Field, Form, Formik, FormikHelpers} from "formik";
import {parseEther} from "viem";
import {abi} from '../../../assets/abi/Launchpad.json';
import {useWriteContract} from "wagmi";

interface FormValues {
    coinValue: string;
}

const formSchema = Yup.object().shape({
    coinValue: Yup
        .number()
        .typeError('Coin value must be a number')
        .required('Required'),
});

const SingleLaunchpad: NextPageWithLayout = () => {
    const {data: hash, writeContract, isPending, error} = useWriteContract();

    const handleFormSubmit = (v: FormValues, s: FormikHelpers<FormValues>) => {
        console.log('v', v);

        // writeContract({
        //     address: process.env.NEXT_PUBLIC_FACTORY_CONTRACT_BSC_TESTNET,
        //     abi,
        //     functionName: 'swap',
        //     args: [1, parseEther(`${v.coinValue}`)],
        //     value: parseEther('1')
        // })
    }

    return (
        <>
            <CustomHead title={'Launchpads Single'}/>

            <HomeHero title={'single title'}/>

            <section className="tournament__details-area">
                <div className="container">
                    <div className="row justify-content-center">

                        <div className="col-lg-8">

                            <div className="tournament__details-content">
                                <h2 className="title">zombie land TOURNAMENT max</h2>
                                <div className="blog-post-meta">
                                    <ul className="list-wrap">
                                        <li>By<a href="#">Admin</a></li>
                                        <li><i className="far fa-calendar-alt"></i> Aug 16, 2024</li>
                                        {/*<li><i className="far fa-comments"></i><a href="#">No comments</a></li>*/}
                                    </ul>
                                </div>

                                <div className="mb-5">
                                    an image here
                                </div>

                                <p>Excepteur sint occaecat atat non proident, sunt in culpa qui officia deserunt mollit
                                    anim id est labor umLor em ipsum dolor amet consteur adiscing Duis elentum solliciin
                                    is yaugue euismods Nulla ullaorper. Ipsum is simply dummy text of printing and
                                    typeetting industry. Lorem Ipsum has been the industry's standsaard sipiscing Duis
                                    elementum solliciin. Duis aute irure dolor in repderit in voluptate velit esse
                                    cillum dolorliq commodo consequat.</p>

                                <div className="my-5">
                                    <table className="table table-responsive" style={{color: '#adb0bc'}}>
                                        <thead>
                                        <tr>
                                            <th>a</th>
                                            <th>b</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        <tr>
                                            <td>Network</td>
                                            <td>Binance Chain</td>
                                        </tr>

                                        <tr>
                                            <td>Pair</td>
                                            <td>BTC / USDT</td>
                                        </tr>

                                        <tr>
                                            <td>Price</td>
                                            <td>1BTC = 1000 BNB</td>
                                        </tr>

                                        <tr>
                                            <td>Soft Cap</td>
                                            <td>250 BNB</td>
                                        </tr>

                                        <tr>
                                            <td>Hard Cap</td>
                                            <td>2500 BNB</td>
                                        </tr>

                                        <tr>
                                            <td>End Time</td>
                                            <td>2025-10-25</td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>

                                <div className="blog-details-bottom">
                                    <div className="row">
                                        <div className="col-xl-6 col-md-7">
                                            <div className="tg-post-tags">
                                                <h5 className="tags-title">tags :</h5>
                                                <ul className="list-wrap d-flex flex-wrap align-items-center m-0">
                                                    <li><a href="#">Esports</a>,</li>
                                                    <li><a href="#">Fantasy</a>,</li>
                                                    <li><a href="#">game</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-md-5">
                                            <div
                                                className="blog-post-share justify-content-start justify-content-md-end">
                                                <h5 className="share">share :</h5>
                                                <ul className="list-wrap">
                                                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                                    <li>
                                                        <a href="#">
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M8.33192 5.92804L13.5438 0H12.3087L7.78328 5.14724L4.16883 0H0L5.46575 7.78353L0 14H1.2351L6.01407 8.56431L9.83119 14H14L8.33192 5.92804ZM6.64027 7.85211L6.08648 7.07704L1.68013 0.909771H3.57718L7.13316 5.88696L7.68694 6.66202L12.3093 13.1316H10.4123L6.64027 7.85211Z"
                                                                    fill="currentColor"/>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tournament__details-content mt-5">

                                <div className="tournament__details-form">
                                    <h4 className="tournament__details-form-title">
                                        Participate in Pre-Sale
                                    </h4>
                                    <p>
                                        How many token will you get?
                                    </p>

                                    <Formik
                                        enableReinitialize={true}
                                        initialValues={{
                                            coinValue: ''
                                        }}
                                        validationSchema={formSchema}
                                        onSubmit={async (values: FormValues, submitProps: FormikHelpers<FormValues>) => {
                                            await handleFormSubmit(values, submitProps);
                                        }}>

                                        {({errors, touched}) => (
                                            <Form>

                                                <div className="form-grp">
                                                    <label htmlFor="launchpad-contract">
                                                        Amount of Coin You Pay
                                                    </label>

                                                    <Field type="text"
                                                           name="coinValue"
                                                           className="mt-2"
                                                           placeholder="Coin Value"
                                                    />

                                                    <p className="mt-3 text-danger">
                                                        {
                                                            errors.coinValue && touched.coinValue ?
                                                                errors.coinValue
                                                                :
                                                                null
                                                        }
                                                    </p>
                                                </div>

                                                <div className="form-grp mt-4">
                                                    <label htmlFor="launchpad-contract">
                                                        Amount of Token You Receive
                                                    </label>
                                                    <input type="email"
                                                           placeholder="Token Value"
                                                           className="mt-2"
                                                           disabled={true}/>
                                                </div>

                                                <button className="tournament__details-form-btn">Buy Token</button>

                                            </Form>
                                        )}
                                    </Formik>

                                </div>


                            </div>

                        </div>

                        <div className="col-lg-4">
                            <aside className="blog-sidebar tournament__sidebar">

                                <div className="shop__widget">
                                    <h4 className="shop__widget-title">TRENDING MATCHES</h4>
                                    <div className="shop__widget-inner">
                                        <div className="trending__matches-list">
                                            <div className="trending__matches-item">
                                                <div className="trending__matches-thumb">
                                                    <a href="#"><img src="assets/img/others/trend_match01.png"
                                                                     alt="img"/></a>
                                                </div>
                                                <div className="trending__matches-content">
                                                    <div className="info">
                                                        <h5 className="title"><a href="#">FoxTie Max</a></h5>
                                                        <span className="price">$ 7500</span>
                                                    </div>
                                                    <div className="play">
                                                        <a href="https://www.youtube.com/watch?v=a3_o4SpV1vI"
                                                           className="popup-video"><i
                                                            className="far fa-play-circle"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="trending__matches-item">
                                                <div className="trending__matches-thumb">
                                                    <a href="#"><img src="assets/img/others/trend_match02.png"
                                                                     alt="img"/></a>
                                                </div>
                                                <div className="trending__matches-content">
                                                    <div className="info">
                                                        <h5 className="title"><a href="#">hatax ninja</a></h5>
                                                        <span className="price">$ 5500</span>
                                                    </div>
                                                    <div className="play">
                                                        <a href="https://www.youtube.com/watch?v=a3_o4SpV1vI"
                                                           className="popup-video"><i
                                                            className="far fa-play-circle"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="trending__matches-item">
                                                <div className="trending__matches-thumb">
                                                    <a href="#"><img src="assets/img/others/trend_match03.png"
                                                                     alt="img"/></a>
                                                </div>
                                                <div className="trending__matches-content">
                                                    <div className="info">
                                                        <h5 className="title"><a href="#">spartan ii</a></h5>
                                                        <span className="price">$ 3500</span>
                                                    </div>
                                                    <div className="play">
                                                        <a href="https://www.youtube.com/watch?v=a3_o4SpV1vI"
                                                           className="popup-video"><i
                                                            className="far fa-play-circle"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="shop__widget">
                                    <h4 className="shop__widget-title">TRENDING MATCHES</h4>
                                    <div className="shop__widget-inner">
                                        <div className="trending__matches-list">
                                            <div className="trending__matches-item">
                                                <div className="trending__matches-thumb">
                                                    <a href="#"><img src="assets/img/others/trend_match01.png"
                                                                     alt="img"/></a>
                                                </div>
                                                <div className="trending__matches-content">
                                                    <div className="info">
                                                        <h5 className="title"><a href="#">FoxTie Max</a></h5>
                                                        <span className="price">$ 7500</span>
                                                    </div>
                                                    <div className="play">
                                                        <a href="https://www.youtube.com/watch?v=a3_o4SpV1vI"
                                                           className="popup-video"><i
                                                            className="far fa-play-circle"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="trending__matches-item">
                                                <div className="trending__matches-thumb">
                                                    <a href="#"><img src="assets/img/others/trend_match02.png"
                                                                     alt="img"/></a>
                                                </div>
                                                <div className="trending__matches-content">
                                                    <div className="info">
                                                        <h5 className="title"><a href="#">hatax ninja</a></h5>
                                                        <span className="price">$ 5500</span>
                                                    </div>
                                                    <div className="play">
                                                        <a href="https://www.youtube.com/watch?v=a3_o4SpV1vI"
                                                           className="popup-video"><i
                                                            className="far fa-play-circle"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="trending__matches-item">
                                                <div className="trending__matches-thumb">
                                                    <a href="#"><img src="assets/img/others/trend_match03.png"
                                                                     alt="img"/></a>
                                                </div>
                                                <div className="trending__matches-content">
                                                    <div className="info">
                                                        <h5 className="title"><a href="#">spartan ii</a></h5>
                                                        <span className="price">$ 3500</span>
                                                    </div>
                                                    <div className="play">
                                                        <a href="https://www.youtube.com/watch?v=a3_o4SpV1vI"
                                                           className="popup-video"><i
                                                            className="far fa-play-circle"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="shop__widget">
                                    <h4 className="shop__widget-title">ADVERTISEMENT</h4>
                                    <div className="shop__widget-inner">
                                        <div className="tournament__advertisement">
                                            <a href="#"><img src="assets/img/others/tournament_ad.jpg" alt="img"/></a>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

SingleLaunchpad.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default SingleLaunchpad;