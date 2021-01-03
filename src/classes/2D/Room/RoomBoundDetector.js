/**
 * @author Damián Alanís Ramírez
 * @version 1.0.0
 */

export default class RoomBoundDetector {
    /**
     * Bound detector function, takes the current bidimensional instance (scene), the object width and height and the
     * current position. With this data, this function validates that the object cannot overflow from the room, and provides
     * the perfect moment to detect collitions and other utilities like snapping (being the snapping to the border something 
     * that is made automatically if the object has overflowed from the room).
     * @param {object} scene 
     * @param {number} width 
     * @param {number} height 
     * @param {object} position 
     */
    static boundDetection = (scene, width, height, position) => {
        let {
            containerWidth, 
            containerHeight,
            roomDimensionInPixels: { width: roomWidth, height: roomHeight },
        } = scene;
        //We get the padding (because the room is centered in the plane)
        let widthPadding = (containerWidth - roomWidth) / 2;
        let heightPadding = (containerHeight - roomHeight) / 2;
        //We get the object centroid
        let objectWidthOffset = width / 2;
        let objectHeightOffset = height / 2;
        //X axis constraints
        let x = (position.x - objectWidthOffset <= widthPadding)
            ? widthPadding + objectWidthOffset 
            : position.x + objectWidthOffset >= roomWidth + widthPadding  
                ? roomWidth - objectWidthOffset + widthPadding 
                : position.x;
        //Y axis constraints
        let y = (position.y - objectHeightOffset <= heightPadding) 
            ? heightPadding + objectHeightOffset 
            : position.y + objectHeightOffset  >= roomHeight + heightPadding 
                ? roomHeight - objectHeightOffset + heightPadding 
                : position.y;

        return { x, y }
    }
}