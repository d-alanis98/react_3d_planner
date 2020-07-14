import { DragControls as ThreeDragControls } from 'three/examples/jsm/controls/DragControls';

export default class DragControls extends ThreeDragControls {
    //Constantes de clase
    static DEFAULT_BORDER = 70;
    //Constructor
    constructor(camera, domElement, orbitControls){
        super([], camera, domElement)
        //Instance, which will be reassigned on every updateDragControls call
        this.instance = null;
        //Array of objects, which will trigger instance update on every adition
        this.objects = [];
        //Static properties, they will not change
        this.camera = camera;
        this.domElement = domElement;
        this.orbitControls = orbitControls;
        //Border conditions variables
        this.xBorder = DragControls.DEFAULT_BORDER;
        this.yBorder = DragControls.DEFAULT_BORDER;
    }

    getInstance(){
        return this.instance;
    }

    addObject(object){
        this.objects.push(object);
        //We update the objects by creating a new instance of DragControls
        this.updateDragControls();
    }

    setObjects(objects){
        this.objects = objects;
        //We update the objects by creating a new instance of DragControls
        this.updateDragControls();
    }

    /**
     * 
     * @param {number} xBorder 
     * @param {number} yBorder 
     */
    setBorders(xBorder, yBorder){
        this.xBorder = xBorder;
        this.yBorder = yBorder;
    }

    updateDragControls(){
        //A new instance is created to get the updated objects
        this.instance = new DragControls(this.objects, this.camera, this.domElement)
        //We gstore the orbit controls instance in a variable inside this function scope
        let orbitControls = this.orbitControls;
        console.log({ orbitControls })
        //On drag event start we disable orbit controls to avoid events interference (we don´t want to trigger orbit controls while dragging an object)
        this.instance.addEventListener('dragstart', event => {
            event.object.material.opacity = 0.33
            if(orbitControls)
                orbitControls.enabled = false
        })
        //During the drag event we apply validations in the position where the object is trying to be placed
        this.instance.addEventListener ( 'drag', event => {
            //Position in Z axis fixed to origin.
            event.object.position.z = event.object.geometry.parameters.radius; 
            //Border conditions (X & Y)
            event.object.position.x = Math.abs(event.object.position.x) >= this.xBorder ? this.xBorder * (event.object.position.x > 0 ? 1 : -1) : event.object.position.x
            event.object.position.y = Math.abs(event.object.position.y) >= this.yBorder ? this.yBorder * (event.object.position.y > 0 ? 1 : -1) : event.object.position.y
        })
        //On drag event end we enable the orbit controls again
        this.instance.addEventListener('dragend', event => {
            event.object.material.opacity = 1
            console.log('dragend')
            if(orbitControls)
                orbitControls.enabled = true
        })
        return this.instance
    }
}