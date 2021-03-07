import React from 'react';
//Components
import FlexRow from '../../../../../../Layout/Flex/FlexRow';
import CircularIcon from '../../../../../../Layout/Icons/CircularIcon';
//Icons
import { faRedo, faUndo } from '@fortawesome/free-solid-svg-icons';

const ModelRotationControls = ({ modelId, rotateModel }) => {

    const handleRotation = (event, id, degrees) => {
        event.stopPropagation();
        rotateModel(id, degrees);
    }

    return (
        <FlexRow
            className = 'models-menu-list__rotation-controls'
        >
            <CircularIcon 
                icon = { faRedo }
                onClick = { event => handleRotation(event, modelId, -90) }
                className = 'mr-2'
            />
            <CircularIcon 
                icon = { faUndo }
                onClick = { event => handleRotation(event, modelId, 90) }
            />
        </FlexRow>
    );
}

export default ModelRotationControls;