import React from 'react';
import Dropdown from './Dropdown';

const Dropup = ({ children, className, noPadding, togglerText, togglerClassName }) => (
    <Dropdown
        className = { `dropup ${className || ''}` }
        noPadding = { noPadding }
        togglerText = { togglerText }
        togglerClassName = { togglerClassName }
    >
        { children }
    </Dropdown>
);

export default Dropup;