/**
 * @author Damián Alanís Ramírez
 * @version 1.3.3
 * @description This class provides a facade for the calculation of the optimal coordinates for the room. 
 * Which are calculated using the relation within the roomWidth -> containerWidth and roomHeight -> containerHeight, 
 * in order to get the maximum portion of the container occupied with the minimum scalation, and without losing the
 * original aspect ratio.
 */

export default class RoomCoordinatesCalculator {
    //CONSTANTS
    static PLANE_PADDING  = 20;

    //CONSTRUCTOR
    constructor(roomWidth, roomHeight, containerWidth, containerHeight ) {
        //Dimensions
        this.roomWidth = roomWidth;
        this.roomHeight = roomHeight;
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
        //Scale 
        this.scale = 1;
    }

    //GETTERS AND SETTERS

    /**
     * Setter for the scale.
     * @param {number} scale 
     */
    setScale(scale){
        this.scale = scale;
    }

    /**
     * Getter for the scale.
     */
    getScale(){
        return this.scale;
    }

    /**
     * Sets the width and height of the room in pixels based on the received coordinates.
     * @param {number} initialX 
     * @param {number} finalX 
     * @param {number} initialY 
     * @param {number} finalY 
     */
    setRoomDimensionsInPixels(initialX, finalX, initialY, finalY){
        this.widthInPixels = finalX - initialX;
        this.heightInPixels = finalY - initialY;
    }

    /**
     * Getter for the width and height of the room in pixels.
     */
    getRoomDimensionsInPixels(){
        return {
            width: this.widthInPixels,
            height: this.heightInPixels
        }
    }

    /**
     * This method determines the optimal coordinates to get most of the container dimensions used, applying the minimun
     * scale needed to fit the whole room in the container, and centering it.
     */
    calculate() {
        //We get data from the current instance
        let { roomWidth, roomHeight, containerWidth, containerHeight } = this;
        let { PLANE_PADDING } = RoomCoordinatesCalculator;
        //We initialize the starting points to be the origin plus the half of PLANE_PADDING (10px)
        let initialX = PLANE_PADDING / 2;
        //And the finish points to be the whole width minus the half of PLANE_PADDING (10 px), we make this to use >= 95% of screen width or height
        let finalX = containerWidth - (PLANE_PADDING / 2);
        //We make the same for the initial and final points in Y axis
        let initialY = PLANE_PADDING / 2;
        let finalY = containerHeight - (PLANE_PADDING / 2);
        //The next step is to get the equivalence within the real room dimensions (in meters) and the container dimensions.
        //Starting with the width, the whole container width (minus the padding) represents the roomWidth accordingly
        let roomToContainerWidthRatio = (containerWidth - PLANE_PADDING) / roomWidth;
        //With that relation, we can get the container height that is needed to fulfill the equivalence
        let requiredClientHeight = (roomHeight * roomToContainerWidthRatio) + PLANE_PADDING;
        //In a similar way, we can apply the same approach with the height
        let roomToContainerHeightRatio = (containerHeight - PLANE_PADDING) / roomHeight;
        //So, in this case, we can get the needed container width to fulfill the equivalence based on the height ratio 
        let requiredClientWidth = (roomWidth * roomToContainerHeightRatio) + PLANE_PADDING;
        //VALIDATIONS
        //Based on the required client height obtained previously, we verify that the actual DOM container satisfies the requirement
        //If that´s not the case (the DOM container height is smaller than the needed one) we scale the width in order to fit all the plane in the container
        if(containerHeight < requiredClientHeight) {
            //This scale will be the number of times that the required container height exceeds the actual height
            let scale = requiredClientHeight / containerHeight;
            this.setScale(scale);
            //We apply this scale only to the final point in X (to keep the padding before starting point unaltered)
            finalX /= scale;
            //We get the width in pixels
            let width = finalX - initialX; 
            //The following part is to center the room in the plane (horizontal alignment)
            let difference = containerWidth - width;
            initialX = (difference / 2);
            finalX = initialX + width;
        }
        //We do the same for the width (because there may be cases where the room width will exceed considerably the height)
        //If the DOM container width is smaller than the needed one, we scale the width in order to fit all the plane in the container
        if(containerWidth < requiredClientWidth) {
            //This scale will be the number of times that the required container width exceeds the actual width
            let scale = requiredClientWidth / containerWidth;
            this.setScale(scale);
            //We apply this scale only to the final point in Y (to keep the padding before starting point unaltered)
            finalY /= scale;
            //We get the height in pixels
            let height = finalY - initialY;
            //The following part is to center the room in the plane (vertical alignment)
            let difference = containerHeight - height;
            initialY = (difference / 2);
            finalY = initialY + height;
        }
        //We set the dimensions in pixels internally, to be able to get this value later with the current instance
        this.setRoomDimensionsInPixels(initialX, finalX, initialY, finalY);
        //We return the optimal coordinates
        return {
            initialX,
            finalX,
            initialY,
            finalY
        }
    }
}