import React from 'react';
//Components
import FlexColumn from '../../../Flex/FlexColumn';
import LabelWithIcon from '../../../Labels/LabelWithIcon';
import LoadProjectAction from './LoadProjectAction';
//HOC
import withProjectState from '../../../../../redux/HOC/withProjectState';
//Icons
import { faSave, faDownload } from '@fortawesome/free-solid-svg-icons';


const ProjectActions = ({ 
    className, 
    saveProject,
}) => (
    <FlexColumn
        className = {`align-items-center justify-content-around ${className || ''}`}
    >
        <LabelWithIcon 
            icon = { faSave }
            title = 'Guardar'
            onClick = { event => saveProject() }
            className = 'text-sidebar-icon cursor-click mb-3'
            data-toggle = 'tooltip' 
            data-placement = 'right' 
        />

        <LoadProjectAction />

        <LabelWithIcon 
            icon = { faDownload }
            title = 'Descargar'
            className = 'text-sidebar-icon cursor-click mb-3'
            data-toggle = 'tooltip' 
            data-placement = 'right' 
        />
    </FlexColumn>
);

//We apply the project state HOC
let WithProjectState = withProjectState(ProjectActions);
//We export the decorated component
export default WithProjectState;
