import React from 'react';

const CreateLaunchpadForm: React.FC = () => {
    return(
        <>
            <section className="signup__area team-bg mb-5" data-background="assets/img/bg/team_bg.jpg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-10">
                            <div className="singUp-wrap">
                                <h2 className="title">Step 1 - Create Launchpad</h2>
                                <p className="mb-5">Hey there! Ready to join the party? We just need a few details from you to get started. Let's do this!</p>

                                <form action="#" className="account__form">
                                    <div className="form-grp">
                                        <label htmlFor="launchpad-title">
                                            Launchpad Title
                                        </label>
                                        <input type="text" id="launchpad-title" placeholder="Launchpad Title"/>
                                    </div>
                                    <button type="submit" className="btn btn-two arrow-btn">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateLaunchpadForm;