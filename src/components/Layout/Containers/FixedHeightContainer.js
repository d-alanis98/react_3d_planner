import React from 'react';
//Estilos
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