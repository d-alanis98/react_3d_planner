import React from 'react';
//Components
import EditorActions from './EditorActions/EditorActions';
import RendererContainer from '../RendererContainer';
import FixedHeightContainer from '../../../../Layout/Containers/FixedHeightContainer';
//HOC
import with3DRenderer from '../../../../Renderer/3D/HOC/with3DRenderer';


const Editor = ({ models, addModel, rotateCamera, addTextureToPlane, toggleOrbitControls, orbitControlsEnabled }) => {
    return(
        <FixedHeightContainer
            height = { 100 }
        >
            
            <FixedHeightContainer
                height = { 90 }
            >
                <RendererContainer />
            </FixedHeightContainer>
            <FixedHeightContainer
                height = { 10 }
            >
                <EditorActions
                    models = { models } 
                    addModel = { addModel }
                    rotateCamera = { rotateCamera }
                    addTextureToPlane = { addTextureToPlane }
                    toggleOrbitControls = { toggleOrbitControls }
                    orbitControlsEnabled = { orbitControlsEnabled }
                />
                
            </FixedHeightContainer>
        </FixedHeightContainer>
    );
}

export default with3DRenderer(Editor);

