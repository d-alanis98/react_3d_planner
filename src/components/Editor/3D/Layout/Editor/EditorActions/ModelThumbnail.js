import React from 'react';
//Functions
import { getModelThumbnail } from '../../../../../../constants/models/models';
//Styles
import './ModelThumbnail.css';


const ModelThumbnail = ({ title, model, onClick, className, modelQuantity, imageClassName }) => {
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
                alt = { model }
                className =  { imageClassName || 'model-thumbnail' }
                
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