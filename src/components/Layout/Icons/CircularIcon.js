import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Styles
import './CircularIcon.css';

const CircularIcon = ({ icon, onClick, className, ...attrs }) => (
    <div
        onClick = { onClick }
        className = { `circular-icon__container ${className || '' }` }
        { ...attrs }
    >
        <FontAwesomeIcon 
            icon = { icon }
            className = 'circular-icon__icon'
        />
    </div>
);

export default CircularIcon;