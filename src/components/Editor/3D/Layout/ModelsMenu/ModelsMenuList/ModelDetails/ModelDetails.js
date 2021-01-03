import React from 'react';
//Components
import FlexRow from '../../../../../../Layout/Flex/FlexRow';
import ModelThumbnail from './ModelThumbnail';
import ModelFamilyTable from './ModelFamilyTable';
import CollapsableContent from '../../../../../../Layout/Collapsable/CollapsableContent';
import ModelRotationControls from './ModelRotationControls';
import ModelState from './ModelState';


const ModelDetails = ({ 
    modelId, 
    modelType, 
    modelState,
    rotateModel, 
    modelDirection,
    modelProductLine,
    handleStateChange,
    handleDirectionChange,
    canDoorBeOpenedOrClosed,
    modelHasRightOrLeftVariant 
}) => (
    <CollapsableContent
        id = { `details_${modelId}` }
    >
        <FlexRow
            className = 'flex-wrap justify-content-between align-items-center pt-3'
        >
            <ModelThumbnail 
                modelProductLine = { modelProductLine }
            />
            <ModelRotationControls 
                modelId = { modelId }
                rotateModel = { rotateModel }
            />
            <ModelFamilyTable 
                modelType = { modelType }
                modelProductLine = { modelProductLine }
            />
            <ModelState 
                modelId = { modelId }
                modelState = { modelState }
                modelDirection = { modelDirection }
                handleStateChange = { handleStateChange }
                handleDirectionChange = { handleDirectionChange }
                canDoorBeOpenedOrClosed = { canDoorBeOpenedOrClosed }
                modelHasRightOrLeftVariant = { modelHasRightOrLeftVariant }
            />
        </FlexRow>
    </CollapsableContent>
);


export default ModelDetails;