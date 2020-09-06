import React, { Fragment } from 'react';
//Components
import ModelsMenuContainer from './ModelsMenu/ModelsMenuContainer';
import FixedHeightContainer from '../../../Layout/Containers/FixedHeightContainer';

const RendererContainer = ( ) => (
    <Fragment>
        <FixedHeightContainer
            id = 'tridimensional_renderer'
            height = { 100 }
        />
        <ModelsMenuContainer />
    </Fragment>
);

export default RendererContainer;