import React from 'react';
//Components
import FlexRow from '../../../../../Layout/Flex/FlexRow';
import ModelsLibrary from './ModelsLibrary/ModelsLibrary';
import FixedWidthContainer from '../../../../../Layout/Containers/FixedWidthContainer';
import PlaneActions from './PlaneActions/PlaneActions';

const EditorActions = ({ 
    rotateCamera, 
    displayWalls,
    addTextureToPlane, 
    toggleOrbitControls, 
    orbitControlsEnabled ,
    toggleWallsVisibility
}) => (
    <FlexRow
        className = 'justify-content-around align-items-center h-100'
    >
        {/*
        <FixedWidthContainer
            width = { 75 }
            className = 'overflow-auto h-100'
        >
            <ModelsLibrary 
                models = { models }
                addModel = { addModel }
            />
        </FixedWidthContainer>
        */}
        <FixedWidthContainer
            width = { 70 }
        >
            <PlaneActions 
                rotateCamera = { rotateCamera }
                displayWalls = { displayWalls }
                addTextureToPlane = { addTextureToPlane }
                toggleOrbitControls = { toggleOrbitControls }
                orbitControlsEnabled = { orbitControlsEnabled }
                toggleWallsVisibility = { toggleWallsVisibility }
            />
        </FixedWidthContainer>

    </FlexRow>
);

export default EditorActions;