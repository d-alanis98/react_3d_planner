import React from 'react';

const ModelThumbnail = ({ modelProductLine }) => (
    <img 
        className = 'models-menu__thumbnail mb-1'
        alt = { modelProductLine }
        src = { `${process.env.MIX_APP_API_ENDPOINT}/productos/lineas/${modelProductLine}/getPic?small=true` }
    />
);

export default ModelThumbnail;