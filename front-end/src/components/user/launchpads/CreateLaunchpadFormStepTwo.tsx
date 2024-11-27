import React, {useEffect} from 'react';
import * as Yup from "yup";
import {BaseError, useWriteContract} from "wagmi";
import {parseEther, parseUnits} from "viem";
import {abi} from '../../../assets/abi/Launchpad.json';
import {Field, Form, Formik, FormikHelpers} from "formik";

interface FormValues {
    launchpadContract: string;
    poolTitle: string;
    tokenContract: string;
    tokenPrice: string;
    minContribution: string;
    maxContribution: string;
    softCap: string;
    hardCap: string;
    startTime: string;
    isWhitelistedEnabled: string;
}

const formSchema = Yup.object().shape({
    launchpadContract: Yup
        .string()
        .typeError('Launchpad contract must be a string')
        .required('Required'),
    poolTitle: Yup
        .string()
        .min(5, 'Min pool title is 5 character')
        .max(32, 'Max pool title is 32 character')
        .typeError('Pool title must be a string')
        .required('Required'),
    tokenContract: Yup
        .string()
        .typeError('Token contract must be a string')
        .required('Required'),
    tokenPrice: Yup
        .number()
        .typeError('Token price must be a number')
        .required('Required'),
    minContribution: Yup
        .number()
        .typeError('Min contribution must be a number')
        .required('Required'),
    maxContribution: Yup
        .number()
        .typeError('Max contribution must be a number')
        .required('Required'),
    softCap: Yup
        .number()
        .typeError('Soft cap must be a number')
        .required('Required'),
    hardCap: Yup
        .number()
        .typeError('Hard cap must be a number')
        .required('Required'),
    startTime: Yup
        .number()
        .typeError('Start time must be a number')
        .required('Required'),
    isWhitelistedEnabled: Yup
        .string()
        .typeError('Whitelist enable must be a string')
        .required('Required'),
});

const CreateLaunchpadFormStepTwo: React.FC = () => {
    const {data: hash, writeContract, isPending, error} = useWriteContract();

    useEffect(() => {
        if (error) {
            console.log('error1', (error as BaseError).shortMessage || error.message);
        }
    }, [error]);

    const handleFormSubmit = (v: FormValues, s: FormikHelpers<FormValues>) => {
        console.log('v', v);

        writeContract({
            address: process.env.NEXT_PUBLIC_FACTORY_CONTRACT_BSC_TESTNET,
            abi,
            functionName: 'createPool',
            args: [
                v.poolTitle,
                parseEther(`${v.softCap}`),
                // parseEther(`${v.hardCap}`),
                parseUnits(`${v.tokenPrice}`, 0),
                parseEther(`${v.maxContribution}`),
                // parseEther(`${v.minContribution}`),
                v.tokenContract,
                (v.isWhitelistedEnabled === 'checked'),
                // remove these lines
                '0x80aC2F3804E595711a9bC371b5B713c5B3817e40',
                // remove these lines
                1,
                v.startTime,
                // remove these lines
                1
            ],
            value: parseEther('1')
        })
    }

    return (
        <>
            <section className="signup__area team-bg section-pb-120" data-background="assets/img/bg/team_bg.jpg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-10">
                            <div className="singUp-wrap">
                                <h2 className="title">Step 2 - Create Launchpad</h2>
                                <p className="mb-5">Hey there! Ready to join the party? We just need a few details from
                                    you to get started. Let's do this!</p>

                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        launchpadContract: '',
                                        poolTitle: '',
                                        tokenContract: '',
                                        tokenPrice: '',
                                        minContribution: '',
                                        maxContribution: '',
                                        softCap: '',
                                        hardCap: '',
                                        startTime: '',
                                        isWhitelistedEnabled: ''
                                    }}
                                    validationSchema={formSchema}
                                    onSubmit={async (values: FormValues, submitProps: FormikHelpers<FormValues>) => {
                                        await handleFormSubmit(values, submitProps);
                                    }}>

                                    {({
                                          errors,
                                          touched,
                                          values,
                                          setFieldValue
                                      }) => (
                                        <Form className="account__form">

                                            <div className="form-grp">
                                                <label htmlFor="launchpad-contract">
                                                    Launchpad Contract
                                                </label>
                                                <Field type="text"
                                                       name="launchpadContract"
                                                       id="launchpad-contract"
                                                       placeholder="Launchpad Contract"/>

                                                <p className="mt-3 text-danger">
                                                    {
                                                        errors.launchpadContract &&
                                                        touched.launchpadContract ?
                                                            errors.launchpadContract
                                                            :
                                                            null
                                                    }
                                                </p>

                                            </div>

                                            <div className="form-grp">
                                                <label htmlFor="pool-title">Pool Title</label>
                                                <Field type="text"
                                                       name="poolTitle"
                                                       id="pool-title"
                                                       placeholder="Pool Title"/>

                                                <p className="mt-3 text-danger">
                                                    {
                                                        errors.poolTitle && touched.poolTitle ?
                                                            errors.poolTitle
                                                            :
                                                            null
                                                    }
                                                </p>

                                            </div>

                                            <div className="form-grp">
                                                <label htmlFor="token-contract">Token Contract</label>
                                                <Field type="text"
                                                       name="tokenContract"
                                                       id="token-contract"
                                                       placeholder="Token Contract"/>

                                                <p className="mt-3 text-danger">
                                                    {
                                                        errors.tokenContract && touched.tokenContract ?
                                                            errors.tokenContract
                                                            :
                                                            null
                                                    }
                                                </p>

                                            </div>

                                            <div className="form-grp">
                                                <label htmlFor="token-price">Token Price</label>
                                                <Field type="text"
                                                       name="tokenPrice"
                                                       id="token-price"
                                                       placeholder="Token Price"/>

                                                <p className="mt-3 text-danger">
                                                    {
                                                        errors.tokenPrice && touched.tokenPrice ?
                                                            errors.tokenPrice
                                                            :
                                                            null
                                                    }
                                                </p>

                                            </div>

                                            <div className="row gutter-20">
                                                <div className="col-md-6">
                                                    <div className="form-grp">
                                                        <label htmlFor="min-contribution">
                                                            Min Contribution
                                                        </label>
                                                        <Field type="text"
                                                               name="minContribution"
                                                               id="min-contribution"
                                                               placeholder="Min Contribution"/>

                                                        <p className="mt-3 text-danger">
                                                            {
                                                                errors.minContribution &&
                                                                touched.minContribution ?
                                                                    errors.minContribution
                                                                    :
                                                                    null
                                                            }
                                                        </p>

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-grp">
                                                        <label htmlFor="max-contribution">Max Contribution</label>
                                                        <Field type="text"
                                                               name="maxContribution"
                                                               id="max-contribution"
                                                               placeholder="Max Contribution"/>

                                                        <p className="mt-3 text-danger">
                                                            {
                                                                errors.maxContribution &&
                                                                touched.maxContribution ?
                                                                    errors.maxContribution
                                                                    :
                                                                    null
                                                            }
                                                        </p>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row gutter-20">
                                                <div className="col-md-6">
                                                    <div className="form-grp">
                                                        <label htmlFor="soft-cap">Soft Cap</label>
                                                        <Field type="text"
                                                               name="softCap"
                                                               id="soft-cap"
                                                               placeholder="Soft Cap"/>

                                                        <p className="mt-3 text-danger">
                                                            {
                                                                errors.softCap && touched.softCap ?
                                                                    errors.softCap
                                                                    :
                                                                    null
                                                            }
                                                        </p>

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-grp">
                                                        <label htmlFor="hard-cap">Hard Cap</label>
                                                        <Field type="text"
                                                               name="hardCap"
                                                               id="hard-cap"
                                                               placeholder="Hard Cap"/>

                                                        <p className="mt-3 text-danger">
                                                            {
                                                                errors.hardCap && touched.hardCap ?
                                                                    errors.hardCap
                                                                    :
                                                                    null
                                                            }
                                                        </p>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-grp">
                                                <label htmlFor="token-price">Start Time</label>
                                                <Field type="text"
                                                       name="startTime"
                                                       id="token-price"
                                                       placeholder="Start Time"/>

                                                <p className="mt-3 text-danger">
                                                    {
                                                        errors.startTime && touched.startTime ?
                                                            errors.startTime
                                                            :
                                                            null
                                                    }
                                                </p>

                                            </div>

                                            <div className="form-grp">
                                                <label htmlFor="whitelisted-enable">
                                                    Whitelisted Enable?
                                                </label>

                                                <div>
                                                    <Field type="radio"
                                                           name="isWhitelistedEnabled"
                                                           id="whitelisted-enable-true"
                                                           value={'checked'}
                                                           style={{width: '5%', marginRight: '5px'}}
                                                           checked={values.isWhitelistedEnabled === 'checked'}
                                                           onChange={
                                                               () => setFieldValue(
                                                                   'isWhitelistedEnabled',
                                                                   'checked'
                                                               )}
                                                    />
                                                    <label htmlFor="whitelisted-enable-true">
                                                        Yes
                                                    </label>
                                                </div>

                                                <div>
                                                    <Field type="radio"
                                                           name="isWhitelistedEnabled"
                                                           id="whitelisted-enable-false"
                                                           value={'unchecked'}
                                                           style={{width: '5%', marginRight: '5px'}}
                                                           checked={values.isWhitelistedEnabled === 'unchecked'}
                                                           onChange={
                                                               () => setFieldValue(
                                                                   'isWhitelistedEnabled',
                                                                   'unchecked'
                                                               )}
                                                    />

                                                    <label htmlFor="whitelisted-enable-false">
                                                        No
                                                    </label>
                                                </div>

                                                <p className="mt-3 text-danger">
                                                    {
                                                        errors.isWhitelistedEnabled &&
                                                        touched.isWhitelistedEnabled ?
                                                            errors.isWhitelistedEnabled
                                                            :
                                                            null
                                                    }
                                                </p>


                                                {/*<input type="radio"*/}
                                                {/*       className="radio"*/}
                                                {/*       name="admin"*/}
                                                {/*       value="true"*/}
                                                {/*       id="true"*/}
                                                {/*       // onChange={formik.handleChange}*/}
                                                {/*    // checked={formik.values.admin === 'true'}*/}
                                                {/*/>*/}

                                            </div>

                                            <button type="submit" className="btn btn-two arrow-btn">
                                                Update
                                            </button>
                                        </Form>
                                    )}
                                </Formik>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateLaunchpadFormStepTwo;