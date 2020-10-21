import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Components
import FlexRow from '../../../../../../Layout/Flex/FlexRow';
import WallsModifier from '../PlaneActions/WallsModifier';
import ButtonWithIcon from '../../../../../../Layout/Buttons/ButtonWithIcon';
import CameraPositionMenu from './CameraPositionMenu';
//HOC
import withPlaneState from '../../../../../../../redux/HOC/withPlaneState';
import withProjectState from '../../../../../../../redux/HOC/withProjectState';
//Styles
import './PlaneActions.css';
//Icons
import { faArrowsAlt, faLock, faLockOpen, faCubes, faBars, faEye, faEyeSlash, faHome, faCog } from '@fortawesome/free-solid-svg-icons';





const PlaneActions = ({
    //From project state HOC
    project: { displayModelsMenu },
    setDisplayModelsMenu,
    //From plane state HOC
    plane: { displayPlaneSettings },
    setDisplayPlaneSettings,
    //From parent component
    sceneWalls,
    rotateCamera, 
    displayWalls,
    toggleOrbitControls, 
    orbitControlsEnabled, 
    toggleWallsVisibility
}) => (
    <FlexRow
        className = 'justify-content-start align-items-center h-100'
    >  
        <CameraPositionMenu 
            rotateCamera = { rotateCamera }
        />

        <ButtonWithIcon 
            id = '3d_scene_settings'
            icon = { faCog }
            type = 'outline-secondary'
            onClick = { event => setDisplayPlaneSettings(!displayPlaneSettings) }
            className = 'btn-sm rounded-pill px-2 py-2 mr-2'
            onHoverText = 'Ajustes'
            iconClassName = 'mr-0'
        />
        <ButtonWithIcon 
            icon = { orbitControlsEnabled ? faLock : faLockOpen }
            type = { orbitControlsEnabled ?  'outline-secondary' : 'secondary' }
            onClick = { toggleOrbitControls }
            className = 'btn-sm rounded-pill px-3 py-2 mr-2'
            buttonText = {
                <FontAwesomeIcon 
                    icon = { faArrowsAlt }
                />
            }
            onHoverText = { orbitControlsEnabled ? 'Bloquear plano' : 'Desbloquear plano' } 
        /> 
        
        
        <div className='btn-group' onClick={e => e.preventDefault()}>
            <WallsModifier 
                className = 'walls-visibility__dropup-toggler'
                sceneWalls = { sceneWalls }
                displayWalls = { displayWalls }
            /> 
            <ButtonWithIcon 
                icon = { displayWalls ? faEyeSlash : faEye }
                type =  {displayWalls ? 'outline-secondary' : 'secondary' } 
                onClick = { toggleWallsVisibility }
                className = 'btn-sm px-3 py-2 mr-2 walls-visibility__button'
                buttonText = {     
                    <FontAwesomeIcon 
                        icon = { faHome }
                    />
                }
                onHoverText = { displayWalls ? 'Ocultar muros' : 'Mostrar muros' } 
            /> 
        </div>
        
        <ButtonWithIcon 
            icon = { faBars }
            type = 'outline-secondary'
            onClick = { event => setDisplayModelsMenu(!displayModelsMenu) }
            className = 'btn-sm rounded-pill px-3 py-2 mr-2'
            buttonText = {
                <FontAwesomeIcon 
                    icon = { faCubes }
                />
            }
            onHoverText = { displayModelsMenu ? 'Ocultar menu' : 'Mostrar menu' }
        /> 
    </FlexRow>
);


//We apply the project state HOC
let WithProjectState = withProjectState(PlaneActions);
//We apply the editor state decorator 
let WithPlaneState = withPlaneState(WithProjectState);
//We return the decorated component
export default WithPlaneState;