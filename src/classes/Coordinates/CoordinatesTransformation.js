//Dependencies
import BidimensionalRenderer from '../Renderers/BidimensionalRenderer';
import TridimensionalRenderer from '../Renderers/TridimensionalRenderer';

/**
 * @author Damián Alanís Ramírez
 * @version 3.2.4
 * @description Facade for coordinates transformation, it provides methods to pass from 2D to 3D coordinates and vice versa.
 * This way we keep a consistent state between both editors and we can calculate the coordinates that will be applied to a modified 
 * object in a certain editor to the other.
 */
export default class CoordinatesTransformation {
    //CONSTRUCTOR
    constructor(scene, x, y, z){
        //Scene
        this.scene = scene;
        this.bidimensionalScene = scene[BidimensionalRenderer.BIDIMENSIONAL_SCENE];
        this.tridimensionalScene = scene[TridimensionalRenderer.TRIDIMENSIONAL_SCENE];
        //We set the aditional parameters (scene dimensions)
        this.setParametersFromScene();
        //Coordinates
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * This method sets the dimensions of the scenes (bidimensional and tridimensional).
     */
    setParametersFromScene = () => {
        //We apply object destructuring to obteain the required scene dimensions
        let { 
            roomWidth: bidimensionalRoomWidth,
            roomHeight: bidimensionalRoomHeight,
            sceneWidth: bidimensionalSceneWidth, 
            sceneHeight: bidimensionalSceneHeight,
        } = { ...this.bidimensionalScene };
        let { 
            sceneWidth: tridimensionalSceneWidth, 
            sceneHeight: tridimensionalSceneHeight 
        } = { ...this.tridimensionalScene };
        //We set the obtained dimensions in the current instance state
        this.bidimensionalRoomWidth = bidimensionalRoomWidth;
        this.bidimensionalRoomHeight = bidimensionalRoomHeight;
        this.bidimensionalSceneWidth = bidimensionalSceneWidth;
        this.bidimensionalSceneHeight = bidimensionalSceneHeight;
        this.tridimensionalSceneWidth = tridimensionalSceneWidth;
        this.tridimensionalSceneHeight = tridimensionalSceneHeight;
    }

    /**
     * 2D to 3D
     * 3Dx = -1 * offsetInX * widthRatio
     * 3Dz = -1 * offsetInY * heightRatio
     * Where:
     * - offset: the distance from the 2D plane center in x (PCx - 2Dx) or y (PCy - 2Dy), (PCx = 2DSceneWidth / 2, PCy = 2DSceneHeight / 2)
     * - ratio: the ratio between the dimensions of both scenes, width (3DSceneWidth / 2DRoomWidth) and height 
     * (3DSceneHeight / 2DRoomHeight). This ratio needs to be calculated, since 3D dimensions are the same as the specified
     * dimensions of the editor (because three.js does not deppend on screen dimensions), and the 2D room is fixed to that 
     * ratio, but it´s dimension is measured in pixels, so we need to get the equivalence from pixels to the editor dimensions
     * that represent 'meters'.
     * Therefore:
     * 3Dx = -1 * (PCx - 2Dx) * (3DSceneWidth / 2DRoomWidth)
     * 3Dz = -1 * (PCy - 2Dy) * (3DSceneHeight / 2DRoomHeight)
     * 
     * @note 2DSceneWidth and 2DRoomWidth are two different things, the 2DSceneWidth measures the size in pixels of the 
     * DOM container of the 2D editor, while 2DRoomWidth measures the actual width occupied by the usable area of the editor,
     * i.e the room (that represents the kitchen or closet), which keeps the real dimensions scale, so there could be empty 
     * spaces on the sides. The same applies for 2DSceneHeight and 2DRoomWidth.
     */
    

    /**
     * This method calculates the coordinates regarding the origin of the bidimensional plane (the center).
     */
    originBidimensionalPlaneCoordinates = () => {
        //We obtain the required variable from the current instance in a local scope
        let { 
            x, 
            y, 
            bidimensionalSceneWidth, 
            bidimensionalSceneHeight,
        } = this;

        //We get the plane centroid
        let planeCenterX = bidimensionalSceneWidth / 2;
        let planeCenterY = bidimensionalSceneHeight / 2;

        return {
            x: planeCenterX - x,
            y: planeCenterY - y,
        };
    }

    /**
    * This method transforms the 2D coordinates to the corresponding 3D ones, to get the object placed in the same
    * way between both scenes.
     */
    bidimensionalToTridimensionalCoordinates = () => {
        //We obtain the required variable from the current instance in a local scope
        let { 
            bidimensionalRoomWidth, 
            bidimensionalRoomHeight, 
            tridimensionalSceneWidth, 
            tridimensionalSceneHeight ,
            originBidimensionalPlaneCoordinates
        } = this;
        //We get the coordinates from the origin of the bidimensional plane (centroid)
        let { x: originX, y: originY } = originBidimensionalPlaneCoordinates();
        //We get the ratio between the two scenes dimensions (being in the bidimensional scene, the width and height of the room, which may not be the whole screen)
        let xRatio = tridimensionalSceneWidth / bidimensionalRoomWidth;
        let yRatio = tridimensionalSceneHeight / bidimensionalRoomHeight;
        return {
            x:  -1 * originX * xRatio,
            y: 0,
            z: -1 * originY * yRatio
        }
    }

    /**
     * 3D to 2D
     * Solving the equation to get 3D coordinates from 2D ones, we get that the inverse operation can be done with the 
     * following equation:
     * 2Dx = [3Dx * (2DRoomWidth / 3DSceneWidth)] + PCx
     * 2Dy = [3Dz * (2DRoomHeight / 3DSceneHeight)] + PCy
     * Where:
     * -PCx and PCy are still the 2D plane center coordinates (PCx = 2DSceneWidth / 2, PCy = 2DSceneHeight / 2)
     */

    /**
     * This method calculates the coordinates regarding the origin of the bidimensional plane (the center), but in the opposite 
     * way that it is done in 2D to 3D i.e it adds the x coordinate to the origin.
     * @param {number} x 
     * @param {number} y 
     */
    originTridimensionalPlaneCoordinates = (x, y) => {
        //We obtain the required variable from the current instance in a local scope
        let { 
            bidimensionalSceneWidth, 
            bidimensionalSceneHeight,
        } = this;

        //We get the plane centroid
        let planeCenterX = bidimensionalSceneWidth / 2;
        let planeCenterY = bidimensionalSceneHeight / 2;

        return {
            x: planeCenterX + x,
            y: planeCenterY + y,
        };
    }

    /**
    * This method transforms the 3D coordinates to the corresponding 2D ones, to get the object placed in the same
    * way between both scenes.
     */
    tridimensionalToBidimensionalCoordinates = () => {
        let { 
            x,
            y,
            z,
            bidimensionalRoomWidth,
            bidimensionalRoomHeight,
            tridimensionalSceneWidth,
            tridimensionalSceneHeight,
            originTridimensionalPlaneCoordinates
        } = this;
        //We get the ratio between the two scenes dimensions
        let xRatio = bidimensionalRoomWidth / tridimensionalSceneWidth;
        let yRatio = bidimensionalRoomHeight / tridimensionalSceneHeight;
        //Remembering that z (depth) in 3D editor is y in 2D editor (TOP_VIEW), and that they are inverted
        return originTridimensionalPlaneCoordinates(x * xRatio, z * yRatio);
    }
}