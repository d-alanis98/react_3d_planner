import React from 'react';
import { connect } from 'react-redux';
//Components
import TexturesList from './TexturesList/TexturesList';
import EditorSection from '../EditorSection';
//HOC
import withProjectState from '../../../../../../../redux/HOC/withProjectState';
import with3DRendererContextConsumer from '../../../../../../Renderer/3D/HOC/with3DRendererContextConsumer';
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
    rendererState,
    findObjectBy3DModelId,
}) => {

    const onTextureChange = event => {
        const { currentTarget: { id: textureId } } = event;
        const textureUri = TextureFactory.getTextureUriFromId(textureId);
        //We add the texture
        rendererState.sceneInstance.addTextureToObject(modelToEdit, textureUri);
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
let With3DRendererContextConsumer = with3DRendererContextConsumer(WithProjectState);
export default With3DRendererContextConsumer;