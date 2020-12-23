/**
 * @author Damián Alanís Ramírez
 * @version 3.2.1
 * @description Facade for adding a set of listeners to the model, with an interface to add any other in the future, the 
 * only requirement is to keep a reference to the model instance and provide a callback function.
 */

import CollisionDetector from "./CollisionDetector";

export default class ModelEvents {
    //Constants
    static DRAG_END_EVENT    = 'dragend';
    static DRAG_MOVE_EVENT   = 'dragmove';
    static DRAG_START_EVENT  = 'dragstart';
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
     * This method adds the drag start event listener to the model.
     * @param {object} model 
     * @param {function} eventCallback 
     */
    static addDragStartListener = (model, eventCallback) => {
        let {
            addEventListener,
            DRAG_START_EVENT
        } = ModelEvents;
        addEventListener(model, DRAG_START_EVENT, eventCallback);
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
            addDragStartListener,
            addRightClickListener
        } = ModelEvents;
        //Variable to make a reference to the mouse direction cleaner interval
        let movementInterval;
        //Drag end event
        addDragEndListener(model, event => {
            //We reset the last mouse movement direction, otherwise, it will be always the first that was set
            this.mouseMovementDirection = null;
            onUpdate(event);
            clearInterval(movementInterval);
        });
        //Collision detection events
        if(detectCollisions) {
            //On drag start, we start an interval to clear the mouse direction every 10 ms
            addDragStartListener(model, event => {
                movementInterval = setInterval(() => this.mouseMovementDirection = null, 10);
            });
            //During drag we validate collisions and make snap when necessary
            addDragMoveListener(model, event => {
                //Singleton like, we get the stored mouseMovementDirection, if its null, we get it using the getMovementDirection method
                if(!this.mouseMovementDirection) {
                    this.mouseMovementDirection = CollisionDetector.getMovementDirection(event, this.previousDirection);
                    this.previousDirection = this.mouseMovementDirection;
                }

                CollisionDetector.detectCollisions(event, model, this.mouseMovementDirection)
            });
        }
        addRightClickListener(model, onSelection);
    }


}