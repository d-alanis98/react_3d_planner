import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import LabelWithIcon from '../../../../Layout/Labels/LabelWithIcon';

const LineTitle = ({ line }) => (
    <div
        className = 'bg-line-header text-light px-2 py-2 rounded-lg cursor-click'
        data-toggle = 'collapse' 
        data-target = { `#linea_${line.id_lineaProducto}` } 
        aria-expanded = 'false' 
        aria-controls = { `linea_${line.id_lineaProducto}` }
    >
        <LabelWithIcon 
            icon = { faCaretDown }
            className = 'mb-0 h6'
            labelText = { line.descripcion_es }
            iconClassName = 'cursor-click'
        />
    </div>
);

export default LineTitle;