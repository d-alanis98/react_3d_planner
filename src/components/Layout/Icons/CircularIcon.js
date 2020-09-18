import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Styles
import './CircularIcon.css';

const CircularIcon = ({ icon, onClick, className, iconClassName, ...attrs }) => (
    <div
        onClick = { onClick }
        className = { `circular-icon__container ${className || '' }` }
        { ...attrs }
    >
        <FontAwesomeIcon 
            icon = { icon }
            className = { iconClassName || 'circular-icon__icon' }
        />
    </div>
);

export default CircularIcon;