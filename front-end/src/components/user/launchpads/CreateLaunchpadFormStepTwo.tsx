import React from 'react';

const CreateLaunchpadFormStepTwo: React.FC = () => {
    return(
        <>
            <section className="signup__area team-bg section-pb-120" data-background="assets/img/bg/team_bg.jpg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-10">
                            <div className="singUp-wrap">
                                <h2 className="title">Step 2 - Create Launchpad</h2>
                                <p className="mb-5">Hey there! Ready to join the party? We just need a few details from you to get started. Let's do this!</p>

                                <form action="#" className="account__form">

                                    <div className="form-grp">
                                        <label htmlFor="pool-title">Pool Title</label>
                                        <input type="text" id="pool-title" placeholder="Pool Title"/>
                                    </div>

                                    <div className="form-grp">
                                        <label htmlFor="token-contract">Token Contract</label>
                                        <input type="text" id="token-contract" placeholder="Token Contract"/>
                                    </div>

                                    <div className="form-grp">
                                        <label htmlFor="token-price">Token Price</label>
                                        <input type="text" id="token-price" placeholder="Token Price"/>
                                    </div>

                                    <div className="row gutter-20">
                                        <div className="col-md-6">
                                            <div className="form-grp">
                                                <label htmlFor="min-contribution">Min Contribution</label>
                                                <input type="text" id="min-contribution" placeholder="Min Contribution"/>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-grp">
                                                <label htmlFor="max-contribution">Max Contribution</label>
                                                <input type="text" id="max-contribution" placeholder="Max Contribution"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row gutter-20">
                                        <div className="col-md-6">
                                            <div className="form-grp">
                                                <label htmlFor="soft-cap">Soft Cap</label>
                                                <input type="text" id="soft-cap" placeholder="Soft Cap"/>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-grp">
                                                <label htmlFor="hard-cap">Hard Cap</label>
                                                <input type="text" id="hard-cap" placeholder="Hard Cap"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-grp">
                                        <label htmlFor="token-price">Start Time</label>
                                        <input type="text" id="token-price" placeholder="Start Time"/>
                                    </div>

                                    <div className="form-grp">
                                        <label htmlFor="whitelisted-enable">Whitelisted Enable?</label>
                                        <input type="text" id="whitelisted-enable" placeholder="Whitelisted Enable"/>
                                    </div>

                                    <button type="submit" className="btn btn-two arrow-btn">Update</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateLaunchpadFormStepTwo;