import React from 'react';
//Style
import './ActionWithInput.css';

const ActionWithInput = ({ type, onChange, className, actionText, ...extraProps }) => (
    <div
        className = {`action-with-input rounded-pill ${className || ''}`}
    >
        { actionText }
        <input
            type = { type }
            onChange = { onChange }
            { ...extraProps }
        />
    </div>

);

export default ActionWithInput;