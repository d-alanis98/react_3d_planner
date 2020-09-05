import React, { useEffect, useRef } from 'react';
//Components
import ModelEditor from '../ModelEditor/ModelEditor';
import LabelWithIcon from '../../../../Layout/Labels/LabelWithIcon';
import PropertyHeader from '../ModelEditor/PropertyHeader/PropertyHeader';
import ModelsMenuList from './ModelsMenuList/ModelsMenuList';
import FixedHeightContainer from '../../../../Layout/Containers/FixedHeightContainer';
//Icons
import { faCubes } from '@fortawesome/free-solid-svg-icons';
//Styles
import './ModelsMenu.css';


const ModelsMenu = ({ 
    isFocused, 
    focusModel, 
    deleteModel, 
    rotateModel, 
    modelToEdit, 
    projectModels, 
    displayModelsMenu,
    addTextureToObject, 
    setDisplayModelsMenu
}) => {
    const modelsMenuContainer = useRef();

    useEffect(() => {
        if(displayModelsMenu) {
            modelsMenuContainer.current.classList.remove('models-menu__container--unmounted');
            modelsMenuContainer.current.classList.add('models-menu__container--mounted');
        }
        else {
            modelsMenuContainer.current.classList.remove('models-menu__container--mounted');
            modelsMenuContainer.current.classList.add('models-menu__container--unmounted');
        }
    }, [displayModelsMenu]);

    return (
        <div
            ref = { modelsMenuContainer }
            className = 'models-menu__container models-menu__container--unmounted'
        >
            <FixedHeightContainer
                height = { 100 }
            >
                <FixedHeightContainer
                    height = { 40 }
                    relative
                >
                    <PropertyHeader
                        onIconClick = { event => setDisplayModelsMenu(false) }
                    >
                        <LabelWithIcon 
                                icon = { faCubes }
                                className = 'models-menu__label'
                                labelText = 'Modelos en escena'
                        />
                    </PropertyHeader>
                    <ModelsMenuList 
                        isFocused = { isFocused }
                        focusModel = { focusModel }
                        deleteModel = { deleteModel }
                        rotateModel = { rotateModel }
                        projectModels = { projectModels }
                    />
                </FixedHeightContainer>
                <FixedHeightContainer
                    height = { 60 }
                    relative
                >
                    <ModelEditor 
                        modelToEdit = { modelToEdit }
                        addTextureToObject = { addTextureToObject }
                    />
                </FixedHeightContainer>
            </FixedHeightContainer>
        </div>
    );
}

export default ModelsMenu;