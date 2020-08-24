import React from 'react';

const Container = ({ children, className, ...extraProps }) => (
    <div
        className = { `container ${ className || '' }` }
        { ...extraProps }
    >
        { children }
    </div>
);

export default Container;