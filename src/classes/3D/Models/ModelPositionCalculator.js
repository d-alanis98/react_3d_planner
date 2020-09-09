/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 */

export default class ModelPositionCalculator {
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
}