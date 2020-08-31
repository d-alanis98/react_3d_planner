/**
 * @author Damián Alanís Ramírez
 * @version 1.1.0
 */

export default class BoundDetector {
    constructor(object, initialYPosition, planeWidth, planeHeight){
        //Arguments
        this.object = object;
        this.planeWidth = planeWidth;
        this.planeHeight = planeHeight;
        this.initialYPosition = initialYPosition;
        //Parameters that will be obtained from the object
        this.scaleInX = 1;
        this.scaleInZ = 1;
        this.positionX = 0;
        this.positionZ = 0;
        this.maxPointInX = 0;
        this.maxPointInZ = 0;
        this.minPointInX = 0;
        this.minPointInZ = 0;
    }

    setParametersFromObject(){
        let { 
            scale: { x: scaleInX, z: scaleInZ },
            position: { x: positionX, z: positionZ },
            rotation: { _y: rotationInY },
            geometry: { boundingBox: { max: { x: maxPointInX, z: maxPointInZ }, min: { x: minPointInX, z: minPointInZ } } }
        } = this.object;

        this.scaleInX = scaleInX;
        this.scaleInZ = scaleInZ;
        this.positionX = positionX;
        this.positionZ = positionZ;
        this.rotationInY = rotationInY;
        this.maxPointInX = maxPointInX;
        this.maxPointInZ = maxPointInZ;
        this.minPointInX = minPointInX;
        this.minPointInZ = minPointInZ;
    }

    setObjectPositionX(x){
        this.object.position.x = x;
    }

    setObjectPositionY(y){
        this.object.position.y = y;
    }

    setObjectPositionZ(z){
        this.object.position.z = z;
    }

    setObjectPosition(x = null, y = null, z = null){
        x && this.setObjectPositionX(x);
        y && this.setObjectPositionY(y);
        z && this.setObjectPositionZ(z);
    }

    applyBoundDetectionAlgorithm(){    
        //We set parameters (like scale and current position) from the object data received
        this.setParametersFromObject();
        //Position in Y axis fixed to object´s initial Y axis position.
        this.setObjectPositionY(this.initialYPosition);
        //We get the required parameters for the algorithm
        let { 
            scaleInX,
            scaleInZ,
            positionX,
            positionZ,
            planeWidth,
            planeHeight,
            rotationInY,
            maxPointInX,
            maxPointInZ,
            minPointInX,
            minPointInZ,
        } = this;
        //Plane border position
        let planeBorderX = planeWidth / 2;
        let planeBorderZ = planeHeight / 2;
        //Item dimensions in X and Z axis
        let itemSizeInXAxis = (maxPointInX - minPointInX) * scaleInX;
        let itemSizeInZAxis = (maxPointInZ - minPointInZ) * scaleInZ;
        //If the object is rotated n*90° with n odd, we swap the sizes along the axis because the object was rotated to the side (right or left) and its now perpendicular to its original position
        let rotationInDegrees = rotationInY * 180 / Math.PI;
        if((Math.abs(rotationInDegrees) / 90) % 2 !== 0){
            let auxiliar = itemSizeInXAxis;
            itemSizeInXAxis = itemSizeInZAxis;
            itemSizeInZAxis = auxiliar;
        }
        //We get the border location in X and Z axis
        let borderXLocation = Math.abs(positionX) + (itemSizeInXAxis / 2); //It´s the absolute value because it can be the left side or the right side which may be touching the border of the plane
        let borderZLocation = Math.abs(positionZ) + (itemSizeInZAxis / 2);
        //Border conditions (X & Z)
        //If we overflow in x, we go to the end
        if(borderXLocation >= planeBorderX) {
            let newPositionInX = (planeBorderX - (itemSizeInXAxis / 2)) * Math.sign(positionX);
            this.setObjectPositionX(newPositionInX);
        }
        
        if(borderZLocation >= planeBorderZ) { 
            let newPositionInZ = (planeBorderZ - (itemSizeInZAxis / 2)) * Math.sign(positionZ);
            this.setObjectPositionZ(newPositionInZ);
        }
    }
}