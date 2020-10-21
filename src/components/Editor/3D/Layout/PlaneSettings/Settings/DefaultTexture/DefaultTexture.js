
import React from 'react';
import { connect } from 'react-redux';
//Components
import FlexRow from '../../../../../../Layout/Flex/FlexRow';
import EditorSection from '../../../ModelEditor/EditorSections/EditorSection';
import TexturesList from '../../../ModelEditor/EditorSections/TextureModifier/TexturesList/TexturesList';
//HOC
import withProjectState from '../../../../../../../redux/HOC/withProjectState';
//Classes
import TextureFactory from '../../../../../../../classes/3D/Models/TextureFactory';
//Icons
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';


const DefaultTexture = ({ 
    project: { defaultTexture },
    textures,
    setDefaultTexture,
}) => {

    const onTextureChange = event => {
        const { currentTarget: { id: textureId } } = event;
        //We set the default texture in the state
        setDefaultTexture(textureId);
    }

    return (
        <EditorSection
            targetId = 'texture_modifier'
            sectionIcon = { faPaintBrush }
            sectionName = 'Cambiar textura de los modelos'
        >
            <FlexRow
                className = 'align-items-center justify-content-center mb-3'
            >
                <img 
                    src = { TextureFactory.getTextureUriFromId(defaultTexture) }
                    alt = 'Default texture'
                    height = '100px'
                    width = '100px'
                />
            </FlexRow>
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

let WithTextures = connect(mapStateToProps)(DefaultTexture);
let WithProjectState = withProjectState(WithTextures);
export default WithProjectState;