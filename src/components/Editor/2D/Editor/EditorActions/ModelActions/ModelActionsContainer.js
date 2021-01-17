import React, { useEffect, useState } from 'react';
//Components
import ModelActions from './ModelActions';
//HOC
import with2DRendererContextConsumer from '../../../../../Renderer/2D/HOC/with2DRendererContextConsumer';
//Hooks
import useSelectionBox from './hooks/useSelectionBox';
//Classes
import ModelEvents from '../../../../../../classes/2D/Models/ModelEvents';
import BoundsFactory from '../../../../../../classes/2D/Models/BoundsFactory';
import RoomBoundDetector from '../../../../../../classes/2D/Room/RoomBoundDetector';
import BidimensionalModelRotation from '../../../../../../classes/2D/Models/BidimensionalModelRotation';

const ModelActionsContainer = ({ 
    rendererState: {
        modelToEdit,
        sceneInstance,
        setModelToEdit,
        updateModelPosition,
        handleModelDeletion,
        handleModelRotation,
    }
}) => {
    //HOOKS
    //State
    const [stepSize, setStepSize] = useState(5); //5px default
    //useSelectionBox (custom)
    const correctSelectionBox = useSelectionBox(modelToEdit, sceneInstance);


    useEffect(() => {
        if(modelToEdit)
            window.onkeydown = handleKeyDown;
        else { 
            window.onkeydown = null;
            correctSelectionBox();
        }
    }, [modelToEdit, stepSize])

    //Effects
    useEffect(() => {
        if(!sceneInstance || !setModelToEdit)
            return;
        //We add the event listener for the click on the plane (this will set the modelToEdit to null to stop focusing it)
        if(!(ModelEvents.CLICK_EVENT in sceneInstance.planeLayer.eventListeners))
            ModelEvents.addClickListener(sceneInstance.planeLayer, event => {
                setModelToEdit(null)
            });
    }, [
        sceneInstance,
        setModelToEdit
    ]);

    //Functions

    const rotateModel = (degrees, overrideValue = false) => {
        if(!modelToEdit)
            return;
        handleModelRotation(modelToEdit, degrees, overrideValue);
        correctSelectionBox();
    }

    const deleteModel = () => {
        if(!modelToEdit)
            return;
        handleModelDeletion(modelToEdit);
        setModelToEdit(null);
    }

    const moveTo = (x, y) => {
        modelToEdit.x(x);
        modelToEdit.y(y);
        correctSelectionBox();
    }

    const getValidatedRoomBoundCoordinates = (x, y) => {
        let { modelWidth, modelHeight } = BidimensionalModelRotation.getWidthAndHeightBasedOnRotation(modelToEdit);
        //We apply the room bound detection
        let { x: roomBoundX, y: roomBoundY } = RoomBoundDetector.boundDetection(sceneInstance, modelWidth, modelHeight, { x, y });
        return {
            roomBoundX,
            roomBoundY
        }
    }

    const moveModel = (x, y) => { 
        const { roomBoundX, roomBoundY } = getValidatedRoomBoundCoordinates(x, y);
        moveTo(roomBoundX, roomBoundY);
        //We update the position in state
        updateModelPosition(modelToEdit._id, roomBoundX, roomBoundY);
        //We update the model bounds
        let boundFactory = new BoundsFactory(modelToEdit, sceneInstance);
        boundFactory.create();
        //We make the correction in the selection box position
        correctSelectionBox();
    }


    const handleKeyDown = event => {
        const { keyCode } = event;
        //Model properties
        let modelX = modelToEdit.attrs.x;
        let modelY = modelToEdit.attrs.y;
        
        //Initial coordinates
        let x = modelX, y = modelY;
        switch(keyCode) {
            //LEFT
            case 37:
                x -= stepSize;
                break;
            //UP
            case 38:
                y -= stepSize;
                break;
            //RIGHT
            case 39:
                x += stepSize;
                break;
            //DOWN
            case 40:
                y += stepSize;
                break;
        }
        moveModel(x, y);
    }


    const handlePositionChange = (x, y) => {
        moveModel(x, y);
    }

    return <ModelActions 
        stepSize = { stepSize }
        setStepSize = { setStepSize }
        modelToEdit = { modelToEdit }
        rotateModel = { rotateModel }
        deleteModel = { deleteModel }
        sceneInstance = { sceneInstance }
        correctSelectionBox = { correctSelectionBox }
        handlePositionChange = { handlePositionChange }
    />
}

//We apply the 2d renderer context HOC
let With2DRendererContextConsumer = with2DRendererContextConsumer(ModelActionsContainer);

export default With2DRendererContextConsumer;