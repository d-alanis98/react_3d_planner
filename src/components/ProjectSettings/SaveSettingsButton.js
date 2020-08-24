import React from 'react';
//Components
import ButtonWithIcon from '../Layout/Buttons/ButtonWithIcon';
//Icons
import { faSave } from '@fortawesome/free-solid-svg-icons';
import FlexRow from '../Layout/Flex/FlexRow';

const SaveSettingsButton = ({ unsavedChanges, fieldsValidated, saveProjectChanges }) => (
    unsavedChanges ?
        <FlexRow
            className = 'justify-content-center'
        >
            <ButtonWithIcon 
                icon = { faSave }
                onClick = { saveProjectChanges }
                disabled = { !fieldsValidated }
                className = 'btn btn-success'
                buttonText = 'Guardar cambios'
            />
        </FlexRow>
    : null
);

export default SaveSettingsButton;