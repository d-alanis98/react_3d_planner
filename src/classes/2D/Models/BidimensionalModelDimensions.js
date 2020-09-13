//Dependencies
import { TOP, FRONT } from '../../../constants/models/models';
import DimensionsGetter from '../../Models/DimensionsGetter';
import RotationHelper from '../../Helpers/RotationHelper';

/**
 * @author Damián Alanís Ramírez
 * @version 3.3.1
 */
export default class BidimensionalModelDimensions {
    /**
     * This method calculates the width and height of the object (in pixels) to fit the requirements (ratio between the 
     * room size in pixels and the actual room size - in 'meters')
     * @param {object} scene 
     * @param {number} modelWidth 
     * @param {number} modelHeight 
     */
    static calculate = (scene, modelWidth, modelHeight) => {
        let { 
            roomWidth, 
            roomHeight, 
            roomDimensionInPixels: { width: roomWidthInPixels, height: roomHeightInPixels } 
        } = scene;
        let width = (modelWidth * roomWidthInPixels) / roomWidth;
        let height = (modelHeight * roomHeightInPixels) / roomHeight;
        return {
            width,
            height
        }
    }

    /**
     * 
     * @param {string} editorView 
     * @param {string|number} productLine 
     * @param {string|number} productId 
     */
    static getDimensionsBasedOnViewAndRotation = (editorView, rotation, productLine, productId) => {
        let productDimensions = DimensionsGetter.getDimensions(productLine, productId);
        //We initialize the width and height with the default values
        let width = productDimensions.width;
        let height = productDimensions.depth;
        //We are now going to modify these parameters based on the current view
        switch(editorView) {
            case TOP:
                height = productDimensions.depth;
                break;
            case FRONT:
                height = productDimensions.height;
                //In the specific case of the front view, we check if there is an even number of turns (n / 90 % 2 != 0), in hthat case, we swap the dimensions to "rotate it"
                if(rotation && !RotationHelper.isNumberOfTurnsOdd(rotation)){
                    height = productDimensions.depth;
                    width = productDimensions.height;
                }
                break;
            default:
                height = productDimensions.depth;
                break;
        }
        return {
            width,
            height
        }
    }
}