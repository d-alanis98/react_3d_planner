import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
//Components
import TexturesList from './TexturesList/TexturesList';
import LabelWithIcon from '../../../../Layout/Labels/LabelWithIcon';
import ButtonWithIcon from '../../../../Layout/Buttons/ButtonWithIcon';
import FixedHeightContainer from '../../../../Layout/Containers/FixedHeightContainer';
//Styles
import './ModelEditor.css';
//Icons
import { faEdit, faEyeDropper, faTimes } from '@fortawesome/free-solid-svg-icons';
import TextureFactory from '../../../../../classes/3D/Models/TextureFactory';
import FlexRow from '../../../../Layout/Flex/FlexRow';
import withProjectState from '../../../../../redux/HOC/withProjectState';


const ModelEditor = ({ 
    textures, 
    showEditor, 
    modelToEdit, 
    updateObject, 
    onEditorClose, 
    addTextureToObject, 
    findObjectBy3DModelId 
}) => {
    //HOOKS
    //State
    const [displayEditor, setDisplayEditor] = useState(false);

    //Effects
    useEffect(() => {
        setDisplayEditor(showEditor);
    }, [showEditor]);

    const onTextureChange = event => {
        const { currentTarget: { id: textureId } } = event;
        const textureUri = TextureFactory.getTextureUriFromId(textureId);
         //We add the texture
        addTextureToObject(modelToEdit, textureUri);
        //We update it in the global state
        updateTextureInState(textureId);
    }

    const updateTextureInState = textureId => {
        const existingObject = findObjectBy3DModelId(modelToEdit.uuid);
        let updatedObject = {
            ...existingObject,
            texture: textureId,
        }
        updateObject(updatedObject);
    }

    const closeEditor = event => {
        event.preventDefault();
        setDisplayEditor(false);
        if(onEditorClose && typeof(onEditorClose) === 'function')
            onEditorClose();
    }
    
    return (
        <div 
            className = {`model-editor border border-muted rounded-lg ${ displayEditor ? 'd-block' : 'd-none'}`} 
        >
            <FixedHeightContainer
                height = { 15 }
            >
                <LabelWithIcon 
                    icon = { faEdit }
                    className = 'h5 text-muted'
                    labelText = 'Editor del modelo'
                />
                <hr />
                <LabelWithIcon 
                    icon = { faEyeDropper }
                    className = 'h6 text-muted'
                    labelText = 'Cambiar textura'
                />
            </FixedHeightContainer>
            <FixedHeightContainer
                height = { 75 }
            >
                <TexturesList 
                    textures = { textures }
                    onTextureChange = { onTextureChange }
                />
            </FixedHeightContainer>
            <FixedHeightContainer
                height = { 5 }
                className = 'text-center'
            >
                <ButtonWithIcon
                    icon = { faTimes }
                    type = 'danger'
                    onClick = { closeEditor }
                    className = 'rounded-lg shadow mt-2'
                    buttonText = 'Cerrar editor'
                />
            </FixedHeightContainer>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        textures: state.textures.textures,
        ...ownProps
    }
}

let WithTextures = connect(mapStateToProps)(ModelEditor);
let WithProjectState = withProjectState(WithTextures);
export default WithProjectState;