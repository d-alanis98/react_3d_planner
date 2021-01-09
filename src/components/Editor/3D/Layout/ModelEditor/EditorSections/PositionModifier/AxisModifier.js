import React from 'react';

const AxisModifier = ({ id, value, onChange, axisLabel, withoutUnits }) => (
    <div>
        <label className='mr-2'>{ axisLabel }</label>
        <div className='d-flex flex-row'>
            <input 
                id = { id }
                type = 'number'
                step = '1'
                value = { value }
                onChange = { onChange }
                className = 'position-modifier__input mr-1'
            />
            { withoutUnits ? null : 'cm' }
        </div>
    </div>
);

export default AxisModifier;