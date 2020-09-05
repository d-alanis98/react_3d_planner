import React from 'react';
//Components
import LabelWithIcon from '../../../../Layout/Labels/LabelWithIcon';
import EditorSectionRenderer from './EditorSectionRenderer';
//Styles
import './ModelEditor.css';
//Icons
import { faEdit } from '@fortawesome/free-solid-svg-icons';


const ModelEditor = ({ 
    modelToEdit, 
    addTextureToObject, 
}) => (
    <div 
        className = 'model-editor'
    >
        <LabelWithIcon 
            icon = { faEdit }
            className = 'h6 light my-3'
            labelText = 'Editar propiedades del modelo'
        />
        <EditorSectionRenderer 
            modelToEdit = { modelToEdit }
            addTextureToObject = { addTextureToObject }
        />
    </div>
);

export default ModelEditor;