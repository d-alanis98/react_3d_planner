import React from 'react';
//Style
import './ActionWithInput.css';

const ActionWithInput = ({ type, unit, onChange, className, actionText, ...extraProps }) => (
    <div
        className = {`action-with-input rounded-pill ${className || ''}`}
    >
        { actionText }
        <input
            type = { type }
            onChange = { onChange }
            { ...extraProps }
        />
        { unit && <span className='ml-1'>{ unit }</span> }
    </div>

);

export default ActionWithInput;