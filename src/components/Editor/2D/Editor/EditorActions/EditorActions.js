import React from 'react';
//Components
import FlexRow from '../../../../Layout/Flex/FlexRow';
import FixedWidthContainer from '../../../../Layout/Containers/FixedWidthContainer';
import ModelsLibrary from '../../../3D/Layout/Editor/EditorActions/ModelsLibrary/ModelsLibrary';

const EditorActions = ({ models, addModel }) => (
    <FlexRow>
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

    </FlexRow>
);

export default EditorActions;