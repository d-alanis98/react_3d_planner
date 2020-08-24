/**
 * @author Damián ALnaís Ramírez
 * @version 1.2.3
 */

export default class ModelScaleCalculator {
    constructor(model, modelWidth, modelHeight, modelDepth) {
        this.model = model;
        this.modelWidth = modelWidth;
        this.modelHeight = modelHeight;
        this.modelDepth = modelDepth;
        this.setAttributesFromModel();
    }

    /**
     * We set the points of the bounding box
     */
    setAttributesFromModel = () => {
        let {
            geometry: { 
                boundingBox: { 
                    max: maximumBoundingBoxPoint, 
                    min: minimumBoundingBoxPoint 
                } 
            },
        } = this.model;
        //Maximum points
        let {
            x: maximumPointInX,
            y: maximumPointInY,
            z: maximumPointInZ,
        } = maximumBoundingBoxPoint;
        //Minimum points
        let {
            x: minimumPointInX, 
            y: minimumPointInY,
            z: minimumPointInZ,
        } = minimumBoundingBoxPoint;
        //We set the properties
        //Maximum points
        this.maximumPointInX = maximumPointInX;
        this.maximumPointInY = maximumPointInY;
        this.maximumPointInZ = maximumPointInZ;
        //Minimum points
        this.minimumPointInX = minimumPointInX;
        this.minimumPointInY = minimumPointInY;
        this.minimumPointInZ = minimumPointInZ;
    }

    /**
     * We calculate the proper scale to be accurate between the real life dimensions of the models and the ones in the
     * 3D scene.
     */
    calculateScale = () => {
        //We get instance member variables in the local scope
        let {
            modelWidth,
            modelDepth,
            modelHeight,
            maximumPointInX,
            maximumPointInY,
            maximumPointInZ,
            minimumPointInX,
            minimumPointInY,
            minimumPointInZ
        } = this;
        //We calculate the bounding box dimensions
        let objectBoundingBoxWidth = maximumPointInX - minimumPointInX;
        let objectBoundingBoxHeight = maximumPointInY - minimumPointInY;
        let objectBoundingBoxDepth = maximumPointInZ - minimumPointInZ;
        //And the scale will be the relation between the actual dimensions (from the catalog) and the bounding box dimensions
        return {
            x: modelWidth / objectBoundingBoxWidth,
            y: modelHeight / objectBoundingBoxHeight,
            z: modelDepth / objectBoundingBoxDepth
        };
    }
}