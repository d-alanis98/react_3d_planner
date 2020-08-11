import React, { useState } from 'react';
//Components
import FlexRow from '../Layout/Flex/FlexRow';
import LabelWithIcon from '../Layout/Labels/LabelWithIcon';
import ButtonWithIcon from '../Layout/Buttons/ButtonWithIcon';
//HOC
import withProjectState from '../../redux/HOC/withProjectState';
//Icons
import { faCogs, faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const ProjectSettings = ({ project, setProjectName, setProjectDescription }) => {
    //Props destructuring
    let { name, description } = project;
    
    //HOOKS
    //State
    const [changesSaved, setChangesSaved] = useState(true);
    const [newProjectName, setNewProjectName] = useState(name);
    const [newProjectDescription, setNewProjectDescription] = useState(description);

    const saveProjectChanges = event => {
        event.preventDefault();
        setChangesSaved(true);
        setProjectName(newProjectName);
        setProjectDescription(newProjectDescription);
    }

    const handleProjectNameChange = event => {
        setChangesSaved(false);
        setNewProjectName(event.target.value);
    }

    const handleProjectDescripctionChange = event => {
        setChangesSaved(false);
        setNewProjectDescription(event.target.value);
    }

    return(
        <div className='container mt-3 py-3'>
            <LabelWithIcon 
                icon = { faCogs }
                labelText = 'Ajustes del proyecto'
                className = 'h4 text-muted'
            />
            <hr />
            <div className='form-group'>
                <label>Nombre del proyecto: </label>
                <input 
                    type = 'text'
                    value = { newProjectName }
                    onChange = { handleProjectNameChange }
                    className = 'form-control rounded-lg'
                    placeholder = 'Nombre del proyecto'
                />
            </div>
            <div className='form-group'>
                <label>Descripción del proyecto: </label>
                <textarea 
                    rows = '5'
                    value = { newProjectDescription }
                    onChange = { handleProjectDescripctionChange }
                    className='form-control'
                />
            </div>
            <FlexRow
                className = 'justify-content-center'
            >
                <ButtonWithIcon 
                    icon = { changesSaved ? faCheckCircle : null }
                    onClick = { !changesSaved && saveProjectChanges }
                    className = 'btn btn-success'
                    buttonText = { changesSaved ? 'Cambios guardados' : 'Guardar cambios' }
                    disabled = { changesSaved }
                />
            </FlexRow>
        </div>
    );
}

//We apply the project state HOC
let WithProjectState = withProjectState(ProjectSettings);
//We export the decorated component
export default WithProjectState;