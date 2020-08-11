import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Components
import FlexRow from '../../../../../../Layout/Flex/FlexRow';
import PlaneSettings from './PlaneSettings/PlaneSettings';
import ButtonWithIcon from '../../../../../../Layout/Buttons/ButtonWithIcon';
import CameraPositionMenu from './CameraPositionMenu';
//HOC
import withProjectState from '../../../../../../../redux/HOC/withProjectState';
import withEditorState from '../../../../../../../redux/HOC/withEditorState';
//Icons
import { faArrowsAlt, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';




const PlaneActions = props => {
    //PROPS
    let {
        //From editor state HOC
        editorState, 
        setEditorWidth, 
        setEditorHeight, 
        //From parent component
        rotateCamera, 
        addTextureToPlane, 
        toggleOrbitControls, 
        orbitControlsEnabled, 
    } = props;

    //Object destructuring
    const { editorHeight, editorWidth } = editorState;
    
    /**
     * Method that changes the plane texture based on the desired one
     * @param {object} event 
     */
    const handleTextureChange = event => {
        let { checked, value } = event.target;
        if(checked)
            addTextureToPlane(value);
    }
    
    return(
        <FlexRow
            className = 'justify-content-start align-items-center'
        >  
            <CameraPositionMenu 
                rotateCamera = { rotateCamera }
            />
            <PlaneSettings 
                editorWidth = { editorWidth }
                editorHeight = { editorHeight }
                setEditorWidth = { setEditorWidth }
                setEditorHeight = { setEditorHeight }
                handleTextureChange = { handleTextureChange }
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

//We apply the project state HOC
let WithProjectState = withProjectState(PlaneActions);
//We apply the editor state decorator 
let WithEditorState = withEditorState(WithProjectState);
//We return the decorated component
export default WithEditorState;