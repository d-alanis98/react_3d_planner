import React, { Fragment } from 'react';
//Styles
import './AxisReference.css';

const AxisReference = ({ containerStyle }) => (
    <Fragment>
        <h6 className='text-center'>Referencia</h6>
        <div 
            className = { containerStyle || 'axis-reference__container' }
        >
            <img 
                src = 'assets/position-reference.png' 
                className = 'axis-reference__image' 
            />
        </div>
    </Fragment>
);

export default AxisReference;