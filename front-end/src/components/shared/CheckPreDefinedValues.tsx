import React from 'react';

const CheckPreDefinedValues: React.FC = () => {
    if (!process.env.NEXT_PUBLIC_FACTORY_CONTRACT_BSC_TESTNET) {
        throw new Error('Factory contract address is not defined')
    }
    return(<></>)
}

export default CheckPreDefinedValues;