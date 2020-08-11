import React from 'react';
//Components
import FlexRow from '../Flex/FlexRow';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
//Icons
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const InputWithConfirmButton = ({ buttonText, inputValue, inputClassName, buttonClassName, inputPlaceholder, inputChangeHandler, buttonClickHandler }) => (
    <FlexRow>
        <input 
            type = 'text'
            value = { inputValue }
            onChange = { inputChangeHandler }
            className = { inputClassName || 'form-control rounded-lg' }
            placeholder = { inputPlaceholder }
        />
        <ButtonWithIcon 
            icon = { faCheckCircle }
            onClick = { buttonClickHandler }
            className = { buttonClassName || 'btn btn-success btn-sm rounded-lg ml-3' }
            buttonText = { buttonText || 'Confirmar' }
        />
    </FlexRow>
);

export default InputWithConfirmButton;