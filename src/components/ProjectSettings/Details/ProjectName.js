import React from 'react';
//Components
import LabelWithIcon from '../../Layout/Labels/LabelWithIcon';
//Icons
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';

const ProjectName = ({ projectName, handleSettingChange }) => (
    <div className='form-group'>
        <LabelWithIcon 
            icon = { faAsterisk }
            labelText = 'Nombre del proyecto'
            className = 'h6 text-muted'
        />
        <input 
            type = 'text'
            name = 'projectName'
            value = { projectName }
            onChange = { handleSettingChange }
            className = 'form-control rounded-lg'
            placeholder = 'Nombre del proyecto'
        />
    </div>
);

export default ProjectName;