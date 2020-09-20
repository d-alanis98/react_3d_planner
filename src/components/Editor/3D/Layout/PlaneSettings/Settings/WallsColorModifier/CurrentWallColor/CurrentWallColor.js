import React from 'react';
//HOC
import withPlaneState from '../../../../../../../../redux/HOC/withPlaneState';
//Styles
import './CurrentWallColor.css';

const CurrentWallColor = ({
    plane: { wallsColor },
}) => (
    <div className='current-color'>
        <div
            className = 'current-color__container'
        >
            <h6>Color actual</h6>
            <div 
                style = {{ backgroundColor: wallsColor }}
            />
        </div>
    </div>
);

//We apply the plane state HOC
let WithPlaneState = withPlaneState(CurrentWallColor);
//We export the decorated component
export default WithPlaneState;