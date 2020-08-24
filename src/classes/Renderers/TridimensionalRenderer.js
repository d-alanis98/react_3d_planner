import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Interaction } from 'three.interaction';
//Classes
import BoundDetector from '../3D/BoxPositioning/BoundDetector';
import ModelScaleCalculator from '../3D/Models/ModelScaleCalculator';
//Factories
import PlaneFactory from '../3D/Plane/PlaneFactory';
//Functions
import { getModelUri, getDimensions } from '../../constants/models/models';


/**
 * @author Damián Alanís Ramírez
 * @version 7.4.1
 * Main class to control the tridimensional scene, making use of the library Three.js and custom logic to
 * manipulate the 3D editor and provide actions to change its behavior in runtime.
 * It sets scene settings and controls model addition, the only parameters that it receives in the constructor are
 * the scene dimensions (which are the same as the real room dimensions that were set in the project settings).
 */

export default class TridimensionalRenderer{
    //CONSTANTS
    //Scene identifier
    static TRIDIMENSIONAL_SCENE = '3d';
    //DOM container
    static DOM_CONTAINER_ID = 'tridimensional_renderer';
    //Light parameters
    static DEFAULT_LIGHT_COLOR = 0xFFFFFF;
    static DEFAULT_LIGHT_INTENSITY = 1;
    //Default texture
    static DEFAULT_TEXTURE_URI = '/assets/textures/wood.png'

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
        //Plane
        this.plane = null;
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
        this.addInteractionEvents();
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
        //We get optimal camera distance
        let cameraDistance = this.getOptimalCameraDistance();
        //Then we instantiate a perspective camera and set it´s parameters (position and look point)
        this.camera = new THREE.PerspectiveCamera(50, this.containerAspectRatio, 0.01, 3000);
        this.camera.position.set(0, cameraDistance, 0);
        this.camera.lookAt(0, cameraDistance, 0)
    }

    /**
     * This method creates the WebGLRenderer and set its size. Also, it appends the canvas where the scene is generated
     * to the dom container.
     */
    setInitialRenderer(){
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        //Renderer settings
        this.renderer.setClearColor('#e5e5e5');
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
        this.addControlsEventListeners();
    }

    /**
     * This method adds the main event listeners for the drag controls
     */
    addControlsEventListeners(){
        let initialYPosition = 0;
        //On drag event start we disable orbit controls to avoid events interference (we don´t want to trigger orbit controls while dragging an object)
        this.dragControls.addEventListener('dragstart', event => {
            initialYPosition = event.object.position.y;
            if(this.orbitControls)
                this.orbitControls.enabled = false
        })
        //During the drag event we apply validations in the position where the object is trying to be placed via the BoundDetector class
        this.dragControls.addEventListener('drag', event => {
            let { sceneHeight, sceneWidth } = this;
            let boundDetector = new BoundDetector(event.object, initialYPosition, sceneWidth, sceneHeight);
            boundDetector.applyBoundDetectionAlgorithm();
        });
        //On drag event end we enable the orbit controls again
        this.dragControls.addEventListener('dragend', event => {
            event.object.material.opacity = 1;
            if(this.onDragEnd && typeof(this.onDragEnd) === 'function')
                this.onDragEnd(event);
            if(this.orbitControls)
                this.orbitControls.enabled = this.enableOrbitControls;
        })

        
    }

    /**
     * This method creates a plane and adds it to the scene
     */
    addPlane(){
        //Grid plane
        let gridPlane = PlaneFactory.create(PlaneFactory.GRID, 50)
        this.addToScene(gridPlane)
        //Main plane (which can be personalized with different textures)
        this.plane = PlaneFactory.create(PlaneFactory.MESH_PLANE, this.sceneWidth, this.sceneHeight);
        this.addToScene(this.plane);  
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
     * This method adds the interaction capabilities, so we can handle events like click or mouse events in the objects.
     */
    addInteractionEvents(){
        this.interaction = new Interaction(this.renderer, this.scene, this.camera);
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
     * This methos sets the global callback for the drag end event
     * @param {function} callback 
     */
    setDragEndCallback(callback){
        if(callback && typeof(callback) === 'function')
            this.onDragEnd = callback;
        //We bind the this context (instance)
        this.onDragEnd = this.onDragEnd.bind(this);
    }

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
        light.position.set(0, 0, 0);
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
    }

    /**
     * This method sets the object's array with the provided one. Also, as in the addObject method, it updates the drag controls.
     * @param {array} objects 
     */
    setObjects(objects){
        if(Array.isArray(objects))
            this.objects = objects;
    }

    /**
     * This method loads a 3D model of the specified type and in the provided coordinates to the scene.
     * @param {string} type 
     * @param {object} initialCoordinates 
     * @param {function} onSuccess 
     */
    load3DModel(type, { x = 0, y = 0, z = 0 }, onSuccess, onSelection){
        //We get the data of the model based on the type (uri of the model and dimensions)
        let uri = getModelUri(type);
        let { width, height, depth } = getDimensions(type);
        //We load the model
        let loader = new GLTFLoader();
        loader.load(
            uri,
            gltf => {
                //Scaled to real dimensions
                gltf.scene.scale.set(1, 1, 1);
                //New objects starts at origin
                gltf.scene.position.set(0, 0, 0);
                //We add the object to the scene
                this.addToScene(gltf.scene)
                //We get the object of the scene and apply additional settings, finally we add it to the objects array (needed for drag controls)
                gltf.scene.traverse( object => {
                    if(object.isMesh) {
                        object.on('click', event => {
                            const { data: { originalEvent: { detail } } } = event;
                            //On double click we execute the onSelection callback
                            if(detail > 1)
                                onSelection && typeof(onSelection) === 'function' && onSelection(event);
                        });
                        //We set the proper scale to be accurate between the real dimensions and the dimensions in the 3D scene
                        let scaleCalculator = new ModelScaleCalculator(object, width, height, depth);
                        let { x: scaleInX, y: scaleInY, z: scaleInZ } = scaleCalculator.calculateScale();
                        object.scale.set(scaleInX, scaleInY, scaleInZ)
                        //We set the object´s position, for the Y axis, we calculate the exact position to get the desired height
                        let yPosition = this.getObjectYInitialPosition(y, object);
                        object.position.set(x, yPosition, z);
                        //We load the default texture to the object if this does not have one already
                        if(!object.material.map)
                            this.addTextureToObject(object, TridimensionalRenderer.DEFAULT_TEXTURE_URI);
                        if(onSuccess && typeof(onSuccess) === 'function')
                            onSuccess(object);
                        
                        //We add the object to the array
                        this.addObject(object);

                    }
                }) 
            }
        );
    }

    /**
     * This method gets the object Y position in order to get it to the desired height (initialY). 
     * If initialY = 0, it will appear at the origin of that axis.
     * This is done by the addition of the scaled minimum Y point and the initialY.
     * @param {number} initialY 
     * @param {object} object 
     */
    getObjectYInitialPosition(initialY, object){
        return  initialY + (Math.abs(object.geometry.boundingBox.min.y) * object.scale.y);
    }

    /**
     * This method adds a texture to the object´s material, it can be modified at runtime
     * @param {mesh} object 
     * @param {string} textureUri
     */
    addTextureToObject = (object, textureUri = null) => {
        if(!object.isMesh)
            return;
        /**
         * @todo Texture factory
         */
        //We load the texture 
        let texture = new THREE.TextureLoader().load(textureUri || TridimensionalRenderer.DEFAULT_TEXTURE_URI);
        //Required parameters, specially encoding, which is set to LuminanceFormat
        texture.encoding = THREE.LuminanceFormat;
        texture.flipY = false;
        //We add the texture in the material property of the object
        object.material = new THREE.MeshPhongMaterial({
            map: texture,
        });
        object.material.side = THREE.DoubleSide;
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
     * Method to get camera´s optimal distance, we need to get far enough to get the whole scene, therefore we 
     * take the maximum value between height and width
     */
    getOptimalCameraDistance = () => Math.max(this.sceneHeight, this.sceneWidth)  * 1.15;
}