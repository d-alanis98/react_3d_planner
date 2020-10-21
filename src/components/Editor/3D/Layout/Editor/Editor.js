import React from 'react';
//Components
import EditorActions from './EditorActions/EditorActions';
import RendererContainer from '../RendererContainer';
import FixedHeightContainer from '../../../../Layout/Containers/FixedHeightContainer';
//HOC
import with3DRenderer from '../../../../Renderer/3D/HOC/with3DRenderer';


const Editor = ({ 
    walls,
    models, 
    addModel, 
    rotateCamera, 
    displayWalls, 
    addTextureToPlane,  
    toggleOrbitControls, 
    orbitControlsEnabled,
    toggleWallsVisibility
}) => (
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
                walls = { walls }
                models = { models } 
                addModel = { addModel }
                rotateCamera = { rotateCamera }
                displayWalls = { displayWalls }
                addTextureToPlane = { addTextureToPlane }
                toggleOrbitControls = { toggleOrbitControls }
                orbitControlsEnabled = { orbitControlsEnabled }
                toggleWallsVisibility = { toggleWallsVisibility }
            />
        </FixedHeightContainer>
    </FixedHeightContainer>
);

export default with3DRenderer(Editor);


