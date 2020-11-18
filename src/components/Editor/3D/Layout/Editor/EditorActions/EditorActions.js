import React from 'react';
//Components
import FlexRow from '../../../../../Layout/Flex/FlexRow';
import FixedWidthContainer from '../../../../../Layout/Containers/FixedWidthContainer';
import PlaneActions from './PlaneActions/PlaneActions';

const EditorActions = ({ 
    walls,
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
        <FixedWidthContainer
            width = { 70 }
            className = 'overflow-auto'
        >
            <PlaneActions 
                sceneWalls = { walls }
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