import React, { useState, Fragment } from 'react';
//Components
import ModelsList from './ModelsList';
import ActionWithIcon from '../ModelActions/Actions/ActionWithIcon/ActionWithIcon';
//HOC
import with2DRendererContextConsumer from '../../../../../Renderer/2D/HOC/with2DRendererContextConsumer';
//Icons
import { faCubes } from '@fortawesome/free-solid-svg-icons';


const ModelsListToggler = ({ 
    rendererState: {
        sceneInstance,
        handleModelDeletion,
        handleModelRotation,
    } 
}) => {
    const [showMenuList, setShowMenuList] = useState(false);

    const toggleMenu = () => setShowMenuList(previousState => !previousState);

    return (
        <Fragment>
            <ActionWithIcon 
                icon = { faCubes }
                onClick = { toggleMenu }
                className = 'mx-3'
            />
            <ModelsList 
                models = { sceneInstance?.objects || [] }
                toggleMenu = { toggleMenu }
                deleteModel = { handleModelDeletion }
                rotateModel = { handleModelRotation }
                showMenuList = { showMenuList }
                sceneInstance = { sceneInstance }
            />
        </Fragment>
    );
}

const With2DRendererContextConsumer = with2DRendererContextConsumer(ModelsListToggler);
export default With2DRendererContextConsumer;