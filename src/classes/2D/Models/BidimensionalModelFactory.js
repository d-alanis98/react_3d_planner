//Dependencies
import Konva from 'konva';
//Classes
import ModelEvents from './ModelEvents';
import RoomBoundDetector from '../Room/RoomBoundDetector';
import BidimensionalModelRotation from './BidimensionalModelRotation';
import BidimensionalModelDimensions from './BidimensionalModelDimensions';
//Constants and functions
import { TOP, getModel2DUri } from '../../../constants/models/models';
import BidimensionalModelScale from './BidimensionalModelScale';


/**
 * @author Damián Alanís Ramírez
 * @version 3.4.2
 */

export default class BidimensionalModelFactory {
    //Constants
    static MINIMUM_TEXT_SIZE    = 10;
    static DEFAULT_TEXT_COLOR   = 'rgba(0,0,0,0.65)';
    static DEFAULT_TEXT_PADDING = 2;
    /**
     * Factory method, we create the model via the method fromUrl from Konva.Image, we provide this method the 
     * width and height - calculated with the class BidimensionalModelDimensions which get the pixel dimensions
     * based on the ratio pixel dimensions / real dimensions (in 'meters') of the room.
     * @param {object} scene 
     * @param {string} type 
     * @param {function} onSuccess 
     * @param {function} onUpdate 
     * @param {function} onSelection 
     * @param {object} attributes
     */
    static createModel = ({
        x,
        y,
        type,
        scene,
        scale = { },
        rotation,
        modelName,
        productKey,
        editorView,
        onUpdate,
        onSuccess, 
        onSelection,
        onDragStart,
        productLine,
        onModelClick,
    }) => {
        //We load the path from catalog based on the model type
        let path = getModel2DUri(type, TOP); //We get the TOP view
        //We get the dimensions of the object based on the current view and rotation
        let { width: modelWidth, height: modelHeight } = BidimensionalModelDimensions.getDimensionsBasedOnViewAndRotation(editorView, rotation, productLine, type);
        //We get the scaled dimensions, making use of the class BidimensionalModelDimensions, which calculates the pixel size of the model based on the ratio (screen dimensions / room dimensions)
        let { width, height } = BidimensionalModelDimensions.calculate(scene, modelWidth, modelHeight);
        
        Konva.Image.fromURL(path, imageNode => {
            let { containerWidth, containerHeight } = scene;
            //We create a new group to contain the model and the label
            let { widthScale, heightScale } = BidimensionalModelScale.getScaleToApplyBasedOnViewAndRotation(scale, editorView, rotation);
            //We save the "original" dimensions
            let originalWidth = width;
            let originalHeight = height;
            //We set the new width and height based on the scale factor
            width *= widthScale;
            height *= heightScale;
            //We create the group
            let group = new Konva.Group({
                x: x || containerWidth / 2,
                y: y || containerHeight / 2,
                name: modelName,
                type,
                width,
                height,
                visible: true,
                originalWidth,
                originalHeight,
                previousScaleX: widthScale,
                previousScaleY: heightScale,
                //We set the center of the element
                offsetX: width / 2,
                offsetY: height / 2,
                //We enable the drag and drop interaction for this element
                draggable: true,
                //The function that defines the bound for dragging
                dragBoundFunc: position => RoomBoundDetector.boundDetection(scene, width, height, position), 
            });

            //We add the group's event listeners (drag -> onUpdate, right click -> onSelection, click -> onModelClick)
            ModelEvents.addModelBasicEventListeners(group, onUpdate, onSelection, onDragStart);
            ModelEvents.addClickListener(group, onModelClick);
            
            //We set the image width and height (100% of the group 'container')
            imageNode.setAttrs({
                width,
                height,   
            });
            
            //We add the image to the group
            group.add(imageNode);

            //We add the text (with the model's name) to the group, at last, in order to get it at the front layer
            group.add(new Konva.Text({
                text: `${modelName} \n${productKey}`,
                fill: BidimensionalModelFactory.DEFAULT_TEXT_COLOR,
                width,
                height,
                padding: BidimensionalModelFactory.DEFAULT_TEXT_PADDING,
                fontSize: BidimensionalModelFactory.getTextSizeBasedOnWidth(width, modelName),
                fontFamily: 'Calibri',
                align: 'center',
                verticalAlign: 'middle',
            }))
            //We add the object to the layer
            scene.layer.add(group);
            //If rotation is not null (or 0) we rotate the model and update the drag bound function
            if(rotation && editorView === TOP){
                BidimensionalModelRotation.rotate(group, rotation, scene);
            }

            //If given, we execute the success callback passing the created object as argument
            if(onSuccess && typeof(onSuccess) === 'function')
                onSuccess(group);
                
            //We update the layer
            scene.layer.batchDraw();
        });
    }

    static getTextSizeBasedOnWidth = (width, modelName) => {
        const { MINIMUM_TEXT_SIZE, DEFAULT_TEXT_PADDING } = BidimensionalModelFactory;
        let modelNameLength = modelName.length;
        let textSize = Math.floor((width - 2.5 * DEFAULT_TEXT_PADDING) / modelNameLength);
        return textSize >= MINIMUM_TEXT_SIZE ? textSize : MINIMUM_TEXT_SIZE;
    }

    static getUpdatedDragBoundFunc = (model, sceneInstance) => {
        let { modelWidth, modelHeight } = BidimensionalModelRotation.getWidthAndHeightBasedOnRotation(model);
        return position => RoomBoundDetector.boundDetection(sceneInstance, modelWidth, modelHeight, position);
    }

    static setUpdatedDragBoundFunc = (model, sceneInstance) => {
        model.dragBoundFunc(BidimensionalModelFactory.getUpdatedDragBoundFunc(model, sceneInstance));
    }
}