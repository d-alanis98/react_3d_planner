import React from 'react';
//Components
import FlexRow from '../../Layout/Flex/FlexRow';
import LabelWithIcon from '../../Layout/Labels/LabelWithIcon';


const DimensionInput = ({ icon, name, value, labelText, handleInputChange }) => (
    <div className='form-group'>
        <LabelWithIcon 
            icon = { icon }
            labelText = { labelText }
            className = 'h6 text-muted'
        />
        <FlexRow
            className = 'align-items-center justify-content-center'
        >
            <input 
                type = 'number'
                name = { name }
                onChange = { handleInputChange }
                className = 'form-control'
                defaultValue = { value }
            />
            <span className='ml-2'>cm</span>
        </FlexRow>
    </div>
);

export default DimensionInput;