import React from 'react';

const Row = ({ children, className, ...extraProps }) => (
    <div 
        className = { `row m-0 ${ className || '' }` }
        { ...extraProps }
    >
        { children }
    </div>
);

export default Row;