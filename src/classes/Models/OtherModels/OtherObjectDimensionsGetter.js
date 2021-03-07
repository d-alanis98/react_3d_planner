//Derpendencies
import store from '../../../redux/store';
import RotationHelper from '../../Helpers/RotationHelper';
//Constants
import { TOP, FRONT, FRONT_RIGHT } from '../../../constants/models/models';

/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 */
export default class OtherObjectDimensionsGetter {

    static parseToMeters = stringDimensionInMilimeters => Number(stringDimensionInMilimeters) / 1000;

    static getDimensionsById = modelId => {
        const {
            parseToMeters
        } = OtherObjectDimensionsGetter;
        //We get the getState function from the redux store
        let { getState } = store;
        //We get the misc objects from the state
        let { otherObjects } = { ...getState().family };
        //We find the model
        let model = otherObjects.find(model => model.id_extra === Number(modelId));
        if(!model)
            return;

        //Finally, we get the product´s dimensions and parse them to number (and to meters)
        return {
            width: parseToMeters(model.width || 500),
            height: parseToMeters(model.height || 500),
            depth: parseToMeters(model.depth || 500),
        };
    }

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
    static getDimensionsBasedOnViewAndRotation = (editorView, rotation, modelId) => {
        let productDimensions = OtherObjectDimensionsGetter.getDimensionsById(modelId);
        //We initialize the width and height with the default values
        let { width, height } = productDimensions;
        //We are now going to modify these parameters based on the current view
        switch(editorView) {
            case TOP:
                height = productDimensions.depth;
                break;
            case FRONT:
                height = productDimensions.height;
                //In the specific case of the front view, we check if there is an even number of turns (n / 90 % 2 != 0), in hthat case, we swap the dimensions to "rotate it"
                if(rotation && !RotationHelper.isNumberOfTurnsOdd(rotation)){
                    height = productDimensions.height;
                    width = productDimensions.depth;
                }
                break;
            case FRONT_RIGHT:
                width = productDimensions.depth; //X is now model's Z
                height = productDimensions.height; //Y is model's Y
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