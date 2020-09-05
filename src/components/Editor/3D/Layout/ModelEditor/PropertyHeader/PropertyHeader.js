import React from 'react';
//Components
import FlexRow from '../../../../../Layout/Flex/FlexRow';
import CircularIcon from '../../../../../Layout/Icons/CircularIcon';
//Icons
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const PropertyHeader = ({ children, className, onIconClick }) => (
    <FlexRow
        className = { `align-items-center mb-2 ${ className || ''}` }
    >
        <CircularIcon 
            icon = { faTimes }
            onClick = { onIconClick }
            className = { children ? 'mr-2' : ''}
        />
        { children }
    </FlexRow>
);

export default PropertyHeader;