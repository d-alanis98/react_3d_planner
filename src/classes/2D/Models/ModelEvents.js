/**
 * @author Damián Alanís Ramírez
 * @version 2.1.0
 * @description Facade for adding a set of listeners to the model, with an interface to add any other in the future, the 
 * only requirement is to keep a reference to the model instance and provide a callback function.
 */

import CollisionDetector from "./CollisionDetector";

export default class ModelEvents {
    //Constants
    static DRAG_END_EVENT    = 'dragend';
    static DRAG_MOVE_EVENT    = 'dragmove';
    static RIGHT_CLICK_EVENT = 'contextmenu';
    //Mouse movement direction
    static mouseMovementDirection = null;

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

    static addDragMoveListener = (model, eventCallback) => {
        let {
            addEventListener,
            DRAG_MOVE_EVENT
        } = ModelEvents;
        addEventListener(model, DRAG_MOVE_EVENT, eventCallback);
    }

    /**
     * This method adds the 2 basic event listeners for the model, the drag end (to update its position) and the right
     * click event (to show the contextual menu with the available actions to apply to the model)
     * @param {object} model 
     * @param {function} onUpdate 
     * @param {function} onSelection 
     */
    static addModelBasicEventListeners = (model, onUpdate, onSelection, detectCollisions = true) => {
        let {
            addDragEndListener,
            addDragMoveListener,
            addRightClickListener
        } = ModelEvents;
        addDragEndListener(model, event => {
            //We reset the last mouse movement direction, otherwise, it will be always the first that was set
            this.mouseMovementDirection = null;
            onUpdate(event);
        });
        if(detectCollisions)
            addDragMoveListener(model, event => {
                //Singleton like, we get the stored mouseMovementDirection, if its null, we get it using the getMovementDirection method
                if(!this.mouseMovementDirection)
                    this.mouseMovementDirection = CollisionDetector.getMovementDirection(event);
                CollisionDetector.detectCollisions(event, model, this.mouseMovementDirection)
            });
        addRightClickListener(model, onSelection);
    }


}