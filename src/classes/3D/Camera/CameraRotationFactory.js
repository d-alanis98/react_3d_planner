import * as THREE from 'three';
import TridimensionalRenderer from "../../Renderers/TridimensionalRenderer";

export default class CameraRotationFactory {
    /**
     * Predefined views (top, front - with 4 modes - and isometric);
     */
    //TOP VIEW
    static TOP_VIEW = 'TOP_VIEW';
    //FRONT VIEW
    static BACK_VIEW    = 'BACK_VIEW';
    static FRONT_VIEW   = 'FRONT_VIEW';
    static FRONT_LEFT   = 'FRONT_LEFT';
    static FRONT_RIGHT  = 'FRONT_RIGHT';
    //ISOMETRIC
    static ISOMETRIC_VIEW = 'ISOMETRIC_VIEW';

    /**
     * Creates an instance of a tridimensional vector, which represents the position of the camera in the desired point of view.
     * It also accepts a number representing the distance (how far is the camera). If not defined, the default value in TridimendionalRenderer
     * will be used instead.
     * @param {string} type 
     * @param {number} distance 
     */
    static createCameraRotationVector = (type, distance = null) => {
        let cameraDistance = distance || TridimensionalRenderer.DEFAULT_CAMERA_DISTANCE;
        //The 3d vector to be returned is initialized with 0´s
        let cameraPosition = new THREE.Vector3(0, 0, 0);
        //We get the type of views (just to avoid writing the name of the class before all of them in the switch)
        let { TOP_VIEW, BACK_VIEW, FRONT_VIEW, FRONT_LEFT, FRONT_RIGHT, ISOMETRIC_VIEW } = CameraRotationFactory;

        switch(type){
            case TOP_VIEW:
                //In top view we only make non-zero the Y axis
                cameraPosition.setY(cameraDistance);
                break;
            case BACK_VIEW:
                //In back view we only make non-zero the Z axis (but in negative way)
                cameraPosition.setZ(-cameraDistance);
                break;
            case FRONT_VIEW:
                //In front view we make non-zero the Z axis
                cameraPosition.setZ(cameraDistance);
                break;
            case FRONT_LEFT:
                //In front left view we only make non-zero the X axis (but in negative way)
                cameraPosition.setX(-cameraDistance);
                break;
            case FRONT_RIGHT:
                //In front right view we only make non-zero the X axis
                cameraPosition.setX(cameraDistance);
                break;
            case ISOMETRIC_VIEW:
                //We get a little closer
                cameraDistance -= 2;
                //In isometric view we set the X axis and the Z axis equal, and we make the Y axis half the distance value
                cameraPosition.setX(cameraDistance);
                cameraPosition.setY(cameraDistance / 2);
                cameraPosition.setZ(cameraDistance);
                break;
            default:
                //By default we get the top view
                cameraPosition.setY(cameraDistance);
        }
        //We return the 3d vector which represents the position that the camera needs to acquire in order to get the desired view
        return cameraPosition;
    }
}