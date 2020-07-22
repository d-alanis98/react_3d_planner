import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Components
import FlexRow from '../../../../../Layout/Flex/FlexRow';
import ModelsLibrary from './ModelsLibrary/ModelsLibrary';
import FixedWidthContainer from '../../../../../Layout/Containers/FixedWidthContainer';
import PlaneActions from './PlaneActions/PlaneActions';

const EditorActions = ({ models, addModel, rotateCamera, addTextureToPlane, toggleOrbitControls, orbitControlsEnabled }) => (
    <FlexRow
        className = 'justify-content-around align-items-center'
    >
        <FixedWidthContainer
            width = { 75 }
            className = 'overflow-auto h-100'
        >
            <ModelsLibrary 
                models = { models }
                addModel = { addModel }
            />
        </FixedWidthContainer>
        <FixedWidthContainer
            width = { 25 }
        >
            <PlaneActions 
                rotateCamera = { rotateCamera }
                addTextureToPlane = { addTextureToPlane }
                toggleOrbitControls = { toggleOrbitControls }
                orbitControlsEnabled = { orbitControlsEnabled }
            />
        </FixedWidthContainer>

    </FlexRow>
);

export default EditorActions;