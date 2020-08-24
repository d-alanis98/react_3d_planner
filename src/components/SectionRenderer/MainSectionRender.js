import React from 'react';
//Components
import ProjectSettings from '../ProjectSettings/ProjectSettings';
//HOC
import withEditorState from '../../redux/HOC/withEditorState';
//Constants
import { SectionComponentToRender } from '../../constants/sections/sections';

const MainSectionRender = ({ editorState: { editorType, editorWidth, editorHeight } }) => (
    editorWidth && editorHeight ?
        SectionComponentToRender[editorType]
    : <ProjectSettings />
);

//We apply the editor state HOC
let WithEditorState = withEditorState(MainSectionRender);
//We export the decorated component
export default WithEditorState;