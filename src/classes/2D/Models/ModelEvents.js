/**
 * @author Damián Alanís Ramírez
 * @version 1.0.0
 * @description Facade for adding a set of listeners to the model, with an interface to add any other in the future, the 
 * only requirement is to keep a reference to the model instance and provide a callback function.
 */

export default class ModelEvents {
    //Constants
    static DRAG_END_EVENT    = 'dragend';
    static RIGHT_CLICK_EVENT = 'contextmenu';

    /**
     * This method adds an event listener to the object
     * @param {object} model 
     * @param {string} eventType 
     * @param {function} eventCallback 
     */
    static addEventListener = (model, eventType, eventCallback) => {
        model.on(eventType, eventCallback);
    }

    /**
     * This method adds the right click event listener to the model
     * @param {object} model 
     * @param {function} eventCallback 
     */
    static addRightClickListener = (model, eventCallback) => {
        let {
            addEventListener,
            RIGHT_CLICK_EVENT
        } = ModelEvents;
        addEventListener(model, RIGHT_CLICK_EVENT, event => {
            //We avoid the default action (show the browser´s context menu) to execute the custom logic in eventCallback
            event.evt.preventDefault();
            if(eventCallback && typeof(eventCallback) === 'function')
                eventCallback(event);
            return false;
        });
    }

    /**
     * This method adds the drag end event listener to the model.
     * @param {object} model 
     * @param {function} eventCallback 
     */
    static addDragEndListener = (model, eventCallback) => {
        let {
            addEventListener,
            DRAG_END_EVENT
        } = ModelEvents;
        addEventListener(model, DRAG_END_EVENT, eventCallback);
    }

    /**
     * This method adds the 2 basic event listeners for the model, the drag end (to update its position) and the right
     * click event (to show the contextual menu with the available actions to apply to the model)
     * @param {object} model 
     * @param {function} onUpdate 
     * @param {function} onSelection 
     */
    static addModelBasicEventListeners = (model, onUpdate, onSelection) => {
        let {
            addDragEndListener,
            addRightClickListener
        } = ModelEvents;
        addDragEndListener(model, onUpdate);
        addRightClickListener(model, onSelection);
    }
}