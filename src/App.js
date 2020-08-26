import React, { Fragment, useEffect } from 'react';
import $ from 'jquery';
//Components
import FlexRow from './components/Layout/Flex/FlexRow';
import SideBar from './components/Layout/Sidebar/Sidebar';
import MainSectionRender from './components/SectionRenderer/MainSectionRender';
import FixedWidthContainer from './components/Layout/Containers/FixedWidthContainer';
import Notification from './components/Notifications/Notification';


const App = () => {
    //HOOKS
    //Effects
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
                    <Notification />
                    <MainSectionRender />
                </FixedWidthContainer>
            </FlexRow>
        </Fragment>
    );
}

export default App;
