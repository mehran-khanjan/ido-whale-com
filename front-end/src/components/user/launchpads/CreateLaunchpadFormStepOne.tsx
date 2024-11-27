import React, {useEffect} from 'react';
import {useWriteContract, type BaseError} from 'wagmi';
import {abi} from '../../../assets/abi/LaunchpadFactory.json';
import * as Yup from 'yup';
import {Field, Form, Formik, FormikHelpers} from "formik";
import {parseEther} from "viem";

interface FormValues {
    launchpadTitle: string;
}

const formSchema = Yup.object().shape({
    launchpadTitle: Yup
        .string()
        .min(5, 'Min launchpad title is 5 character')
        .max(32, 'Max launchpad title is 32 character')
        .typeError('Launchpad title must be a string')
        .required('Required'),
});

const CreateLaunchpadFormStepOne: React.FC = () => {
    const {data: hash, writeContract, isPending, error} = useWriteContract();
    // const {data: costFee} = useReadContract({
    //     abi,
    //     address: '0x827126f66BB0ee67062C80d641bDb251766deFCF',
    //     functionName: 'costFee',
    //     args: [],
    // });

    useEffect(() => {
        if (error) {
            console.log('error1', (error as BaseError).shortMessage || error.message);
        }
    }, [error]);

    const handleFormSubmit = (v: FormValues, s: FormikHelpers<FormValues>) => {
        console.log('v', v.launchpadTitle);

        writeContract({
            address: process.env.NEXT_PUBLIC_FACTORY_CONTRACT_BSC_TESTNET,
            abi,
            functionName: 'launch',
            args: [v.launchpadTitle],
            value: parseEther('1')
        })
    }

    return (
        <>
            <section className="signup__area team-bg mb-5" data-background="assets/img/bg/team_bg.jpg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-10">
                            <div className="singUp-wrap">
                                <h2 className="title">
                                    Step 1 - Create Launchpad
                                </h2>
                                <p className="mb-5">
                                    Hey there! Ready to join the party? We just need a few details from
                                    you to get started. Let's do this!
                                </p>

                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        launchpadTitle: ''
                                    }}
                                    validationSchema={formSchema}
                                    onSubmit={async (values: FormValues, submitProps: FormikHelpers<FormValues>) => {
                                        await handleFormSubmit(values, submitProps);
                                    }}>

                                    {({errors, touched}) => (
                                        <Form className="account__form">
                                            <div className="form-grp">

                                                <label htmlFor="launchpad-title">
                                                    Launchpad Title
                                                </label>

                                                <Field
                                                    name="launchpadTitle"
                                                    type="text"
                                                    id="launchpad-title"
                                                    placeholder="Launchpad Title"/>

                                                <p className="mt-3 text-danger">
                                                    {
                                                        errors.launchpadTitle && touched.launchpadTitle ?
                                                            errors.launchpadTitle
                                                            :
                                                            null
                                                    }
                                                </p>

                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-two arrow-btn"
                                                disabled={isPending}>
                                                Create
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

export default CreateLaunchpadFormStepOne;