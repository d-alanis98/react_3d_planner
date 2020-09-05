import React from 'react';

const CollapsableContent = ({ id, children, className, ...extraProps }) => (
    <div
        id = { id }
        className = { `collapse ${className || ''}` }
        { ...extraProps }
    >
        { children }
    </div>
);

export default CollapsableContent;