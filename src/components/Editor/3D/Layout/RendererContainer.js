import React, { Fragment } from 'react';
//Components
import ModelsMenuContainer from './ModelsMenu/ModelsMenuContainer';
import FixedHeightContainer from '../../../Layout/Containers/FixedHeightContainer';

const RendererContainer = ({ models, addTextureToObject, deleteModelById }) => (
    <Fragment>
        <FixedHeightContainer
            id = 'tridimensional_renderer'
            height = { 100 }
        />
        <ModelsMenuContainer 
            models = { models }
            deleteModelById = { deleteModelById }
            addTextureToObject = { addTextureToObject }
        />
    </Fragment>
);

export default RendererContainer;