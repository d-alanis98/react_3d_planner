import React from 'react';
//Components
import EmptyModels from './EmptyModels';
import ModelsMenuListItem from './ModelsMenuListItem';
//Styles
import './ModelsMenuList.css';


const ModelsMenuList = ({ 
    isFocused, 
    focusModel, 
    deleteModel, 
    rotateModel, 
    projectModels,
    handleStateChange,
    handleDirectionChange 
}) => (
    <ul className='models-menu-list'>
        {
            projectModels.length > 0 ?
                projectModels.map(projectModel => (
                    <ModelsMenuListItem 
                        key = { `menu_item_${projectModel.id}` }
                        isFocused = { isFocused }
                        focusModel = { focusModel }
                        deleteModel = { deleteModel }
                        rotateModel = { rotateModel }
                        projectModel = { projectModel }
                        handleStateChange = { handleStateChange }
                        handleDirectionChange = { handleDirectionChange }
                    />
                ))
            : <EmptyModels />
        }
    </ul>
);

export default ModelsMenuList;