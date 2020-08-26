import React from 'react';
//Components
import FlexColumn from '../Flex/FlexColumn';
import EditorActions from './Sections/EditorActions';
import ProjectActions from './Sections/ProjectActions/ProjectActions';
//Styles
import './Sidebar.css';
import FixedWidthContainer from '../Containers/FixedWidthContainer';
import FixedHeightContainer from '../Containers/FixedHeightContainer';

const Sidebar = () => {
    
    return(
        <FixedWidthContainer
            width = { 5 }
            className = 'position-relative'
        >
            <FixedHeightContainer
                height = { 100 }
                className = 'sidebar-width position-fixed bg-dark pt-4'
            >
                <FlexColumn
                    className = 'align-items-center justify-content-start'
                >
                    <ProjectActions 
                        className = 'my-4'
                    />
                    <EditorActions />
                </FlexColumn>
            </FixedHeightContainer>
        </FixedWidthContainer>
    );
}

export default Sidebar;