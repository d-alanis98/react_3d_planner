import React from 'react';

const AxisModifier = ({ value, onChange, axisLabel }) => (
    <div className='mb-2'>
        <label className='mr-2'>{ axisLabel }</label>
        <input 
            type = 'number'
            value = { value }
            onChange = { onChange }
            className = 'position-modifier__input'
        />
    </div>
);

export default AxisModifier;