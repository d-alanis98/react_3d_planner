import React from 'react';
//Components
import FlexRow from '../../../../../../../Layout/Flex/FlexRow';
import ActionWithIcon from '../ActionWithIcon/ActionWithIcon';
//Icons
import { faRedo, faUndo } from '@fortawesome/free-solid-svg-icons';

const RotateModel = ({ rotate }) => (
    <FlexRow
        className = 'align-items-center'
    >
        <ActionWithIcon 
            icon = { faUndo }
            onClick = { () => rotate(-90) }
            className = 'mr-2'
        />
        <ActionWithIcon 
            icon = { faRedo }
            onClick = { () => rotate(90) }
        />
    </FlexRow>
);

export default RotateModel;