import React, { Fragment, useEffect } from 'react';
import $ from 'jquery';
//Componentes
import FlexRow from './components/Layout/Flex/FlexRow';
import SideBar from './components/Layout/Sidebar/Sidebar';
import FixedWidthContainer from './components/Layout/Containers/FixedWidthContainer';

import Editor from './components/Editor/3D/Layout/Editor/Editor';



function App({ addObject, toggleOrbitControls, orbitControlsEnabled }) {

    useEffect(() => {
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
                    <Editor />
                </FixedWidthContainer>
            </FlexRow>
        </Fragment>
    );
}

export default App;
