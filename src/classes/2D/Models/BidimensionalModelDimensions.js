/**
 * @author Damián Alanís Ramírez
 * @version 1.0.0
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
}