import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlexRow from '../Flex/FlexRow';

const ButtonWithIcon = ({ icon, type, onClick, className, buttonText, ...extraProps }) => (
    <button
        onClick = { onClick }
        className = {`btn btn-${type} ${className || ''}`}
        { ...extraProps }
    >
        <FlexRow
            className = 'align-items-center'
        >
            <FontAwesomeIcon 
                icon = { icon }
                className = 'mr-2'
            />
            { buttonText }
        </FlexRow>

    </button>
);

export default ButtonWithIcon;