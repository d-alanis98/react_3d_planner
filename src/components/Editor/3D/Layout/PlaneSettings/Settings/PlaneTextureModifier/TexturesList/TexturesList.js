import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import withPlaneState from '../../../../../../../../redux/HOC/withPlaneState';
//Styles
import './TexturesList.css';

const TexturesList = ({ 
    plane: { planeTexture },
    setPlaneTexture 
}) => (
    <div className='plane-textures-list'>
        {
            Array.from(new Array(10)).map((item, index) => (
                <div 
                    key = { uuidv4() }
                    onClick = { event => setPlaneTexture(index + 1) }
                    className='plane-textures-list__item'
                >
                    <img 
                        src = { `${process.env.MIX_APP_ENDPOINT}/storage/textures/floor/${index + 1}.jpg` }
                        alt = {`Textura ${index + 1}`}
                        className = 'plane-textures-list__item-img'
                    />
                </div>
            ))
        }
    </div>
);

export default withPlaneState(TexturesList);