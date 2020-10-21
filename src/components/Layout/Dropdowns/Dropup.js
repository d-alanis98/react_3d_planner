import React from 'react';
import Dropdown from './Dropdown';

const Dropup = ({ children, className, noPadding, togglerText }) => (
    <Dropdown
        className = { `dropup ${className || ''}` }
        noPadding = { noPadding }
        togglerText = { togglerText }
    >
        { children }
    </Dropdown>
);

export default Dropup;