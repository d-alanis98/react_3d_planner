import React from 'react';

const ModelThumbnail = ({ modelProductLine }) => (
    <img 
        className = 'models-menu__thumbnail mb-1'
        alt = { modelProductLine }
        src = { `https://dev.qpr.mx/api/productos/lineas/${modelProductLine}/getPic?small=true` }
    />
);

export default ModelThumbnail;