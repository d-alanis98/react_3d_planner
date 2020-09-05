import React from 'react';
//Components
import FlexRow from '../../../../../../Layout/Flex/FlexRow';
import LabelWithIcon from '../../../../../../Layout/Labels/LabelWithIcon';
//Icons
import { faEye, faEyeSlash, faTrash } from '@fortawesome/free-solid-svg-icons';

const ModelQuickActions = ({ modelId, isFocused, focusModel, deleteModel }) => (
    <FlexRow
        className = 'justify-content-end'
    >
        <LabelWithIcon 
            id = { modelId }
            icon = { isFocused(modelId) ? faEyeSlash : faEye }
            onClick = { focusModel }
            className = 'text-light cursor-click mb-0 mr-2'
        />
        <LabelWithIcon 
            id = { modelId }
            icon = { faTrash }
            onClick = { deleteModel }
            className = 'text-danger cursor-click mb-0'
        />
    </FlexRow>
);

export default ModelQuickActions;