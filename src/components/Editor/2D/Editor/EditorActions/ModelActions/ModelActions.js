import React from 'react';
//Components
import FlexRow from '../../../../../Layout/Flex/FlexRow';
import StepSize from './Actions/StepSize/StepSize';
import RotateModel from './Actions/RotateModel/RotateModel';
import ModelPosition from './Actions/ModelPosition/ModelPosition';
import ActionWithIcon from './Actions/ActionWithIcon/ActionWithIcon';
//Style
import './ModelActions.css';
//Icons
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ModelActions = ({ 
    stepSize,
    setStepSize,
    modelToEdit, 
    rotateModel, 
    deleteModel,
    handlePositionChange 
}) => (
    modelToEdit ? 
        <FlexRow
            className = 'justify-content-around align-items-center overflow-auto model-actions__container'
        >
            <ActionWithIcon 
                icon = { faTrash }
                color = 'danger'
                onClick = { () => deleteModel() }
                actionText = 'Eliminar'
            />
            <RotateModel 
                rotate = { rotateModel }
            />
            <ModelPosition 
                modelToEdit = { modelToEdit }
                handlePositionChange = { handlePositionChange }
            />
            <StepSize 
                stepSize = { stepSize }
                setStepSize = { setStepSize }
            />
        </FlexRow>
    : null
);

export default ModelActions;