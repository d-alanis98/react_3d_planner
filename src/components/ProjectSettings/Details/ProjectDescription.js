import React from 'react';
//Components
import LabelWithIcon from '../../Layout/Labels/LabelWithIcon';
//Icons
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';

const ProjectDescription = ({ projectDescription, handleSettingChange }) => (
    <div className='form-group'>
        <LabelWithIcon 
            icon = { faAlignJustify }
            labelText = 'Descripción del proyecto'
            className = 'h6 text-muted'
        />
        <textarea 
            rows = '5'
            name = 'projectDescription'
            value = { projectDescription }
            onChange = { handleSettingChange }
            className='form-control'
        />
    </div>
);

export default ProjectDescription;