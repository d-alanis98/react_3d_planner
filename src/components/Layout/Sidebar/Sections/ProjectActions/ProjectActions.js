import React from 'react';
//Components
import FlexColumn from '../../../Flex/FlexColumn';
import LabelWithIcon from '../../../Labels/LabelWithIcon';
//HOC
import withProjectState from '../../../../../redux/HOC/withProjectState';
//Icons
import { faSave, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const ProjectActions = ({ 
    project: { id: projectId, cotizationId },
    className, 
    saveProject,
}) => {

    const exitEditor = () => {
        const redirectToCotizations = () => window.location.href = `/admin/cotizaciones/${cotizationId}`;
        //If the project was not initialized (no design id) we only redirect to the cotization
        if(!projectId) {
            redirectToCotizations();
            return;
        }
        //Otherwise, we also save the progress before leaving
        saveProject()
            .then(success => {
                redirectToCotizations();
            });
    }

    return (
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

            <LabelWithIcon 
                icon = { faSignOutAlt }
                title = 'Salir'
                onClick = { exitEditor }
                className = 'text-sidebar-icon cursor-click mb-3'
                data-toggle = 'tooltip' 
                data-placement = 'right' 
            />
        </FlexColumn>
    );
}

//We apply the project state HOC
let WithProjectState = withProjectState(ProjectActions);
//We export the decorated component
export default WithProjectState;
