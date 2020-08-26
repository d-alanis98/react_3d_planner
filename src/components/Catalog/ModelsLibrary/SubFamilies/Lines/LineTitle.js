import React from 'react';

const LineTitle = ({ line }) => (
    <div
        className = 'bg-line-header text-light px-2 py-2 rounded-lg cursor-click'
        data-toggle = 'collapse' 
        data-target = { `#linea_${line.id_lineaProducto}` } 
        aria-expanded = 'false' 
        aria-controls = { `linea_${line.id_lineaProducto}` }
    >
    { line.descripcion_es }
    </div>
);

export default LineTitle;