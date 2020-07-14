import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Componentes
import FlexRow from '../../../../../Layout/Flex/FlexRow';
import ModelsLibrary from './ModelsLibrary/ModelsLibrary';
import ButtonWithIcon from '../../../../../Layout/Buttons/ButtonWithIcon';
import FixedWidthContainer from '../../../../../Layout/Containers/FixedWidthContainer';
//Íconos
import { faArrowsAlt, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

const EditorActions = ({ models, addModel, toggleOrbitControls, orbitControlsEnabled }) => (
    <FlexRow
        className = 'justify-content-around align-items-around'
    >
        <FixedWidthContainer
            width = { 90 }
            className = 'overflow-auto h-100'
        >
            <ModelsLibrary 
                models = { models }
                addModel = { addModel }
            />
        </FixedWidthContainer>
        <ButtonWithIcon 
            icon = { orbitControlsEnabled ? faLock : faLockOpen }
            type = 'secondary'
            onClick = { toggleOrbitControls }
            className = 'btn-sm my-2'
            buttonText = {
                <FontAwesomeIcon 
                    icon = { faArrowsAlt }
                />
            }
        />    
    </FlexRow>
);

export default EditorActions;