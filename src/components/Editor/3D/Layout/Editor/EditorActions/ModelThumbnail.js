import React from 'react';
//Métodos
import { getModelThumbnail } from '../../../../../../constants/models/models';
//Estilos
import './ModelThumbnail.css';


const ModelThumbnail = ({ title, model, onClick, className, modelQuantity }) => {
    return(
        <div 
            title = { title }
            onClick = { onClick }
            className = { `model-thumbnail-container cursor-click ${className || ''}` }
            data-toggle = 'tooltip' 
            data-placement = 'right' 
        >
            <img 
                src = { getModelThumbnail(model) } 
                className = 'model-thumbnail'
                alt = { model }
            />
            {
                modelQuantity > 0 && 
                <div className='quantity-tile'>
                    <span className='rounded-circle bg-primary circle-tile text-light'>{ modelQuantity }</span>
                </div>
            }
        </div>
    );
}

export default ModelThumbnail;