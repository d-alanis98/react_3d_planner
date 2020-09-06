import React from 'react';
//Components
import ModelDetails from './ModelDetails/ModelDetails';
import ModelSelector from './ModelSelector/ModelSelector';
//Styles
import '../ModelsMenu.css';
//Classes
import TridimensionalRenderer from '../../../../../../classes/Renderers/TridimensionalRenderer';


const ModelsMenuListItem = ({ isFocused, focusModel, deleteModel, rotateModel, projectModel }) => {
    //CONSTANTS
    const { TRIDIMENSIONAL_SCENE } = TridimensionalRenderer;
    //PROPS
    const project3DModel = projectModel[TRIDIMENSIONAL_SCENE];
    const { uuid: modelId } = project3DModel;
    const { type: modelType, name: modelName, productLine: modelProductLine } = projectModel;

    return (
        <li 
            id = { modelId }
            onClick = { focusModel }
            className = { `models-menu-list__item ${ isFocused(modelId) ? 'active' : ''} shadow `}
        >
            <ModelSelector 
                modelId = { modelId }
                modelName = { modelName }
                isFocused = { isFocused }
                focusModel = { focusModel }
                deleteModel = { deleteModel }
            />
            <ModelDetails 
                modelId = { modelId }
                modelType = { modelType }
                rotateModel = { rotateModel }
                modelProductLine = { modelProductLine }
            />
        </li>
    );
}

export default ModelsMenuListItem;