import React from 'react';
//Components
import ModelEditor from '../ModelEditor/ModelEditor';
import LabelWithIcon from '../../../../Layout/Labels/LabelWithIcon';
import ModelsMenuList from './ModelsMenuList/ModelsMenuList';
import FixedHeightContainer from '../../../../Layout/Containers/FixedHeightContainer';
//Icons
import { faCubes } from '@fortawesome/free-solid-svg-icons';
//Styles
import './ModelsMenu.css';

const ModelsMenu = ({ editModel, isFocused, focusModel, deleteModel, rotateModel, modelToEdit, projectModels, addTextureToObject, displayModelEditor, hideEditorFromState }) => (
    <div
        className = 'models-menu__container'
    >
        <FixedHeightContainer
            height = { 100 }
        >
            <LabelWithIcon 
                    icon = { faCubes }
                    className = 'models-menu__label h5'
                    labelText = 'Modelos en escena'
            />
            <ModelsMenuList 
                editModel = { editModel }
                isFocused = { isFocused }
                focusModel = { focusModel }
                deleteModel = { deleteModel }
                rotateModel = { rotateModel }
                projectModels = { projectModels }
            />
        </FixedHeightContainer>

        <ModelEditor 
            showEditor = { displayModelEditor }
            modelToEdit = { modelToEdit }
            onEditorClose = { hideEditorFromState }
            addTextureToObject = { addTextureToObject }
        />
    </div>
);

export default ModelsMenu;