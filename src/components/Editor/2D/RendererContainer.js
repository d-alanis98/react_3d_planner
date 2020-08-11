import React from 'react';
//Components
import FixedHeightContainer from '../../Layout/Containers/FixedHeightContainer';
//Classes
import BidimensionalRenderer from '../../../classes/Renderers/BidimensionalRenderer';

const RendererContainer = () => (
    <FixedHeightContainer
        id = { BidimensionalRenderer.DOM_CONTAINER_ID }
        height = { 100 }
    />
);

export default RendererContainer;