import React, { useState, useEffect } from 'react';
//Components
import ModelsMenu from './ModelsMenu';
//HOC
import withProjectState from '../../../../../redux/HOC/withProjectState';
//Classes
import ModelDecorator from '../../../../../classes/3D/Models/ModelDecorator';
import with3DRendererContextConsumer from '../../../../Renderer/3D/HOC/with3DRendererContextConsumer';


const ModelsMenuContainer = ({ 
    project: { displayModelsMenu, objects: projectModels },
    updateObject,
    rendererState,
    setDisplayModelsMenu,
    findObjectBy3DModelId 
}) => { 
    //CONSTANTS
    const { ACTIVE_STYLE, INACTIVE_STYLE } = ModelDecorator;
    //PROPS DESTRUCTURING
    const { 
        deleteModelById,
        sceneInstanceModels: models 
    } = rendererState;
    
    //HOOKS
    //State
    const [modelToEdit, setModelToEdit] = useState(null);
    const [modelToFocus, setModelToFocus] = useState(null);

    
    //Effects
    useEffect(() => {
        if(!modelToFocus)
            return;
        ModelDecorator.applyStyle(
            modelToFocus.model,
            modelToFocus.focused ? ACTIVE_STYLE : INACTIVE_STYLE
        );
    }, [modelToFocus]);

    useEffect(() => {
        //On menu hide and on editor display we apply the inactive style back
        if(!displayModelsMenu)
            clearAppliedStylesToModels();

    }, [displayModelsMenu]);
    
    //FUNCTIONS
    const focusModel = event => {
        const { currentTarget: { id: modelId } } = event;
        let focusedModel = models.find(model => model.uuid === modelId);
        //The focused property
        let focused = true;
        //If existing, we toggle the previous one in state (only if it was the same model)
        if(modelToFocus)
            if(modelToFocus.model.uuid === modelId)
                focused = !modelToFocus.focused;
            else clearAppliedStylesToModels();
        //We set he model as focused
        setModelToFocus({
            model: focusedModel,
            focused
        });
        //When a model is focused, we enable the edition over it
        setModelToEdit(focusedModel);
    }

    const clearAppliedStylesToModels = () => {
        if(models && models.length > 0)
        models.forEach(model => 
            ModelDecorator.applyStyle(
                model,
                INACTIVE_STYLE
            )
        );
    }

    const isFocused = modelId => {
        if(!modelToFocus) return false;
        return modelToFocus.model.uuid === modelId && modelToFocus.focused;
    }

    const deleteModel = event => {
        const { currentTarget: { id: modelId } } = event;
        deleteModelById(modelId);
        setModelToFocus(null);
        setModelToEdit(null);
    }

    const rotateModel = (modelId, degrees) => {
        let modelToRotate = models.find(model => model.uuid === modelId);
        if(!modelToRotate)
            return;
        modelToRotate.rotateY(degrees * Math.PI / 180);
        updateRotationInState(modelId, degrees);

    }

    const updateRotationInState = (modelId, degrees) => {
        const modelInState = findObjectBy3DModelId(modelId);
        let { rotation } = modelInState;
        //We create the updated object data
        let updatedObject = { 
            ...modelInState,
            rotation: degrees + (rotation || 0),
        };
        updateObject(updatedObject);
    }

    const handleStateChange = (event, modelId) => {
        const { target: { value: modelState } } = event;
        const modelInState = findObjectBy3DModelId(modelId);
        let updatedObject = {
            ...modelInState,
            modelState,
        };
        updateObject(updatedObject);
    }

    const handleDirectionChange = (event, modelId) => {
        const { target: { value: modelDirection } } = event;
        const modelInState = findObjectBy3DModelId(modelId);
        let updatedObject = {
            ...modelInState,
            modelDirection,
        };
        updateObject(updatedObject);
    }

    return <ModelsMenu 
        isFocused = { isFocused }
        focusModel = { focusModel }
        deleteModel = { deleteModel }
        rotateModel = { rotateModel }
        modelToEdit = { modelToEdit }
        projectModels = { projectModels }
        handleStateChange = { handleStateChange }
        displayModelsMenu = { displayModelsMenu }
        setDisplayModelsMenu = { setDisplayModelsMenu }
        handleDirectionChange = { handleDirectionChange }
    />
  
}

let WithProjectState = withProjectState(ModelsMenuContainer);
let With3dRendererContextConsumer = with3DRendererContextConsumer(WithProjectState);
export default With3dRendererContextConsumer;