import React from 'react';
//Components
import FlexRow from '../../../../../../Layout/Flex/FlexRow';
import ModelIcon from './ModelIcon';
import ModelName from './ModelName';
import ModelQuickActions from './ModelQuickActions';


const ModelSelector = ({ modelId, modelName, isFocused, focusModel, deleteModel  }) => (
    <FlexRow
        className = 'justify-content-between align-items-center flex-wrap'
    >
        <ModelIcon 
            modelId = { modelId }
        />
        <ModelName 
            modelName = { modelName }
        />
        <ModelQuickActions 
            modelId = { modelId }
            isFocused = { isFocused }
            focusModel = { focusModel }
            deleteModel = { deleteModel }
        />
    </FlexRow>
);

export default ModelSelector;