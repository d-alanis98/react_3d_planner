import React from 'react';
//Components
import FlexRow from '../../../../../../../../../Layout/Flex/FlexRow';
import CircularIcon from '../../../../../../../../../Layout/Icons/CircularIcon';
import LabelWithIcon from '../../../../../../../../../Layout/Labels/LabelWithIcon';
//Icons
import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons';

const MenuHeader = ({ toggleMenu }) => (
    <FlexRow
        className = 'align-items-center'
    >
        <CircularIcon 
            icon = { faTimes }
            onClick = { toggleMenu }
            className = 'mr-2'
        />
        <LabelWithIcon 
            icon = { faCog }
            className = 'h5 mb-0'
            labelText = 'Ajustes de modelo'
        />
    </FlexRow>
);

export default MenuHeader;