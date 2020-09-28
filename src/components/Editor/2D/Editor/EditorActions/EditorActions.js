import React from 'react';
//Components
import FlexRow from '../../../../Layout/Flex/FlexRow';
import EditorView from './EditorView/EditorView';
//Clases
import withProjectState from '../../../../../redux/HOC/withProjectState';

const EditorActions = () => {
    return (
        <FlexRow
            className = 'justify-content-start align-items-center px-3 h-100'
        >
            <EditorView />
        </FlexRow>
    );
}

let WithProjectState = withProjectState(EditorActions);

export default WithProjectState;