import React from 'react';
//Styles
import './Heights.css';

const FixedHeightContainer = ({ height, children, relative, className, ...extraProps }) => (
    <div
        className = {`h-${height}${relative ? '-relative' : ''} ${className || ''}`}
        { ...extraProps }
    >
        { children }
    </div>
);

export default FixedHeightContainer;