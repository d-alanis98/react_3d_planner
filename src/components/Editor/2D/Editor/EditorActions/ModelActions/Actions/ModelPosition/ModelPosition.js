import React, { useEffect, useState } from 'react';
//Components
import Dropup from '../../../../../../../Layout/Dropdowns/Dropup';
import FlexRow from '../../../../../../../Layout/Flex/FlexRow';
import CircularIcon from '../../../../../../../Layout/Icons/CircularIcon';
import ActionWithInput from '../ActionWithInput/ActionWithInput';
//HOC
import withEditorState from '../../../../../../../../redux/HOC/withEditorState';
import withProjectState from '../../../../../../../../redux/HOC/withProjectState';
//Classes
import RoomDimensions from '../../../../../../../../classes/2D/Room/RoomDimensions';
import BidimensionalRenderer from '../../../../../../../../classes/Renderers/BidimensionalRenderer';
//Constants
import { modelOffsetPositions } from '../../../../../../../../constants/models/models';
//Icons
import { faCropAlt } from '@fortawesome/free-solid-svg-icons';
//Style
import './ModelPosition.css';

const ModelPosition = ({ 
    project, 
    stepSize,
    setProject,
    editorState, 
    modelToEdit, 
    handlePositionChange
}) => {
    //HOOKS
    //State
    const [localX, setLocalX] = useState();
    const [localY, setLocalY] = useState();
    const [editableX, setEditableX] = useState(0);
    const [editableY, setEditableY] = useState(0);
    const [userFriendlyX, setUserFriendlyX] = useState(0);
    const [userFriendlyY, setUserFriendlyY] = useState(0);
    const [modelOffsetDirection, setModelOffsetDirection] = useState(modelOffsetPositions.topLeft);

    //Effects
    useEffect(() => {
        if(!project?.scene?.['2d']?.offsetPosition)
            return;
        setModelOffsetDirection(project.scene['2d'].offsetPosition);
    }, []);

    useEffect(() => {
        if(!modelToEdit || !modelToEdit.attrs) {
            setLocalX(undefined);
            setLocalY(undefined);
            return;
        }
        setLocalX(modelToEdit.attrs.x);
        setLocalY(modelToEdit.attrs.y);
    }, [modelToEdit]);

    useEffect(() => {
        if(!modelToEdit || !modelToEdit.attrs)
            return;
        setLocalX(modelToEdit.attrs.x);
        setLocalY(modelToEdit.attrs.y);
    })

    useEffect(() => {
        if(localX === undefined || localY === undefined)
            return;
        setUserFriendlyPosition();
    }, [localX, localY]);

    useEffect(() => {
        setUserFriendlyPosition();
        updateOffsetPositionInState();
    }, [modelOffsetDirection]);



    const getDataForTheTransformation = () => {
        //We get data from editor (dimensions of the room in meters)
        const { editorWidth, editorHeight, editorDepth } = editorState;
        //We get the room dimensions in cm
        const { roomWidth, roomDepth, roomHeight } = RoomDimensions.getRoomDimensionsOnCentiMeters(editorWidth, editorHeight, editorDepth);
        //We get the size of the room (in pixels)
        const bidimensionalScene = project.scene[BidimensionalRenderer.BIDIMENSIONAL_SCENE];
        //We get data from the scene
        const { view, sceneWidth, sceneHeight, roomWidth: roomWidthInPixels, roomHeight: roomHeightInPixels } = bidimensionalScene;
        //We calculate the padding
        const paddingInX = (sceneWidth - roomWidthInPixels) / 2;
        const paddingInY = (sceneHeight - roomHeightInPixels) / 2;
        //We get the room dimensions (of x and y) in cm, 
        const { width, height } = RoomDimensions.getDimensionsBasedOnView(view, roomWidth, roomDepth, roomHeight);
        return {
            width,
            height,
            paddingInX,
            paddingInY,
            roomWidthInPixels,
            roomHeightInPixels
        }
    }

    const getModelOffsetValue = () => {
        let widthPadding = 0, heightPadding = 0;
        switch(modelOffsetDirection) {
            case modelOffsetPositions.center:
                //We keep the defaults (0)
                break;
            case modelOffsetPositions.topLeft:
                widthPadding = modelToEdit.width() / 2;
                heightPadding = modelToEdit.height() / 2;
                break;
            case modelOffsetPositions.topRight:
                widthPadding = -1 * (modelToEdit.width() / 2);
                heightPadding = modelToEdit.height() / 2;
                break;
            case modelOffsetPositions.bottomLeft:
                widthPadding = modelToEdit.width() / 2;
                heightPadding = -1 * (modelToEdit.height() / 2);
                break;
            case modelOffsetPositions.bottomRight:
                widthPadding = -1 * (modelToEdit.width() / 2);
                heightPadding = -1 * (modelToEdit.height() / 2);
                break;
        }

        return {
            modelWidthPadding: widthPadding,
            modelHeightPadding: heightPadding
        }
    }

    const updateOffsetPositionInState = () => {
        const projectScene = project.scene;
        const bidimensionalScene = projectScene['2d'];
        const updatedProject = {
            ...project,
            scene: {
                ...projectScene,
                '2d': {
                    ...bidimensionalScene,
                    offsetPosition: modelOffsetDirection,
                }
            }
        };
        setProject(updatedProject);
    }

    const setUserFriendlyPosition = () => {
        let userFriendlyX = 0;
        let userFriendlyY = 0;
        //Model's padding
        const { modelWidthPadding, modelHeightPadding } = getModelOffsetValue();
        //We get data for the transformation
        const { width, height, paddingInX, paddingInY, roomWidthInPixels, roomHeightInPixels } = getDataForTheTransformation();
        //We get the user friendly coordinates
        userFriendlyX = (localX - paddingInX - modelWidthPadding) * (width / roomWidthInPixels);
        userFriendlyY = (localY - paddingInY - modelHeightPadding) * (height / roomHeightInPixels);
        //We set the user friendly coordinates in state
        setUserFriendlyX(userFriendlyX % 1 === 0 ? userFriendlyX : userFriendlyX.toFixed(2));
        setUserFriendlyY(userFriendlyY % 1 === 0 ? userFriendlyY : userFriendlyY.toFixed(2));
    }


    const handleUserFirendlyXChange = event => {
        //We get data from the event
        const { target: { value } } = event;
        let userFriendlyX = Number(value);
        //Model's padding
        const { modelWidthPadding } = getModelOffsetValue();
        //We get data for the transformation
        const { width, paddingInX, roomWidthInPixels } = getDataForTheTransformation();
        let localX = ((roomWidthInPixels / width) * (userFriendlyX)) + paddingInX + modelWidthPadding;
        setLocalX(localX);
        setEditableX(userFriendlyX);
        handlePositionChange(localX, localY);
    }


    const handleUserFirendlyYChange = event => {
        //We get data from the event
        const { target: { value } } = event;
        let userFriendlyY = Number(value);
        //Model's padding
        const { modelHeightPadding } = getModelOffsetValue();
        //We get data for the transformation
        const { height, paddingInY, roomHeightInPixels } = getDataForTheTransformation();
        let localY = ((roomHeightInPixels / height) * (userFriendlyY)) + paddingInY + modelHeightPadding;
        setLocalY(localY);
        setEditableY(userFriendlyY);
        handlePositionChange(localX, localY);
    }

    if(!modelToEdit || !modelToEdit.attrs)
        return null;

    return (
        <FlexRow
            className = 'align-items-center justify-content-around px-1'
        >
            <OffsetModifier 
                modelOffsetDirection = { modelOffsetDirection }
                setModelOffsetDirection = { setModelOffsetDirection }
            />
            <ActionWithInput 
                type = 'number'
                step = { (stepSize / 10).toString() }
                unit = 'cm'
                value = { editableX || userFriendlyX }
                onChange = { handleUserFirendlyXChange }
                actionText = 'X: '
                className = 'mr-1'
            />
            <ActionWithInput 
                type = 'number'
                step = { (stepSize / 10).toString() }
                unit = 'cm'
                value = { editableY || userFriendlyY }
                onChange = { handleUserFirendlyYChange }
                actionText = 'Y: '
            />
        </FlexRow>
    );
}

let WithProjectState = withProjectState(ModelPosition);
let WithEditorState = withEditorState(WithProjectState);
export default WithEditorState;

const OffsetModifier = ({ modelOffsetDirection, setModelOffsetDirection }) => {
    return(
        <Dropup
            className = 'model-position-offset mr-2'
            togglerText = { <CircularIcon icon = { faCropAlt } />}
        >
            <div id='offset_menu'>
                <OffsetModifierItem 
                    active = { modelOffsetDirection === modelOffsetPositions.center }
                    onClick = { () => setModelOffsetDirection(modelOffsetPositions.center) }
                    offsetLabel = 'Centro del modelo'
                />
                <OffsetModifierItem 
                    active = { modelOffsetDirection === modelOffsetPositions.topLeft }
                    onClick = { () => setModelOffsetDirection(modelOffsetPositions.topLeft) }
                    offsetLabel = 'Esquina superior izquierda'
                />
                <OffsetModifierItem 
                    active = { modelOffsetDirection === modelOffsetPositions.topRight }
                    onClick = { () => setModelOffsetDirection(modelOffsetPositions.topRight) }
                    offsetLabel = 'Esquina superior derecha'
                />
                <OffsetModifierItem 
                    active = { modelOffsetDirection === modelOffsetPositions.bottomLeft }
                    onClick = { () => setModelOffsetDirection(modelOffsetPositions.bottomLeft) }
                    offsetLabel = 'Esquina inferior izquierda'
                />
                <OffsetModifierItem 
                    active = { modelOffsetDirection === modelOffsetPositions.bottomRight }
                    onClick = { () => setModelOffsetDirection(modelOffsetPositions.bottomRight) }
                    offsetLabel = 'Esquina inferior derecha'
                />
            </div>
        </Dropup>
    )
}

const OffsetModifierItem = ({ 
    active,
    onClick, 
    offsetLabel,
}) => (
    <label 
        onClick = { onClick }
        className = { active ?  'model-position-offset--active' : '' }
    >
        { offsetLabel }
    </label>
)