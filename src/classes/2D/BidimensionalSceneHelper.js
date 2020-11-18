//Constants
import { FRONT_RIGHT, TOP } from "../../constants/models/models";

/**
 * @author Damián Alanís Ramírez
 * @version 1.0.0
 */
export default class BidimensionalSceneHelper {
    static getXAxis = (editorView, editorXCoordinate, editorZCoordinate) => editorView === FRONT_RIGHT ? editorZCoordinate : editorXCoordinate;
    static getYAxis = (editorView, editorZCoordinate, editorYCoordinate) => editorView === TOP ? editorZCoordinate : editorYCoordinate;
}