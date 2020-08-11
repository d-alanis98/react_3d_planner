import React from 'react';
//Components
import FlexColumn from '../../Flex/FlexColumn';
import LabelWithIcon from '../../Labels/LabelWithIcon';
//HOC
import withEditorState from '../../../../redux/HOC/withEditorState';
//Icons
import { faToolbox, faObjectGroup, faCube, faCog } from '@fortawesome/free-solid-svg-icons';
//Constants
import { CATALOG, TRIDIMENSIONAL_EDITOR, BIDIMENSIONAL_EDITOR, PROJECT_SETTINGS } from '../../../../constants/sections/sections';


const EditorActions = ({ setEditorType }) => {
    return(
        <FlexColumn
            className = 'align-items-center justify-content-around'
        >
            <LabelWithIcon 
                icon = { faToolbox }
                title = 'Catálogo'
                onClick = { event => setEditorType(CATALOG) }
                className = 'text-sidebar-icon cursor-click mb-3'
                data-toggle = 'tooltip' 
                data-placement = 'right' 
                
            />
            <LabelWithIcon 
                icon = { faCube }
                title = '3D'
                onClick = { event => setEditorType(TRIDIMENSIONAL_EDITOR) }
                className = 'text-sidebar-icon cursor-click mb-3'
                data-toggle = 'tooltip' 
                data-placement = 'right' 
            />
            <LabelWithIcon 
                icon = { faObjectGroup }
                title = '2D'
                onClick = { event => setEditorType(BIDIMENSIONAL_EDITOR) }
                className = 'text-sidebar-icon cursor-click mb-3'
                data-toggle = 'tooltip' 
                data-placement = 'right' 
            />
            <LabelWithIcon 
                icon = { faCog }
                title = 'Ajustes del proyecto'
                onClick = { event => setEditorType(PROJECT_SETTINGS) }
                className = 'text-sidebar-icon cursor-click'
                data-toggle = 'tooltip' 
                data-placement = 'right' 
            />

        </FlexColumn>
    );
}

//We apply the editor state HOC to get access to the setEditorType method
let WithEditorState = withEditorState(EditorActions);
//We export the decorated component
export default WithEditorState;