import React from 'react';
//Components
import Dropup from '../../../../../../Layout/Dropdowns/Dropup';
import FlexColumn from '../../../../../../Layout/Flex/FlexColumn';
import LabelWithIcon from '../../../../../../Layout/Labels/LabelWithIcon';
import ButtonWithIcon from '../../../../../../Layout/Buttons/ButtonWithIcon';
//Icons
import { faCube, faVideo, faCaretSquareUp, faWindowMaximize, faWindowRestore, faCaretSquareLeft, faCaretSquareRight  } from '@fortawesome/free-solid-svg-icons';
//Classes
import CameraRotationFactory from '../../../../../../../classes/3D/Camera/CameraRotationFactory';



const CameraPositionMenu = ({ rotateCamera }) => {
    //Available views
    let { TOP_VIEW, BACK_VIEW, FRONT_VIEW, FRONT_LEFT, FRONT_RIGHT, ISOMETRIC_VIEW } = CameraRotationFactory;
    return(
        <Dropup
            togglerText = {
                <ButtonWithIcon 
                    icon = { faVideo }
                    type = 'outline-secondary'
                    className = 'btn-sm rounded-pill px-2 py-2'
                    buttonText = 'Vistas'
                    iconClassName = 'mr-1'
                />
            }
        >
            <FlexColumn>
                <LabelWithIcon 
                    icon = { faCaretSquareUp }
                    labelText = 'Superior'
                    onClick = { e => rotateCamera(TOP_VIEW) }
                    className = 'cursor-click dropdown-item'
                />
                <LabelWithIcon 
                    icon = { faWindowMaximize }
                    labelText = 'Frente'
                    onClick = { e => rotateCamera(FRONT_VIEW) }
                    className = 'cursor-click dropdown-item'
                />
                <LabelWithIcon 
                    icon = { faWindowRestore }
                    labelText = 'Atras'
                    onClick = { e => rotateCamera(BACK_VIEW) }
                    className = 'cursor-click dropdown-item'
                />
                <LabelWithIcon 
                    icon = { faCaretSquareRight }
                    labelText = 'Derecha'
                    onClick = { e => rotateCamera(FRONT_RIGHT) }
                    className = 'cursor-click dropdown-item'
                />
                <LabelWithIcon 
                    icon = { faCaretSquareLeft }
                    labelText = 'Izquierda'
                    onClick = { e => rotateCamera(FRONT_LEFT) }
                    className = 'cursor-click dropdown-item'
                />
                <LabelWithIcon 
                    icon = { faCube }
                    labelText = 'Isométrico'
                    onClick = { e => rotateCamera(ISOMETRIC_VIEW) }
                    className = 'cursor-click dropdown-item'
                />

            </FlexColumn>
        </Dropup>
    );
}

export default CameraPositionMenu;