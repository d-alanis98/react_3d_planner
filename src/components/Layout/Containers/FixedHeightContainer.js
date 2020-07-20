import React from 'react';
//Styles
import './Heights.css';

const FixedHeightContainer = ({ height, children, className, ...extraProps }) => (
    <div
        className = {`h-${height} ${className || ''}`}
        { ...extraProps }
    >
        { children }
    </div>
);

export default FixedHeightContainer;