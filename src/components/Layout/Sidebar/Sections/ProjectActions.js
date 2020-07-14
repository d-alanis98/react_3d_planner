import React from 'react';
//Componentes
import FlexColumn from '../../Flex/FlexColumn';
import LabelWithIcon from '../../Labels/LabelWithIcon';
//Íconos
import { faSave, faDownload, faFolderOpen,} from '@fortawesome/free-solid-svg-icons';

const ProjectActions = ({ className }) => {
    return(
        <FlexColumn
            className = {`align-items-center justify-content-around ${className || ''}`}
        >
            <LabelWithIcon 
                icon = { faSave }
                title = 'Guardar'
                className = 'text-sidebar-icon cursor-click mb-3'
                data-toggle = 'tooltip' 
                data-placement = 'right' 
            />
            <LabelWithIcon 
                icon = { faFolderOpen }
                title = 'Abrir'
                className = 'text-sidebar-icon cursor-click mb-3'
                data-toggle = 'tooltip' 
                data-placement = 'right' 
            />
            <LabelWithIcon 
                icon = { faDownload }
                title = 'Descargar'
                className = 'text-sidebar-icon cursor-click mb-3'
                data-toggle = 'tooltip' 
                data-placement = 'right' 
            />
        </FlexColumn>
    );
}

export default ProjectActions;