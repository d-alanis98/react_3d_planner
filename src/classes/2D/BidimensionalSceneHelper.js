//Constants
import { TOP } from "../../constants/models/models";

/**
 * @author Damián Alanís Ramírez
 * @version 1.0.0
 */
export default class BidimensionalSceneHelper {
    static getYAxis = (editorView, editorHeight, editorDepth) => editorView === TOP ? editorHeight : editorDepth;
}