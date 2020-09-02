import React from 'react';
//Components
import FlexColumn from '../../../../../../Layout/Flex/FlexColumn';
import LabelWithIcon from '../../../../../../Layout/Labels/LabelWithIcon';
//Icons
import { faCrosshairs, faCaretSquareUp, faWindowMaximize, faWindowRestore, faCaretSquareLeft, faCaretSquareRight, faCube } from '@fortawesome/free-solid-svg-icons';
//Classes
import CameraRotationFactory from '../../../../../../../classes/3D/Camera/CameraRotationFactory';
import ButtonWithIcon from '../../../../../../Layout/Buttons/ButtonWithIcon';



const CameraPositionMenu = ({ rotateCamera }) => {
    //Available views
    let { TOP_VIEW, BACK_VIEW, FRONT_VIEW, FRONT_LEFT, FRONT_RIGHT, ISOMETRIC_VIEW } = CameraRotationFactory;
    return(
        <div 
            title = 'Vistas'
            className = 'dropup'
            data-toggle = 'tooltip' 
            data-placement = 'top' 
        >
            <ButtonWithIcon 
                icon = { faCrosshairs }
                type = 'outline-secondary'
                className = 'btn-sm rounded-pill px-2 mr-2 py-2'
                onHoverText = 'Vistas'
                data-toggle = 'dropdown' 
                aria-haspopup = 'true' 
                aria-expanded = 'false'
                iconClassName = 'mr-0'
            />
            <div className='dropdown-menu mb-3 px-2 py-2'>
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
            </div>
        </div>
    );
}

export default CameraPositionMenu;