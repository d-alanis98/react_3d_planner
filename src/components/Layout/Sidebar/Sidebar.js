import React from 'react';
//Componentes
import FlexColumn from '../Flex/FlexColumn';
import EditorActions from './Sections/EditorActions';
import ProjectActions from './Sections/ProjectActions';
//Estilos
import './Sidebar.css';

const Sidebar = () => {
    
    return(
        <FlexColumn
            className = 'w-5 h-100 align-items-center justify-content-start bg-dark pt-4'
        >
            <ProjectActions 
                className = 'my-4'
            />
            <EditorActions />
        </FlexColumn>
    );
}

export default Sidebar;