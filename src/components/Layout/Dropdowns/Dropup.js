import React from 'react';
import Dropdown from './Dropdown';

const Dropup = ({ children, className, togglerText }) => (
    <Dropdown
        className = { `dropup ${className || ''}` }
        togglerText = { togglerText }
    >
        { children }
    </Dropdown>
);

export default Dropup;