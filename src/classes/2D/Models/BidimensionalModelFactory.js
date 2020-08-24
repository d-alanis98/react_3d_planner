//Dependencies
import Konva from 'konva';
import ModelEvents from './ModelEvents';
import RoomBoundDetector from '../Room/RoomBoundDetector';
import BidimensionalModelDimensions from './BidimensionalModelDimensions';
//Constants and functions
import { TOP, getModel2DUri, getDimensions } from '../../../constants/models/models';


/**
 * @author Damián Alanís Ramírez
 * @version 2.1.3
 */

export default class BidimensionalModelFactory {
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
    static createModel = attributes => {
        //Arguments destructuring
        let {
            x,
            y,
            type,
            scene,
            onUpdate,
            onSuccess, 
            onSelection,
        } = attributes;
        //We load the path from catalog based on the model type
        let path = getModel2DUri(type, TOP); //We get the TOP view
        //We get the dimensions of the object (assuming in a 2D top view the "height" is the depth)
        let { width: modelWidth, depth: modelHeight } = getDimensions(type);
        //We get the scaled dimensions, making use of the class BidimensionalModelDimensions, which calculates the pixel size of the model based on the ratio (screen dimensions / room dimensions)
        let { width, height } = BidimensionalModelDimensions.calculate(scene, modelWidth, modelHeight);
        Konva.Image.fromURL(path, imageNode => {
            let { containerWidth, containerHeight } = scene;
            imageNode.setAttrs({
                //If no coordinates were given we place the objects in the middle of the plane
                x: x || containerWidth / 2,
                y: y || containerHeight / 2,
                type,
                width,
                height,
                //We set the center of the element
                offsetX: width / 2,
                offsetY: height / 2,
                //We enable the drag and drop interaction for this element
                draggable: 'true',
                //The function that defines the bound for dragging
                dragBoundFunc: position => RoomBoundDetector.boundDetection(scene, width, height, position)
            });
            //We add the models event listeners (drag -> onUpdate, right click -> onSelection)
            ModelEvents.addModelBasicEventListeners(imageNode, onUpdate, onSelection);
            //We add the object to the layer
            scene.layer.add(imageNode);

            //If given, we execute the success callback passing the created object as argument
            if(onSuccess && typeof(onSuccess) === 'function')
                onSuccess(imageNode);
                
            //We update the layer
            scene.layer.batchDraw();
        });
    }
}