import React from 'react';
//Components
import FlexColumn from '../Layout/Flex/FlexColumn';
import SpinnerLoader from '../Layout/Loaders/SpinnerLoader/SpinnerLoader';

const FamilyLoader = ({ fetchingFamily }) => (
    <FlexColumn
        className = 'h-100 justify-content-center align-items-center'
    >
        <SpinnerLoader 
            loading = { fetchingFamily }
            className = 'h4'
            loaderText = 'Obteniendo familia...'
        />
    </FlexColumn>
);

export default FamilyLoader;