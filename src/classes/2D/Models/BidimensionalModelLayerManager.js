//Dependencies
import { TOP, FRONT } from "../../../constants/models/models";
import TridimensionalRenderer from "../../Renderers/TridimensionalRenderer";


/**
 * @author Damián Alanís Ramírez
 * @version 1.0.0
 * This class packs some methods to get the models array ordered by "layers", that is, ordered by their maximum points 
 * on the appropriate axis according to the view, to get a view similar to what you would get in real life from those 
 * perspectives.
 */
export default class BidimensionalModelLayerManager { 
    static TRIDIMENSIONAL = TridimensionalRenderer.TRIDIMENSIONAL_SCENE;
    /**
     * This method returns an ordered array following these criteria based on the editorView parameter value:
     * - TOP: Ordered from the minimum to the maximum point in Y axis.
     * - FRONT: Ordered from the maximum to the minimim point in Z axis.
     * @param {array} stateModelsArray 
     * @param {string} editorView 
     */
    static getModelsArrayOrderedByLayers = (stateModelsArray, editorView = TOP) => {
        const {
            getModelsArrayOrderedByLayerInTopView,
            getModelsArrayOrderedByLayerInFrontView
        } = BidimensionalModelLayerManager;

        //We apply the required implementation based on the current editor view
        switch(editorView) {
            case TOP:
                return getModelsArrayOrderedByLayerInTopView(stateModelsArray);
            case FRONT:
                return getModelsArrayOrderedByLayerInFrontView(stateModelsArray);
            default:
                return getModelsArrayOrderedByLayerInTopView(stateModelsArray);
        }
    }

    /**
     * Implementation to get the layered array suitable for the top view.
     * @param {} stateModelsArray 
     */
    static getModelsArrayOrderedByLayerInTopView = stateModelsArray => (
        [...stateModelsArray].sort((a, b) => a[this.TRIDIMENSIONAL].maxPointInY > b[this.TRIDIMENSIONAL].maxPointInY ? 1 : -1)
    );

    /**
     * Implementation to get the layered array suitable for the front view.
     * @param {array} stateModelsArray 
     */
    static getModelsArrayOrderedByLayerInFrontView = stateModelsArray => (
        [...stateModelsArray].sort((a, b) => a[this.TRIDIMENSIONAL].maxPointInZ > b[this.TRIDIMENSIONAL].maxPointInZ ? 1 : -1)
    );
}