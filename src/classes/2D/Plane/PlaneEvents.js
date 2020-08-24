/**
 * @author Damián Alanís Ramírez
 * @version 1.2.2
 */
export default class PlaneEvents {
    static addPlaneZoomEventListener = stage => {
        let scaleBy = 1.1;
        stage.on('wheel', event => {
            event.evt.preventDefault();
            let oldScale = stage.scaleX();
            let pointer = stage.getPointerPosition();

            let mousePointTo = {
                x: (pointer.x - stage.x()) / oldScale,
                y: (pointer.y - stage.y()) / oldScale,
            };

            let newScale = event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
            stage.scale({ x: newScale, y: newScale });

            let newPosition = {
                x: pointer.x - mousePointTo.x * newScale,
                y: pointer.y - mousePointTo.y * newScale,
            };
            stage.position(newPosition);
            stage.batchDraw();
        });
    }
}