import React from 'react';
//Components
import EmptyModels from './EmptyModels';
import ModelsMenuListItem from './ModelsMenuListItem';
//Styles
import './ModelsMenuList.css';


const ModelsMenuList = ({ editModel, isFocused, focusModel, deleteModel, rotateModel, projectModels }) => (
    <ul className='models-menu-list'>
        {
            projectModels.length > 0 ?
                projectModels.map(projectModel => (
                    <ModelsMenuListItem 
                        key = { projectModel.id }
                        editModel = { editModel }
                        isFocused = { isFocused }
                        focusModel = { focusModel }
                        deleteModel = { deleteModel }
                        rotateModel = { rotateModel }
                        projectModel = { projectModel }
                    />
                ))
            : <EmptyModels />
        }
    </ul>
);

export default ModelsMenuList;