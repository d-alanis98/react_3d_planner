import React from 'react';
//Components
import FlexColumn from '../Layout/Flex/FlexColumn';
import SpinnerLoader from '../Layout/Loaders/SpinnerLoader/SpinnerLoader';

const FamilyLoader = ({ fetchingFamily, loadingText }) => (
    <FlexColumn
        className = 'h-100 justify-content-center align-items-center'
    >
        <SpinnerLoader 
            loading = { fetchingFamily }
            className = 'h4'
            loaderText = { loadingText || 'Obteniendo familia...' }
        />
    </FlexColumn>
);

export default FamilyLoader;