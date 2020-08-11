import React from 'react';

const Flex = ({ children, className, ...extraProps }) => (
    <div
        className = { `d-flex ${className || ''}`}
        { ...extraProps }
    >
    { children }
    </div>
);

export default Flex;