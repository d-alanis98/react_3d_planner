import React from 'react';
//Styles
import './TexturesList.css';

const TexturesList = ({ textures, onTextureChange }) => (
    <ul className='textures-list'>
        {
            textures.map(texture => (
                <li 
                    id = { texture.id_color }
                    key = { texture.id_color }
                    onClick = { onTextureChange }
                    className = 'textures-list__item'
                >
                    <img 
                        src = { `${process.env.MIX_APP_API_ENDPOINT}/colors/${texture.id_color}` }
                        className = 'textures-list__item-img'
                    />
                    { texture.nombre_es }
                </li>
            ))
        }
    </ul>
);

export default TexturesList;