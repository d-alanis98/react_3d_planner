import React from 'react';
//Components
import TexturesList from './TexturesList/TexturesList';
import EditorSection from '../../../ModelEditor/EditorSections/EditorSection';
import CurrentTexture from './CurrentTexture/CurrentTexture';
//Icons
import { faEyeDropper } from '@fortawesome/free-solid-svg-icons';


const PlaneTextureModifier = () => {
    return (
        <EditorSection
            targetId = 'plane_texture'
            sectionIcon = { faEyeDropper }
            sectionName = 'Cambiar textura del plano'
            defaultExpanded
        >

            <CurrentTexture />
            <TexturesList />
        </EditorSection>
    );
}

export default PlaneTextureModifier;