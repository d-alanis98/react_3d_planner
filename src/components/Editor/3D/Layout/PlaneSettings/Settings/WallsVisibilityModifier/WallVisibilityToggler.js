import React from 'react';
//Components
import LabelWithIcon from '../../../../../../Layout/Labels/LabelWithIcon';
//Icons
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const WallVisibilityToggler = ({ id, visible, wallName, handleWallChange }) => {

    const getIcon = () => (
        visible ? faEyeSlash : faEye
    );

    const getClassName = () => (
        `cursor-click mb-0 ${visible ? 'text-light' : 'text-white'}` 
    );

    const getLabelText = () => (
        `${ visible ? 'Ocultar' : 'Mostrar'} muro ${wallName}`
    );

    return (
        <div className='models-menu-list__item'>
            <LabelWithIcon 
                id = { id }
                icon = { getIcon() }
                onClick = { handleWallChange }
                className = { getClassName() }
                labelText = { getLabelText() }
            />
        </div>
    );
}

export default WallVisibilityToggler;