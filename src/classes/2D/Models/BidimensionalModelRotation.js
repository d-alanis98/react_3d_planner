//Dependencies
import RoomBoundDetector from "../Room/RoomBoundDetector"

/**
 * @author Damián Alanís Ramírez
 * @version 3.4.2
 */
export default class BidimensionalModelRotation {

    static rotate = (model, degrees, scene) => {
        model.rotate(degrees);
        //We set the new drag bound function, as the width and height changed with rotation
        BidimensionalModelRotation.setNewDragBoundFunction(model, scene);
        scene.layer.batchDraw();
    }

    static setNewDragBoundFunction = (model, scene) => {
        let { attrs: { width, height, rotation } } = model
        //If the angle is npi/2, with n odd
        if((Math.abs(rotation) / 90) % 2 !== 0)
            model.dragBoundFunc(position => RoomBoundDetector.boundDetection(scene, height, width, position));
        //If the angle is npi/2, with n even
        else model.dragBoundFunc(position => RoomBoundDetector.boundDetection(scene, width, height, position));
    }
}