import { FRONT, FRONT_RIGHT, TOP } from "../../../constants/models/models";
import RotationHelper from "../../Helpers/RotationHelper";

export default class BidimensionalModelScale {

    static swapScaleValues = (widthScale, heightScale) => {
        return {
            widthScale: heightScale,
            heightScale: widthScale
        };
    }

    static getScaleForEachAxis = scale => ({
        scaleInX: scale.scaleInX || 1,
        scaleInY: scale.scaleInY || 1,
        scaleInZ: scale.scaleInZ || 1
    });

    static getScaleBasedOnView = (editorView, scale) => {
        let widthScale = 1, heightScale = 1;
        const { scaleInX, scaleInY, scaleInZ } = BidimensionalModelScale.getScaleForEachAxis(scale);
        switch(editorView) {
            case TOP:
                widthScale = scaleInX;
                heightScale = scaleInZ;
                break;
            case FRONT:
                widthScale = scaleInX;
                heightScale = scaleInY;
                break;
            case FRONT_RIGHT:
                widthScale = scaleInZ;
                heightScale = scaleInY;
                break;
        }
        return { widthScale, heightScale };
    }

    static getScaleToApplyBasedOnViewAndRotation = (scale, editorView, rotation) => {
        let { widthScale, heightScale } = BidimensionalModelScale.getScaleBasedOnView(editorView, scale);
        if(rotation && !RotationHelper.isNumberOfTurnsOdd(rotation))
            return BidimensionalModelScale.swapScaleValues(widthScale, heightScale);
        return { widthScale, heightScale };
    }
}