import React from 'react';
import Head from "next/head";
import {appName} from "@/helpers/appStrings";
import CustomHeader from "@/components/shared/CustomHeader";

type PropsType = {
    title: string;
}

const CustomHead: React.FC<PropsType> = (props: PropsType) => {
    return(
        <>
            <Head>
                <title>{appName} | {props.title}</title>
                <meta name="description" content="with IDO Whale do not miss any IDO" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <CustomHeader/>
        </>
    )
}

export default CustomHead;