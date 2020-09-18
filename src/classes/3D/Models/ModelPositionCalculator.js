/**
 * @author Damián Alanís Ramírez
 * @version 2.0.3
 * This class packs 2 methods to calculate the max position in the Y and Z axis, respectively, this is used as a decision 
 * parameter for the layer manager, which helps the 2d renderer to give a real view of the models in the chosen perspective.
 */
export default class ModelPositionCalculator {
    /**
     * This method returns the maximum point in the Y axis for the given model.
     * @param {string} model 
     */
    static getMaximumPointInY = model => {
        const { 
            scale: { y: scaleInY },
            geometry: { boundingBox: { max: { y: maxPointInY }, min: { y: minPointInY } } } ,
            position: { y }
        } = model;
        let height = (maxPointInY - minPointInY) * scaleInY;
        let heightPadding = height / 2;
        let maxPointInYAxis = y + heightPadding;
        return maxPointInYAxis;
    }

    /**
     * This method returns the maximum point in the Z axis for the given model.
     * @param {string} model 
     */
    static getMaximumPointInZ = model => {
        const { 
            position: { z }
        } = model;
        let height = this.getHeightBasedOnModelRotation(model);
        let heightPadding = height / 2;
        let maxPointInZAxis = z + heightPadding;
        return maxPointInZAxis;
    }

    /**
     * Return the models height based on model rotation, that is necessary because the bounding box does not rotate
     * acoordingly to the model
     * @param {object} model 
     */
    static getHeightBasedOnModelRotation = model => {
        const { 
            scale: { z: scaleInZ, x: scaleInX },
            geometry: { boundingBox: { max: { z: maxPointInZ, x: maxPointInX }, min: { z: minPointInZ, x: minPointInX } } } ,
        } = model;
        let height;
        const rotationInDegrees = model.rotation.y * 180 / Math.PI;
        if((rotationInDegrees / 90) % 2 === 0)
            height = (maxPointInZ - minPointInZ) * scaleInZ;
        else
            height = (maxPointInX - minPointInX) * scaleInX;
        return height;
    }
}