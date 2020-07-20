import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Components
import FlexRow from '../../../../../../Layout/Flex/FlexRow';
import ButtonWithIcon from '../../../../../../Layout/Buttons/ButtonWithIcon';
import CameraPositionMenu from './CameraPositionMenu';
//Icons
import { faArrowsAlt, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';


const PlaneActions = ({ rotateCamera, toggleOrbitControls, orbitControlsEnabled }) => {
    return(
        <FlexRow
            className = 'justify-content-start align-items-center'
        >  
            <CameraPositionMenu 
                rotateCamera = { rotateCamera }
            />
            <ButtonWithIcon 
                icon = { orbitControlsEnabled ? faLock : faLockOpen }
                title = 'Bloquear/desbloquear plano'
                type = { orbitControlsEnabled ?  'outline-secondary' : 'secondary' }
                onClick = { toggleOrbitControls }
                className = 'btn-sm rounded-pill px-3 py-2 mr-2'
                buttonText = {
                    <FontAwesomeIcon 
                        icon = { faArrowsAlt }
                    />
                }
                data-toggle = 'tooltip' 
                data-placement = 'top' 
            />    
        </FlexRow>
    );
}

export default PlaneActions;