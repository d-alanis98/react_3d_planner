import React from 'react';
//HOC
import withPlaneState from '../../../../../../../../redux/HOC/withPlaneState';
//Styles
import './CurrentTexture.css';

const CurrentTexture = ({
    plane: { planeTexture },
}) => (
    <div className='current-texture'>
        <div
            className = 'current-texture__container'
        >
            <h6>Textura actual</h6>
            <img 
                src = { `${process.env.MIX_APP_ENDPOINT}/storage/textures/floor/${planeTexture}.jpg` }
            />
        </div>
    </div>
);

//We apply the plane state HOC
let WithPlaneState = withPlaneState(CurrentTexture);
//We export the decorated component
export default WithPlaneState;