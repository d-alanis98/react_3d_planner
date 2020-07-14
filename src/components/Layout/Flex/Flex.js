import React from 'react';

const Flex = ({ children, className }) => (
    <div
        className = { `d-flex ${className || ''}`}
    >
    { children }
    </div>
);

export default Flex;