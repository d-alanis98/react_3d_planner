import React, { useEffect, useState } from 'react';
//Components
import FlexRow from '../../../../../../../Layout/Flex/FlexRow';
import ActionWithInput from '../ActionWithInput/ActionWithInput';
//HOC
import withEditorState from '../../../../../../../../redux/HOC/withEditorState';
import withProjectState from '../../../../../../../../redux/HOC/withProjectState';
//Classes
import BidimensionalRenderer from '../../../../../../../../classes/Renderers/BidimensionalRenderer';
import RoomDimensions from '../../../../../../../../classes/2D/Room/RoomDimensions';

const ModelPosition = ({ 
    project, 
    stepSize,
    editorState, 
    modelToEdit, 
    handlePositionChange
}) => {
    const [localX, setLocalX] = useState();
    const [localY, setLocalY] = useState();
    const [userFriendlyX, setUserFriendlyX] = useState(0);
    const [userFriendlyY, setUserFriendlyY] = useState(0);
    const [editableX, setEditableX] = useState(0);
    const [editableY, setEditableY] = useState(0)

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

    const setUserFriendlyPosition = () => {
        let userFriendlyX = 0;
        let userFriendlyY = 0;
        //We get data for the transformation
        const { width, height, paddingInX, paddingInY, roomWidthInPixels, roomHeightInPixels } = getDataForTheTransformation();
        //We get the user friendly coordinates
        userFriendlyX = (localX - paddingInX) * (width / roomWidthInPixels);
        userFriendlyY = (localY - paddingInY) * (height / roomHeightInPixels);
        //We set the user friendly coordinates in state
        setUserFriendlyX(userFriendlyX % 1 === 0 ? userFriendlyX : userFriendlyX.toFixed(2));
        setUserFriendlyY(userFriendlyY % 1 === 0 ? userFriendlyY : userFriendlyY.toFixed(2));
    }


    const handleUserFirendlyXChange = event => {
        //We get data from the event
        const { target: { value } } = event;
        let userFriendlyX = Number(value);
        //We get data for the transformation
        const { width, paddingInX, roomWidthInPixels } = getDataForTheTransformation();
        let localX = ((roomWidthInPixels / width) * (userFriendlyX)) + paddingInX;
        setLocalX(localX);
        setEditableX(userFriendlyX);
        handlePositionChange(localX, localY);
    }


    const handleUserFirendlyYChange = event => {
        //We get data from the event
        const { target: { value } } = event;
        let userFriendlyY = Number(value);
        //We get data for the transformation
        const { height, paddingInY, roomHeightInPixels } = getDataForTheTransformation();
        let localY = ((roomHeightInPixels / height) * (userFriendlyY)) + paddingInY;
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