import React, { useState } from 'react';
//Components
import FlexRow from '../../Layout/Flex/FlexRow';
import LabelWithIcon from '../../Layout/Labels/LabelWithIcon';
//Classes
import Validation from '../../../classes/Helpers/Validation';


const DimensionInput = ({ icon, name, value, labelText, handleInputChange }) => {
    const [inputValue, setInputValue] = useState(value);

    const handleDimensionChange = event => {
        setInputValue(event.target.value);
        handleInputChange(event);
    }

    return (
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
                    onChange = { handleDimensionChange }
                    className = 'form-control'
                    defaultValue = { value }
                />
                <span className='ml-2'>cm</span>
            </FlexRow>
            {
                
                Validation.isNegative(inputValue) 
                    && <em className='text-danger'>No se admiten valores negativos</em>
            }
            
        </div>
    );
}

export default DimensionInput;