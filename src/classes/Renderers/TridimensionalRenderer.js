import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
//Factories
import PlaneFactory from '../3D/Plane/PlaneFactory';

export default class TridimensionalRenderer{
    //CONSTANTS
    //DOM container
    static DOM_CONTAINER_ID = 'tridimensional_renderer';
    //Light parameters
    static DEFAULT_LIGHT_COLOR = 0xFFFFFF;
    static DEFAULT_LIGHT_INTENSITY = 1;


    //CONSTRUCTOR
    constructor(sceneWidth = PlaneFactory.DEFAULT_SIZE, sceneHeight = PlaneFactory.DEFAULT_SIZE){
        this.objects = [];
        //Scene dimensions
        this.sceneWidth = sceneWidth;
        this.sceneHeight = sceneHeight;
        //Container dimensions
        this.domContainer = document.getElementById(TridimensionalRenderer.DOM_CONTAINER_ID);
        this.containerWidth = this.domContainer.clientWidth;
        this.containerHeight = this.domContainer.clientHeight;
        this.containerAspectRatio = this.containerWidth / this.containerHeight;
        //Controls
        this.orbitControls = null;
        this.dragControls = null;
        this.enableOrbitControls = true;
        //Methods linkage
        this.render = this.render.bind(this);
    }

    //PRIMARY METHODS

    /**
     * Main method, creates a scene and adds the necessary items. It also invokes the render method that will run
     * as the mainloop.
     */
    init(){
        this.setInitialScene();
        this.setInitialCameraState();
        this.setInitialRenderer();
        this.addControls();
        this.addPlane();
        this.addResizeListener();
        this.render()
    }

    /**
     * This method creates a scene and adds the light to it
     */
    setInitialScene(){
        this.scene = new THREE.Scene();
        this.addLight();
    }

    /**
     * This method creates a perspective camera, providing the aspect ratio and other parameters (most of them equal
     * to the default ones) and setting it far enough to cover the whole scene
     */
    setInitialCameraState(){
        this.camera = new THREE.PerspectiveCamera(50, this.containerAspectRatio, 0.01, 3000);
        //Para Plane
        //this.camera.position.z = 16;
        //Para GridHelper
        
        this.camera.position.set(0, 6, 0);
        this.camera.lookAt(0, 0, 4)
        
    }

    /**
     * This method creates the WebGLRenderer and set its size. Also, it appends the canvas where the scene is generated
     * to the dom container.
     */
    setInitialRenderer(){
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        //Renderer settings
        this.renderer.setClearColor("#e5e5e5");
        this.renderer.setSize(this.containerWidth, this.containerHeight);
        //Append renderer in DOM
        this.domContainer.appendChild(this.renderer.domElement);
    }

    /**
     * This method creates the necessary controls to the scene (orbit controls and drag controls)
     */
    addControls(){
        this.orbitControls = new OrbitControls( this.camera, this.renderer.domElement );
        this.dragControls = new DragControls(this.objects, this.camera, this.renderer.domElement);
    }

    /**
     * This method creates a plane and adds it to the scene
     */
    addPlane(){
        let meshPlane = PlaneFactory.create(PlaneFactory.GRID, this.sceneWidth, this.sceneHeight);
        this.addToScene(meshPlane);  
    }

    /**
     * This method adds a listener to the window resize event, in order to change the renderer dimensions to make it
     * responsive, likewise, with the camera aspect ratio based on the new container dimensions
     */
    addResizeListener(){
        window.addEventListener('resize', () => {
            this.setContainerDimensions();
            this.renderer && this.renderer.setSize(this.containerWidth, this.containerHeight);
            if(this.camera){
                this.camera.aspect = this.containerAspectRatio;
                this.camera.updateProjectionMatrix()
            }
        })
    }

    /**
     * This method conforms the mainloop of the 3d scene, by requesting the animation frame on a recursive way it'll always
     * be executing the render method of the WebGLRenderer. Also, the orbit controls are updated in order to reflect the 
     * camera´s perspective changes made by the user interaction with mouse/keyboard events
     */
    render(){
        requestAnimationFrame(this.render);
        if(this.renderer && this.scene && this.camera){
            this.renderer.render(this.scene, this.camera);
        }
        if(this.orbitControls){
            this.orbitControls.update();
        }
    }

    //SECONDARY METHODS

    /**
     * This method adds an item to the current scene
     * @param {any} element 
     */
    addToScene(element){
        this.scene.add(element);
    }

    /**
     * Light creation and incorporation to the scene
     */
    addLight(){
        let light = new THREE.AmbientLight(TridimensionalRenderer.DEFAULT_LIGHT_COLOR, TridimensionalRenderer.DEFAULT_LIGHT_INTENSITY)
        light.position.set(1, 1, 1);
        this.addToScene(light);
    }

    /**
     * This method sets the current dimensions of the DOM container
     */
    setContainerDimensions(){
        this.containerWidth = this.domContainer.clientWidth;
        this.containerHeight = this.domContainer.clientHeight;
        this.containerAspectRatio = this.containerWidth / this.containerHeight;
    }

    /**
     * This method adds a single object to the existing array of objects and updates the drag controls in order to be 
     * able to manipulate the object.
     * @param {any} object 
     */
    addObject(object){
        this.objects.push(object);
        this.updateDragControls();
    }

    /**
     * This method sets the object's array with the provided one. Also, as in the addObject method, it updates the drag controls.
     * @param {array} objects 
     */
    setObjects(objects){
        if(Array.isArray(objects))
            this.objects = objects;
        this.updateDragControls();
    }

    load3DModel(uri){
        let loader = new GLTFLoader();
        loader.load(
            uri,
            gltf => {
                gltf.scene.scale.set(1, 1, 1);
                gltf.scene.position.set(0,0,0)
                gltf.scene.position.set(0, 0, 0);
                this.addToScene(gltf.scene)
                gltf.scene.traverse( object => {
                    if ( object.isMesh ) this.addObject(object);
                }) 
            }
        );
    }

    /**
     * This method sets the status of the orbit controls (true means enabled, false is blocked)
     * @param {boolean} value 
     */
    setOrbitControlsEnabled(value){
        this.enableOrbitControls = value;
        this.orbitControls.enabled = value;
    }

    /**
     * This method creates a new instance of DragControls with the new objects, also, it adds the respective listeners for
     * the drag-start, drag and drag-end events.
     * When the drag event is fired (drag-start) the orbit control is disabled to avoid events interference.
     * During the object drag, the position where the user is placing the object is validated (border conditions), also, 
     * the Y axis is locked in the origin.
     * When the drag event ends (drag-end) the orbit control is enabled.
     */
    updateDragControls(){
        this.dragControls = new DragControls(this.objects, this.camera, this.renderer.domElement)
        let orbitControls = this.orbitControls;
        //On drag event start we disable orbit controls to avoid events interference (we don´t want to trigger orbit controls while dragging an object)
        this.dragControls.addEventListener('dragstart', event => {
            if(orbitControls)
                orbitControls.enabled = false
        })
        //During the drag event we apply validations in the position where the object is trying to be placed
        this.dragControls.addEventListener ( 'drag', event => {
            //Position in Y axis fixed to origin.
            console.log({ object: event.object })
            event.object.position.y = 0; 
            //Border conditions (X & Z)
            event.object.position.x = Math.abs(event.object.position.x) >= 2 ? 2 * (event.object.position.x > 0 ? 1 : -1) : event.object.position.x
            event.object.position.z = Math.abs(event.object.position.z) >= 2 ? 2 * (event.object.position.z > 0 ? 1 : -1) : event.object.position.z
        })
        //On drag event end we enable the orbit controls again
        this.dragControls.addEventListener('dragend', event => {
            event.object.material.opacity = 1
            if(orbitControls)
                orbitControls.enabled = this.enableOrbitControls;
        })

    }
}