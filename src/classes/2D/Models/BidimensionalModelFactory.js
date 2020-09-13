//Dependencies
import Konva from 'konva';
//Classes
import ModelEvents from './ModelEvents';
import RoomBoundDetector from '../Room/RoomBoundDetector';
import CollisionDetector from './CollisionDetector';
import BidimensionalModelRotation from './BidimensionalModelRotation';
import BidimensionalModelDimensions from './BidimensionalModelDimensions';
//Constants and functions
import { TOP, getModel2DUri } from '../../../constants/models/models';


/**
 * @author Damián Alanís Ramírez
 * @version 3.4.2
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
            rotation,
            editorView,
            onUpdate,
            onSuccess, 
            onSelection,
            productLine
        } = attributes;
        //We load the path from catalog based on the model type
        let path = getModel2DUri(type, TOP); //We get the TOP view
        //We get the dimensions of the object based on the current view and rotation
        let { width: modelWidth, height: modelHeight } = BidimensionalModelDimensions.getDimensionsBasedOnViewAndRotation(editorView, rotation, productLine, type);
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
                dragBoundFunc: position => RoomBoundDetector.boundDetection(scene, width, height, position),    
            });
            //We add the models event listeners (drag -> onUpdate, right click -> onSelection)
            ModelEvents.addModelBasicEventListeners(imageNode, onUpdate, onSelection);
            //We add the object to the layer
            scene.layer.add(imageNode);
            //If rotation is not null (or 0) we rotate the model and update the drag bound function
            if(rotation)
                BidimensionalModelRotation.rotate(imageNode, rotation, scene);

            //If given, we execute the success callback passing the created object as argument
            if(onSuccess && typeof(onSuccess) === 'function')
                onSuccess(imageNode);
                
            //We update the layer
            scene.layer.batchDraw();
        });
    }
}