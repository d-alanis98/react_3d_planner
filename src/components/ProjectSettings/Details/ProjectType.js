import React from 'react';
import LabelWithIcon from '../../Layout/Labels/LabelWithIcon';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import ProjectConfiguration from '../../../classes/ProjectConfiguration';

const ProjectType = ({ projectType, isNewProject, handleSettingChange }) => (
    <div className='form-group'>
        <LabelWithIcon 
            icon = { faQuestion }
            labelText = 'Tipo de proyecto'
            className = 'h6 text-muted'
        />
        <select 
            name = 'projectType'
            disabled = { !isNewProject }
            onChange = { handleSettingChange }
            className = 'form-control'
            defaultValue = { projectType }
        >
            <option 
                value = { ProjectConfiguration.CLOSET_PROJECT } 
            >
                Closet
            </option>
            <option 
                value = { ProjectConfiguration.KITCHEN_PROJECT }
            >
                Cocina
            </option>

        </select>
    </div>

);

export default ProjectType;