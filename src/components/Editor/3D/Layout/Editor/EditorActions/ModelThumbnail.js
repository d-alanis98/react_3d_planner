import React from 'react';
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
                alt = { title }
                src = {`${process.env.MIX_APP_API_ENDPOINT}/productos/lineas/${model.id_lineaProducto}/getPic?small=true`} 
                className = { imageClassName || 'model-thumbnail' }
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