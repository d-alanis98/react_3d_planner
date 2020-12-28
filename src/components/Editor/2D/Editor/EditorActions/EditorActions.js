import React from 'react';
//Components
import FlexRow from '../../../../Layout/Flex/FlexRow';
import EditorView from './EditorView/EditorView';
import ModelActionsContainer from './ModelActions/ModelActionsContainer';
//Clases
import withProjectState from '../../../../../redux/HOC/withProjectState';

const EditorActions = () => {
    return (
        <FlexRow
            className = 'justify-content-start align-items-center px-3 h-100 w-100'
        >
            <EditorView />
            <ModelActionsContainer />
        </FlexRow>
    );
}

let WithProjectState = withProjectState(EditorActions);

export default WithProjectState;