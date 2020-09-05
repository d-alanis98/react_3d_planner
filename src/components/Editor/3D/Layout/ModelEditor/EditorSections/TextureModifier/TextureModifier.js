import React, { Fragment } from 'react';
import { connect } from 'react-redux';
//Components
import TexturesList from './TexturesList/TexturesList';
import EditorSection from '../EditorSection';
//HOC
import withProjectState from '../../../../../../../redux/HOC/withProjectState';
//Factory
import TextureFactory from '../../../../../../../classes/3D/Models/TextureFactory';
//Icons
import { faEyeDropper } from '@fortawesome/free-solid-svg-icons';
//Styles
import './TextureModifier.css';



const TextureModifier = ({ 
    textures, 
    modelToEdit,
    updateObject,
    addTextureToObject,
    findObjectBy3DModelId,
}) => {

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

    return (
        <EditorSection
            targetId = 'texture_modifier'
            sectionIcon = { faEyeDropper }
            sectionName = 'Cambiar textura'
        >
            <TexturesList 
                textures = { textures }
                onTextureChange = { onTextureChange }
            />
        </EditorSection>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        textures: state.textures.textures,
        ...ownProps
    }
}

let WithTextures = connect(mapStateToProps)(TextureModifier);
let WithProjectState = withProjectState(WithTextures);
export default WithProjectState;