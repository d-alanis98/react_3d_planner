import React, { Fragment, useState, useEffect } from 'react';
import $ from 'jquery';
//Components
//3D editor
//import Editor from './components/Editor/3D/Layout/Editor/Editor';
//2d editor
import Editor from './components/Editor/2D/Editor/Editor';
import FlexRow from './components/Layout/Flex/FlexRow';
import SideBar from './components/Layout/Sidebar/Sidebar';
import FixedWidthContainer from './components/Layout/Containers/FixedWidthContainer';
import withEditorState from './redux/HOC/withEditorState';
//Constants
import { SectionComponentToRender } from './constants/sections/sections';


const App = ({ editorState }) => {
    const { editorType } = editorState;
    //HOOKS

    useEffect(() => {
        //We enable tooltips
        $(() => $('[data-toggle="tooltip"]').tooltip());
    }, [])

    return (
        <Fragment>
            <FlexRow
                className = 'w-100 h-100'
            >
                <SideBar />
                <FixedWidthContainer
                    width = { 95 }
                >
                    { SectionComponentToRender[editorType] }
                </FixedWidthContainer>
            </FlexRow>
        </Fragment>
    );
}

//We apply the editor state HOC
let WithEditorState = withEditorState(App);
//We export the decorated component
export default WithEditorState;
