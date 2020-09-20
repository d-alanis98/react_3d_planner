import React, { Fragment } from 'react';
//Components
import ModelsMenuContainer from './ModelsMenu/ModelsMenuContainer';
import FixedHeightContainer from '../../../Layout/Containers/FixedHeightContainer';
import PlaneSettingsContainer from './PlaneSettings/PlaneSettingsContainer';

const RendererContainer = ( ) => (
    <Fragment>
        <FixedHeightContainer
            id = 'tridimensional_renderer'
            height = { 100 }
        />
        <ModelsMenuContainer />
        <PlaneSettingsContainer />
    </Fragment>
);

export default RendererContainer;