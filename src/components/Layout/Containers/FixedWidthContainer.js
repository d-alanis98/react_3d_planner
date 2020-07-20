import React from 'react';
//Styles
import './Widths.css';

const FixedWidthContainer = ({ width, children, className, ...extraProps }) => (
    <div
        className = {`w-${width} ${className || ''}`}
        { ...extraProps }
    >
        { children }
    </div>
);

export default FixedWidthContainer;