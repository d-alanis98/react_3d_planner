import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Components
import Flex from '../../../../../Layout/Flex/Flex';
import FlexRow from '../../../../../Layout/Flex/FlexRow';
import ModelIcon from '../../../../3D/Layout/ModelsMenu/ModelsMenuList/ModelSelector/ModelIcon';
import EmptyModels from '../../../../3D/Layout/ModelsMenu/ModelsMenuList/EmptyModels';
import CircularIcon from '../../../../../Layout/Icons/CircularIcon';
import LabelWithIcon from '../../../../../Layout/Labels/LabelWithIcon';
import CollapsableContent from '../../../../../Layout/Collapsable/CollapsableContent';
//Classes
import BoundsFactory from '../../../../../../classes/2D/Models/BoundsFactory';
//Styles
import './ModelsList.css';
//Icons
import { faCubes, faEye, faEyeSlash, faRedo, faTimes, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';


const ModelsList = ({
    models, 
    toggleMenu,
    deleteModel,
    rotateModel,
    showMenuList,
    sceneInstance 
}) => (
    <div 
        className = {`models-list-menu__container ${showMenuList ? 'models-list-menu--show' : 'models-list-menu--hide'}`}
    >
        { showMenuList 
            ?   <MenuSections 
                    models = { models }
                    toggleMenu = { toggleMenu }
                    deleteModel = { deleteModel }
                    rotateModel = { rotateModel }
                    sceneInstance = { sceneInstance }
                />
            : null
        }
    </div>
);

export default ModelsList;

const MenuHeader = ({ toggleMenu }) => (
    <FlexRow
        className = 'align-items-center'
    >
        <CircularIcon 
            icon = { faTimes }
            onClick = { toggleMenu }
            className = 'mr-2'
        />
        <LabelWithIcon 
            icon = { faCubes }
            className = 'h5 mb-0'
            labelText = 'Listado de modelos'
        />
    </FlexRow>
);

const MenuSections = ({ 
    models, 
    toggleMenu,
    deleteModel,
    rotateModel,
    sceneInstance 
}) => (
    <div>
        <MenuHeader 
            toggleMenu = { toggleMenu }
        />
        <hr />
        <Models 
            models = { models }
            deleteModel = { deleteModel }
            rotateModel = { rotateModel }
            sceneInstance = { sceneInstance }
        />
    </div>
);

const Models = ({ 
    models,
    deleteModel,
    rotateModel,
    sceneInstance 
}) => {
    if(models.length === 0)
        return <EmptyModels />
    return models.map(model => (
        <ModelListItem 
            key = { model._id }
            model = { model }
            deleteModel = { deleteModel }
            rotateModel = { rotateModel }
            sceneInstance = { sceneInstance }
        />
    ))
}

const ModelListItem = ({ 
    model,
    deleteModel,
    rotateModel,
    sceneInstance  
}) => (
    <Flex
        className = 'models-list__item'
    >
        <ModelSelector 
            model = { model }
            deleteModel = { deleteModel }
            sceneInstance = { sceneInstance }
        />
        <ModelDetails 
            model = { model }
            rotateModel = { rotateModel }
        />
    </Flex>
);

const ModelSelector = ({ 
    model,
    deleteModel,
    sceneInstance  
}) => (
    <FlexRow
        className = 'align-items-center justify-content-between flex-wrap px-1'
    >
        <ModelIcon 
            modelId = { model._id }
        />
        { model.name() }
        <VisibilityModifier 
            model = { model }
            sceneInstance = { sceneInstance }
        />
        <FontAwesomeIcon 
            icon = { faTrash }
            onClick = { () => deleteModel(model) }
            className = 'text-danger mr-2'
        />
    </FlexRow>
);

const ModelDetails = ({ model, rotateModel }) => (
    <CollapsableContent
        id = {`details_${model._id}`}
    >
        <RotationControls 
            model = { model }
            rotateModel = { rotateModel }
        />
    </CollapsableContent>
);

const RotationControls = ({ model, rotateModel }) => (
    <FlexRow
        className = 'align-items-center justify-content-center p-3'
    >
        <CircularIcon 
            icon = { faUndo }
            onClick = { () => rotateModel(model, -90) }
            className = 'mr-2'
        />
        <CircularIcon 
            icon = { faRedo }
            onClick = { () => rotateModel(model, 90) }
            className = 'mr-2'
        />
    </FlexRow>
);

export let VisibilityModifier = ({ 
    model, 
    onStateChange,
    sceneInstance, 
    withCircularIcon
}) => {
    const [visible, setVisible] = useState();

    useEffect(() => {
        if(visible !== undefined)
            model.visible(visible);
        else return;
        //Handling model's bounds
        if(!visible)
            BoundsFactory.deleteModelBounds(model._id, sceneInstance);
        else (new BoundsFactory(model, sceneInstance)).create();
        onStateChange && typeof onStateChange === 'function' && onStateChange(visible);
    }, [visible]);

    useEffect(() => {
        setVisible(model.visible());
    }, [model]);

    const getIcon = () => visible ? faEyeSlash : faEye;

    const getIconClassName = () => visible ? 'text-muted' : 'text-primary';

    const toggleVisiblity = () => {
        setVisible(!model.visible());
    }

    return withCircularIcon 
        ?   <CircularIcon 
                icon = { getIcon() }
                onClick = { () => toggleVisiblity() }
                className = 'p-2'
                iconClassName = { getIconClassName() }
            />
        :   <FontAwesomeIcon 
                icon = { getIcon() }
                onClick = { () => toggleVisiblity() }
                className = { getIconClassName() }
            />
}