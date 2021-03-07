import React from 'react';
import FlexRow from '../Flex/FlexRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LabelWithIcon = ({ 
    id, 
    icon, 
    onClick, 
    className, 
    labelText, 
    iconClassName,
    ...extraProps 
}) => (
    <label
        id = { id }
        onClick = { onClick }
        className = { className }
        { ...extraProps }
    >
        <FlexRow
            className = 'align-items-center'
        >
            <FontAwesomeIcon 
                icon = { icon }
                className = { `mr-2 ${iconClassName || ''}` }
            />
            { labelText }
        </FlexRow>
    </label>
);

export default LabelWithIcon;