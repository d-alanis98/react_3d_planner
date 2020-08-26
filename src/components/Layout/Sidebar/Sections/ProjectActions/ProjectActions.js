import React from 'react';
//Components
import FlexColumn from '../../../Flex/FlexColumn';
import LabelWithIcon from '../../../Labels/LabelWithIcon';
import LoadProjectAction from './LoadProjectAction';
//Icons
import { faSave, faDownload, faFolderOpen,} from '@fortawesome/free-solid-svg-icons';
import withProjectState from '../../../../../redux/HOC/withProjectState';
import { PROJECT_PROGRESS } from '../../../../../redux/reducers/projectDuck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlexRow from '../../../Flex/FlexRow';

const ProjectActions = ({ project, className, saveProject }) => {
    //PROPS
    const { name: projectName } = project;


    return(
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



        {
            projectName &&
                <a 
                    href = { `data:text/json;charset=utf-8,${encodeURIComponent(localStorage.getItem(PROJECT_PROGRESS))}`}
                    download = { `${projectName}.json` }
                >
                    <LabelWithIcon 
                        icon = { faDownload }
                        title = 'Descargar'
                        className = 'text-sidebar-icon cursor-click mb-3'
                        data-toggle = 'tooltip' 
                        data-placement = 'right' 
                    />
                </a>
        }
        </FlexColumn>
    );
}

//We apply the project state HOC
let WithProjectState = withProjectState(ProjectActions);
//We export the decorated component
export default WithProjectState;
