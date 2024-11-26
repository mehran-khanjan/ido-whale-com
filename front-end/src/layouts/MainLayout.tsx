import React from 'react';
import CustomHeader from "@/components/shared/CustomHeader";
import CustomFooter from "@/components/shared/CustomFooter";
import CustomHead from "@/components/shared/CustomHead";

function MainLayout({children}: any) {
    return (
        <React.Fragment>

            <CustomHeader/>

            <appkit-button />

            {children}

            <CustomFooter/>

        </React.Fragment>
    );

}

export default MainLayout;