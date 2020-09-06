import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AxisDescription = ({ icon, description }) => (
    <div className='mb-2'>
        <small>
            <FontAwesomeIcon 
                icon = { icon }
                className = 'mr-2'
            />
            { description }
        </small>
    </div>
);

export default AxisDescription;