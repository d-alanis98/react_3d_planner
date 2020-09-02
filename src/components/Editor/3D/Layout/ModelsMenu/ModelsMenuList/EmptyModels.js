import React from 'react';
//Components
import FlexRow from '../../../../../Layout/Flex/FlexRow';
import LabelWithIcon from '../../../../../Layout/Labels/LabelWithIcon';
//Icons
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';


const EmptyModels = () => (
    <FlexRow
        className = 'justify-content-center py-3'
    >
        <LabelWithIcon 
            icon = { faExclamationCircle }
            className = 'h6 text-muted'
            labelText = 'Sin modelos'
        />

    </FlexRow>
);

export default EmptyModels;
