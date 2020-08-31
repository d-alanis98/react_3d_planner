import React from 'react';
import ContextMenu from '../../../ContextMenu/ContextMenu';
import LabelWithIcon from '../../../Layout/Labels/LabelWithIcon';
import { faUndo, faRedo, faTrash } from '@fortawesome/free-solid-svg-icons';

const BidimensionalContextMenu = ({ 
    model, 
    handleModelRotation,
    handleModelDeletion,
    displayContextMenu = false, 
    contextMenuPositionInX, 
    contextMenuPositionInY 
}) => (
    <ContextMenu
        displayContextMenu = { displayContextMenu }
        contextMenuPositionInX = { contextMenuPositionInX }
        contextMenuPositionInY = { contextMenuPositionInY }
    >
        <li className='custom-cm__item'>
            <LabelWithIcon 
                icon = { faRedo }
                onClick = { event => handleModelRotation(model, 90) }
                labelText = 'Rotar a la derecha'
                className = 'text-muted mb-0 cursor-click'
            />
        </li>
        <li className='custom-cm__item'>
            <LabelWithIcon 
                icon = { faUndo }
                onClick = { event => handleModelRotation(model, -90) }
                labelText = 'Rotar a la izquierda'
                className = 'text-muted mb-0 cursor-click'
            />
        </li>
        <hr/>
        <li className='custom-cm__item'>
            <LabelWithIcon 
                icon = { faTrash }
                onClick = { event => handleModelDeletion(model) }
                labelText = 'Eliminar modelo'
                className = 'text-danger mb-0 cursor-click'
            />
        </li>
    </ContextMenu>
);

export default BidimensionalContextMenu;