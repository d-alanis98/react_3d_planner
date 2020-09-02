import React, { useState, useEffect } from 'react';
//Components
import ModelsMenu from './ModelsMenu';
//HOC
import withProjectState from '../../../../../redux/HOC/withProjectState';
//Classes
import TridimensionalRenderer from '../../../../../classes/Renderers/TridimensionalRenderer';
import ModelDecorator from '../../../../../classes/3D/Models/ModelDecorator';


const ModelsMenuContainer = ({ 
    models, 
    project: { displayModelsMenu, objects: projectModels },
    updateObject,
    deleteModelById,
    addTextureToObject,
    findObjectBy3DModelId 
}) => { 
    //PROPS
    const { ACTIVE_STYLE, INACTIVE_STYLE } = ModelDecorator;
    //HOOKS
    //State
    const [modelToEdit, setModelToEdit] = useState(null);
    const [modelToFocus, setModelToFocus] = useState(null);
    const [displayModelEditor, setDisplayModelEditor] = useState(false);
    
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
        if(!displayModelsMenu || displayModelEditor)
            clearAppliedStylesToModels();
    }, [displayModelsMenu, displayModelEditor]);
    
    //FUNCTIONS
    const editModel = event => {
        const { currentTarget: { id: modelId } } = event;
        let modelToEdit = models.find(model => model.uuid === modelId);
        setModelToEdit(modelToEdit);
        setDisplayModelEditor(true);
    }

    const hideEditorFromState = () => {
        setDisplayModelEditor(false);
    }

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
        
        setModelToFocus({
            model: focusedModel,
            focused
        });
    }

    const clearAppliedStylesToModels = () => {
        models.forEach(model => 
            ModelDecorator.applyStyle(
                model,
                INACTIVE_STYLE
            )
        );
    }

    const isFocused = model => {
        if(!modelToFocus) return false;
        return modelToFocus.model.uuid === model.uuid && modelToFocus.focused;
    }

    const deleteModel = event => {
        const { currentTarget: { id: modelId } } = event;
        deleteModelById(modelId);
    }

    const rotateModel = (modelId, degrees) => {
        let modelToRotate = models.find(model => model.uuid === modelId);
        if(!modelToRotate){
            console.log('No se encontro el modelo');
            return;
        }
        /**
         * @todo Rotation decorator class and move state logic to the with3Drenderer
         */
        modelToRotate.rotateY(degrees * Math.PI / 180);
        updateRotationInState(modelId, degrees);

    }

    const updateRotationInState = (modelId, degrees) => {
        const modelInState = findObjectBy3DModelId(modelId);
        let { rotation } = modelInState;
        let updatedObject = { 
            ...modelInState,
            rotation: degrees + rotation || 0,
        };
        updateObject(updatedObject);
    }

    if(displayModelsMenu)
        return <ModelsMenu 
            editModel = { editModel }
            isFocused = { isFocused }
            focusModel = { focusModel }
            deleteModel = { deleteModel }
            rotateModel = { rotateModel }
            modelToEdit = { modelToEdit }
            projectModels = { projectModels }
            addTextureToObject = { addTextureToObject }
            displayModelEditor = { displayModelEditor }
            hideEditorFromState = { hideEditorFromState }
        />
    return null;
}

let WithProjectState = withProjectState(ModelsMenuContainer);
export default WithProjectState;