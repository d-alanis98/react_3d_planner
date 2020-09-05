import React from 'react';
//Components
import FlexRow from '../../../../../../Layout/Flex/FlexRow';
import ModelThumbnail from './ModelThumbnail';
import ModelFamilyTable from './ModelFamilyTable';
import CollapsableContent from '../../../../../../Layout/Collapsable/CollapsableContent';
import ModelRotationControls from './ModelRotationControls';


const ModelDetails = ({ 
    modelId, 
    modelType, 
    rotateModel, 
    modelProductLine  
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
        </FlexRow>
    </CollapsableContent>
);


export default ModelDetails;