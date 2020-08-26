import React from 'react';
//Components
import Row from '../../../../Layout/Grid/Row';
import Products from './Products/Products';

const LineContent = ({ line }) => (
    <div 
        id = { `linea_${line.id_lineaProducto}` }
        className = 'collapse' 
    >
        <Row>
            <Products 
                products = { line.productos }
            />
        </Row>
    </div>
);

export default LineContent;