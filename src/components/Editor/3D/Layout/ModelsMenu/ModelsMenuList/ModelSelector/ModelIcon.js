import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Components
import FlexRow from '../../../../../../Layout/Flex/FlexRow';
import CollapseController from '../../../../../../Layout/Collapsable/CollapseController';
//Icons
import { faCube } from '@fortawesome/free-solid-svg-icons';

const ModelIcon = ({ modelId }) => (
    <FlexRow
        className = 'justify-content-between align-items-center'
    >
        <CollapseController 
            targetId = { `details_${modelId}` }
        />
        <FontAwesomeIcon 
            icon = { faCube }
            className = 'text-warning'
        />
    </FlexRow>
);

export default ModelIcon;