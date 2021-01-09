import React from 'react';
//Components
import FlexRow from '../../../../../Layout/Flex/FlexRow';
import StepSize from './Actions/StepSize/StepSize';
import EditModel from './Actions/EditModel/EditModel';
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
    sceneInstance,
    correctSelectionBox,
    handlePositionChange
}) => (
    modelToEdit ? 
        <FlexRow
            className = 'justify-content-around align-items-center model-actions__container'
        >
            <ModelPosition 
                stepSize = { stepSize }
                modelToEdit = { modelToEdit }
                handlePositionChange = { handlePositionChange }
            />
            <StepSize 
                stepSize = { stepSize }
                setStepSize = { setStepSize }
            />
            <EditModel 
                rotate = { rotateModel }
                deleteModel = { deleteModel }
                modelToEdit = { modelToEdit }
                sceneInstance = { sceneInstance }
                correctSelectionBox = { correctSelectionBox }
            />
        </FlexRow>
    : null
);

export default ModelActions;