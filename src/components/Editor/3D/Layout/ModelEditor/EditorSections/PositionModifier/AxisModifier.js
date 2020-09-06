import React from 'react';

const AxisModifier = ({ id, value, onChange, axisLabel }) => (
    <div>
        <label className='mr-2'>{ axisLabel }</label>
        <input 
            id = { id }
            type = 'number'
            step = '0.025'
            value = { value }
            onChange = { onChange }
            className = 'position-modifier__input'
        />
    </div>
);

export default AxisModifier;