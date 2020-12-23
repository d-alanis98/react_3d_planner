/**
 * @author Damián Alanís Ramírez
 * @version 4.2.1
 */

import RotationHelper from "../../Helpers/RotationHelper";

export default class CollisionDetector {
    static EPSILON = 0.05;
    static MOVEMENT_IN_X_AXIS = 'MOVEMENT_IN_X_AXIS';
    static MOVEMENT_IN_Y_AXIS = 'MOVEMENT_IN_Y_AXIS';

    /**
     * Method to determine if a movin object intersects or collides with a fixed object.
     * @param {object} fixedObject 
     * @param {object} movingObject 
     */
    static haveIntersection(fixedObject, movingObject) {
        const { EPSILON } = CollisionDetector;
        //Paddings
        let movingObjectWidthPadding = movingObject.width / 2;
        let fixedObjectWidthPadding = fixedObject.width / 2;
        let movingObjectHeightPadding = movingObject.height / 2;
        let fixedObjectHeightPadding = fixedObject.height / 2;

        return (
            movingObject.x + movingObjectWidthPadding + EPSILON >= fixedObject.x - fixedObjectWidthPadding &&
            movingObject.x - movingObjectWidthPadding - EPSILON <= fixedObject.x + fixedObjectWidthPadding &&
            movingObject.y - movingObjectHeightPadding - EPSILON <= fixedObject.y + fixedObjectHeightPadding &&
            movingObject.y + movingObjectHeightPadding + EPSILON >= fixedObject.y - fixedObjectHeightPadding
        );
    }

    /**
     * Method to get the snap position of a colliding moving object.
     * @param {object} fixedObject 
     * @param {object} movingObject 
     * @param {string} movementDirection 
     */
    static calculateSnapPosition(fixedObject, movingObject, movementDirection) { 
        let position = {
            x: movingObject.x,
            y: movingObject.y
        }
        //Paddings
        let movingObjectWidthPadding = movingObject.width / 2;
        let fixedObjectWidthPadding = fixedObject.width / 2;
        let movingObjectHeightPadding = movingObject.height / 2;
        let fixedObjectHeightPadding = fixedObject.height / 2;

        const { 
            EPSILON,
            MOVEMENT_IN_X_AXIS,
        } = CollisionDetector;


        //If the movement is in X
        if(movementDirection === MOVEMENT_IN_X_AXIS) {
            //If the moving object comes from the right side
            if(
                movingObject.x - movingObjectWidthPadding <= fixedObject.x + fixedObjectWidthPadding  && 
                movingObject.x - movingObjectWidthPadding > fixedObject.x - fixedObject.width
            ){
                position.x = fixedObject.x + (fixedObject.width / 2) + (movingObject.width / 2);
                return position;
            }
            //If the moving object comes from the left side
            else if( movingObject.x + movingObjectWidthPadding >= fixedObject.x - fixedObjectWidthPadding ){
                position.x = fixedObject.x - (fixedObject.width / 2) - (movingObject.width / 2);
                return position;
            }
        }
        
        //If the movement is in the Y axis
        else {
            //If the moving object comes from the top
            if( 
                movingObject.y + movingObjectHeightPadding >= fixedObject.y - fixedObjectHeightPadding &&
                movingObject.y + movingObjectHeightPadding < fixedObject.y + fixedObjectHeightPadding
            ) {
                position.y = fixedObject.y - fixedObjectHeightPadding - movingObjectHeightPadding;
                return position;
            }
            //If the moving object comes from the bottom
            else if( movingObject.y - movingObjectHeightPadding <= fixedObject.y + fixedObjectHeightPadding ){
                position.y = fixedObject.y + (fixedObject.height / 2) + (movingObject.height / 2);
                return position;
            }
        }
    
        return position;

    }

    /**
     * Method to get the direction of the mouse movement (X axis or Y axis) based on the event data.
     * @param {object} event 
     */
    static getMovementDirection = (event, previousDirection) => {
        //We get the posible movement directions
        const { MOVEMENT_IN_X_AXIS, MOVEMENT_IN_Y_AXIS } = CollisionDetector;
        //We extract relevant data from the event
        const {
            evt: { movementX, movementY }
        } = event;
        //Validation, by default the movement is considered in Y axis
        let movementMainlyInXAxis = false;
        //If the ammount of movement in X is greater than the ammount of movement in Y, we consider the movement along the X axis
        if(Math.abs(movementX) > Math.abs(movementY))
            movementMainlyInXAxis = true;
        //We validate the "change" of the direction
        if(Math.abs(movementX) - Math.abs(movementY) >= 2)
            movementMainlyInXAxis = true;
        else if(Math.abs(movementY) - Math.abs(movementX) >= 2)
            movementMainlyInXAxis = false;
        //If the change in either direction was not significant, we return the previous value
        else if(previousDirection)
            return previousDirection;
        
        return movementMainlyInXAxis ? MOVEMENT_IN_X_AXIS : MOVEMENT_IN_Y_AXIS;
    }

    /**
     * Extracts the relevant attributes, with an emphasis on the width and height, which are swapped if there exists rotation
     * of the type n * 90°, where n % 2 !== 0.
     * @param {object} attributes
     */
    static getRelevantAttributes = ({ x, y, width, height, rotation }) =>({
            x, 
            y, 
            width: RotationHelper.isNumberOfTurnsOdd(rotation) ? width : height, 
            height: RotationHelper.isNumberOfTurnsOdd(rotation) ? height : width,
        }
    );

    /**
     * Main method, detects if there is a collision and snaps the object to the edges of the colliding one.
     * @param {object} event 
     * @param {object} model 
     * @param {string} movementDirection 
     */
    static detectCollisions = (event, model, movementDirection) => {
        const { 
            haveIntersection,
            getRelevantAttributes,
            calculateSnapPosition
        } = CollisionDetector;
        //We extract relevant data from the event
        let { 
            target,
            target: { parent: layer },
            currentTarget: { attrs: movingObjectAttributes },
        } = event;
        
        //We check if there are collisions with any of the existing models in the scene
        layer.children.forEach(group => {
            //Do not check intersection with itself
            if(group === target)
              return;
            //We get the attributes of the fixed object
            let { attrs: fixedObjectAttributes } = group;
            //We get the data from the attributes (of the fixed object and the moving object)
            let movingObjectData = getRelevantAttributes(movingObjectAttributes);
            let fixedObjectData = getRelevantAttributes(fixedObjectAttributes);
            //If there is an intersection we make the snap
            if (haveIntersection(fixedObjectData, movingObjectData))
                model.position(calculateSnapPosition(fixedObjectData, movingObjectData, movementDirection))
          });
    }
}