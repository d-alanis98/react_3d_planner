import React from 'react';
//Componentes
import FlexColumn from '../../Flex/FlexColumn';
import LabelWithIcon from '../../Labels/LabelWithIcon';
//Íconos
import { faToolbox, faObjectGroup, faCube } from '@fortawesome/free-solid-svg-icons';


const EditorActions = () => {
    return(
        <FlexColumn
            className = 'align-items-center justify-content-around'
        >
            <LabelWithIcon 
                icon = { faToolbox }
                title = 'Catálogo'
                className = 'text-sidebar-icon cursor-click mb-3'
                data-toggle = 'tooltip' 
                data-placement = 'right' 
                
            />
            <LabelWithIcon 
                icon = { faCube }
                title = '3D'
                className = 'text-sidebar-icon cursor-click mb-3'
                data-toggle = 'tooltip' 
                data-placement = 'right' 
            />
            <LabelWithIcon 
                icon = { faObjectGroup }
                title = '2D'
                className = 'text-sidebar-icon cursor-click'
                data-toggle = 'tooltip' 
                data-placement = 'right' 
            />

        </FlexColumn>
    );
}

export default EditorActions;