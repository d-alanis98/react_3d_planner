import React from 'react';
//Components
import LineTitle from './LineTitle';
import LineContent from './LineContent';
//CSS
import './LinesCatalog.css';

const LinesCatalog = ({ lines }) => {
    return lines.map( line =>
        <div 
            key = { `linea_${line.id_lineaProducto}` }
            className = 'mb-3 text-left'
        >
            <LineTitle 
                line = { line }

            />
            <LineContent 
                line = { line }
            />
        </div>
    )

}

export default LinesCatalog;