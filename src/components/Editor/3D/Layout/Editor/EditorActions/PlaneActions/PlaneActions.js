import React, { Fragment } from 'react';
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
            buttonText = 'Ajustes'
            iconClassName = 'mr-1'
        />
        <ButtonWithIcon 
            icon = { orbitControlsEnabled ? faLock : faLockOpen }
            type = { orbitControlsEnabled ?  'outline-secondary' : 'secondary' }
            onClick = { toggleOrbitControls }
            className = 'btn-sm rounded-pill px-3 py-2 mr-2'
            buttonText = {
                <Fragment>
                    <FontAwesomeIcon 
                        icon = { faArrowsAlt }
                        className = 'mr-1'
                    />
                    { orbitControlsEnabled ? 'Bloquear plano' : 'Liberar plano' } 

                </Fragment>
            }
        /> 
        
        
        <div className='btn-group' onClick={e => e.preventDefault()}>
            <WallsModifier 
                sceneWalls = { sceneWalls }
                displayWalls = { displayWalls }
                toggleWallsVisibility = { toggleWallsVisibility }
            /> 
        </div>
        
        <ButtonWithIcon 
            icon = { faBars }
            type = 'outline-secondary'
            onClick = { event => setDisplayModelsMenu(!displayModelsMenu) }
            className = 'btn-sm rounded-pill px-3 py-2 mr-2'
            buttonText = {
                <Fragment>
                    <FontAwesomeIcon 
                        icon = { faCubes }
                        className = 'mr-1'
                    />
                    Modelos
                </Fragment>
            }
        /> 
    </FlexRow>
);


//We apply the project state HOC
let WithProjectState = withProjectState(PlaneActions);
//We apply the editor state decorator 
let WithPlaneState = withPlaneState(WithProjectState);
//We return the decorated component
export default WithPlaneState;