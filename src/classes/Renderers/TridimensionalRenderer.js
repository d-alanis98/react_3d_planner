import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
//Classes
import BoundDetector from '../3D/BoxPositioning/BoundDetector';
import ModelDecorator from '../3D/Models/ModelDecorator';
import DimensionsGetter from '../Models/DimensionsGetter';
import PlaneTextureHelper from '../3D/Plane/PlaneTextureHelper';
import ModelScaleCalculator from '../3D/Models/ModelScaleCalculator';
//Factories
import PlaneFactory from '../3D/Plane/PlaneFactory';
import TextureFactory from '../3D/Models/TextureFactory';
import WallFactory from '../3D/Walls/WallFactory';

/**
 * @author Damián Alanís Ramírez
 * @version 8.9.3
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
    //Camera parameters
    static CAMERA_DISTANCE_FACTOR = 1.75;
    //Default texture
    static DEFAULT_TEXTURE_URI = TextureFactory.getTextureUri();
    //CONSTRUCTOR
    constructor(sceneWidth = PlaneFactory.DEFAULT_SIZE, sceneHeight = PlaneFactory.DEFAULT_SIZE, roomHeight){
        this.objects = [];
        //Scene dimensions
        this.sceneWidth = sceneWidth;
        this.sceneHeight = sceneHeight;
        //Room height
        this.roomHeight = roomHeight;
        //Container dimensions
        this.domContainer = document.getElementById(TridimensionalRenderer.DOM_CONTAINER_ID);
        this.containerWidth = this.domContainer.clientWidth;
        this.containerHeight = this.domContainer.clientHeight;
        this.containerAspectRatio = this.containerWidth / this.containerHeight;
        //Plane
        this.plane = null;
        this.planeTexture = null;
        //Walls
        this.walls = [];
        this.wallsColor = WallFactory.DEFAULT_COLOR;
        //Controls
        this.orbitControls = null;
        this.dragControls = null;
        this.enableOrbitControls = true;
        //Methods linkage
        this.render = this.render.bind(this);
        //Other methods
        this.onObjectsUpdate = null;

    }

    //PRIMARY METHODS

    /**
     * Main method, creates a scene and adds the necessary items. It also invokes the render method that will run
     * as the mainloop.
     */
    init(){
        return new Promise((resolve, reject) => {
            this.setInitialScene();
            this.setInitialCameraState();
            this.setInitialRenderer();
            this.addControls();
            this.addPlane();
            this.addWalls(resolve);
            this.addResizeListener();
            this.render()
        });
    }

    /**
     * This method creates a scene and adds the light to it
     */
    setInitialScene(){
        this.scene = new THREE.Scene();
        this.addLights();
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
        this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
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
    }


    addDragControls() {
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
            //We apply the active style while moving (cyan color)
            ModelDecorator.applyStyle(event.object, ModelDecorator.ACTIVE_STYLE);
            let boundDetector = new BoundDetector(event.object, initialYPosition, sceneWidth, sceneHeight);
            boundDetector.applyBoundDetectionAlgorithm();
        });
        //On drag event end we enable the orbit controls again
        this.dragControls.addEventListener('dragend', event => {
            //We restore the original color (rgb(1,1,1)) after dragging
            ModelDecorator.applyStyle(event.object, ModelDecorator.INACTIVE_STYLE);
            if(this.onDragEnd && typeof(this.onDragEnd) === 'function')
                this.onDragEnd(event);
            if(this.orbitControls)
                this.orbitControls.enabled = this.enableOrbitControls;
        })

        
    }
    /**
     * Setter for the plane texture property
     * @param {string|number} planeTexture 
     */
    setPlaneTexture(planeTexture) {
        this.planeTexture = planeTexture;
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
        //We apply the texture that we have in the global state
        let planeTextureHelper = new PlaneTextureHelper(this.plane, this);
        planeTextureHelper.applyTexture(this.planeTexture);
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
        this.requestAnimationFrameId = requestAnimationFrame(this.render);
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
     * This method sets the global callback for the updated objects event
     * @param {function} callback 
     */
    setUpdateObjectsCallback(callback){
        if(callback && typeof(callback) === 'function')
            this.onObjectsUpdate = callback;
        //We bind the this context (instance)
        this.onObjectsUpdate = this.onObjectsUpdate.bind(this);
    }

    /**
     * This method adds an item to the current scene
     * @param {any} element 
     */
    addToScene(element){
        this.scene.add(element);
    }

    /**
     * Lights creation and incorporation to the scene. We create 3 lights from 3 different views, isometric opposites and
     * the top view.
     */
    addLights(){
        //We get the lights parameters, color, intensity and we calculate the distance based on the optimal camera distance increased 1.75 times
        const { DEFAULT_LIGHT_COLOR, DEFAULT_LIGHT_INTENSITY } = TridimensionalRenderer;
        const optimalLightDistance = this.getOptimalCameraDistance() * 1.75;
        //Isometric view light
        const directionalLightIsometric = new THREE.DirectionalLight(DEFAULT_LIGHT_COLOR, DEFAULT_LIGHT_INTENSITY);
        directionalLightIsometric.position.set(optimalLightDistance, optimalLightDistance / 2, optimalLightDistance);
        directionalLightIsometric.target.position.set(optimalLightDistance, optimalLightDistance / 2, optimalLightDistance);
        this.addToScene(directionalLightIsometric);
        //Isometric opposite view
        const directionalLightIsometricOpposite = new THREE.DirectionalLight(DEFAULT_LIGHT_COLOR, DEFAULT_LIGHT_INTENSITY);
        directionalLightIsometricOpposite.position.set(-optimalLightDistance, optimalLightDistance / 2, -optimalLightDistance);
        directionalLightIsometricOpposite.target.position.set(-optimalLightDistance, optimalLightDistance / 2, -optimalLightDistance);
        this.addToScene(directionalLightIsometricOpposite);
        //Top view
        const directionalLightTop = new THREE.DirectionalLight(DEFAULT_LIGHT_COLOR, DEFAULT_LIGHT_INTENSITY / 2);
        directionalLightTop.position.set(0, optimalLightDistance * 3, 0);
        directionalLightTop.target.position.set(0, optimalLightDistance * 3, 0);
        this.addToScene(directionalLightTop);
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
     * This method adds a single object to the existing array of objects.
     * @param {any} object 
     */
    addObject(object){
        this.objects.push(object);
        //We notify the object change observers
        this.onObjectsUpdate(this.objects);
    }

    /**
     * This method sets the object's array with the provided one.
     * @param {array} objects 
     */
    setObjects(objects) {
        if(Array.isArray(objects))
            this.objects = objects;
        //We notify the object change observers
        this.onObjectsUpdate(this.objects);
    }

    /**
     * Setter for the wall's color property.
     * @param {string|number} wallsColor 
     */
    setWallsColor(wallsColor) {
        this.wallsColor = wallsColor;
    }

    /**
     * We add the walls to the scene
     */
    addWalls(resolveInitPromise){
        let sceneInstance = this;
        let wallFactory = new WallFactory(
            this.sceneWidth, 
            this.roomHeight, 
            this.sceneHeight,
            WallFactory.WALL_DEPTH, 
            sceneInstance,
            this.wallsColor
        );
        wallFactory.createAllWalls()
            .then(createdWalls => {
                //We store the created walls in the current instance, in the walls property
                sceneInstance.walls = createdWalls;
                resolveInitPromise(createdWalls);
            }); 
    }

    /**
     * This method loads a 3D model of the specified type and in the provided coordinates to the scene.
     * @param {string|number} type 
     * @param {string} productLine 
     * @param {object} initialCoordinates 
     * @param {number} rotation 
     * @param {string|number} texture 
     * @param {function} onSuccess 
     */
    load3DModel(
        type, 
        productLine, 
        { x = 0, y = 0, z = 0 }, 
        rotation, texture = null, 
        onSuccess, 
        modelState = 'O', 
        modelDirection = 'I'
    ) {
        //We conform the uri of the model
        let uri = `${process.env.MIX_APP_API_ENDPOINT}/productos/lineas/${productLine}/getModel?direction=${modelDirection}&state=${modelState}`;
        //We get the model dimensions
        let { width, height, depth } = DimensionsGetter.getDimensions(productLine, type);
        //DEPTH CORRECTIONS FOR OPENED DOOR
        /**
         * If model has door(s)
         * depth += (width / numberOfDoors)
         * z += (width / (2 * numberOfDoors))
         * 
         * hasDoor and numberOfDoors will come as parameter
         * @todo Change implementation of this function, to receive an object with the parameters, instead of the positional ones
         * The change must be done in with3DRenderer.js too.
         */
        if(modelState === 'O') {
            depth += (width / 2);
            z += (width / 4);
        }
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
                        //We set the proper scale to be accurate between the real dimensions and the dimensions in the 3D scene
                        let scaleCalculator = new ModelScaleCalculator(object, width, height, depth);
                        let { x: scaleInX, y: scaleInY, z: scaleInZ } = scaleCalculator.calculateScale();
                        object.scale.set(scaleInX, scaleInY, scaleInZ)
                        //We set the object´s position, for the Y axis, we calculate the exact position to get the desired height
                        let yPosition = y === 0 ? this.getObjectYInitialPosition(y, object) : y; //Only on creation y will be exactly 0, then the position will be the exact one
                        object.position.set(x, yPosition, z);
                        if(rotation)
                            object.rotateY(rotation * Math.PI / 180);
                        //We load the default texture to the object if this does not have one already
                        if(!object.material.map)
                            this.addTextureToObject(object, TextureFactory.getTextureUriFromId(texture));
                        if(onSuccess && typeof(onSuccess) === 'function')
                            onSuccess(object);
                        
                        //We add the object to the array
                        this.addObject(object);
                    }
                }) 
            },
        );
    }

    hotReplaceModel({
        modelData: { 
            type,
            texture,
            rotation,
            modelState,
            coordinates,
            productLine,
            modelDirection
        },
        onSuccess,
        modelToReplaceId
    }) {
        this.deleteModelById(modelToReplaceId);
        this.load3DModel(
            type,
            productLine,
            coordinates,
            rotation,
            texture,
            onSuccess,
            modelState,
            modelDirection,
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
        //We load the texture 
        let texture = new THREE.TextureLoader().load(textureUri || TridimensionalRenderer.DEFAULT_TEXTURE_URI);
        //Required parameters, specially encoding, which is set to LuminanceFormat
        texture.encoding = THREE.RGBAFormat;
        texture.flipY = false;
        /**
         * @todo Scale textures to bigger resolution to avoid repeating the texture image
         */
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        const timesToRepeatHorizontally = 5;
        const timesToRepeatVertically = 5;
        texture.repeat.set(timesToRepeatHorizontally, timesToRepeatVertically);
        //END OF TEXTURE REPEAT
        //We add the texture in the material property of the object
        object.material = new THREE.MeshStandardMaterial({
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
    getOptimalCameraDistance = () => Math.max(this.sceneHeight, this.sceneWidth) * TridimensionalRenderer.CAMERA_DISTANCE_FACTOR;


    getWalls = () => this.walls;

    deleteModelById = modelId => {
        let modelToDelete = this.objects.find(model => model.uuid === modelId);
        if(!modelToDelete)
            return;
        
        let filteredObjects = this.objects.filter(model => model.uuid !== modelToDelete.uuid);
        this.setObjects(filteredObjects);
        //We free memory
        let sceneModel = this.scene.getObjectByProperty( 'uuid', modelId )
        this.disposeObject(sceneModel);
    }

    disposeObject = object => {
        //End of recursion, all nodes have been eliminated
        if(!object)
            return;
        object.children.forEach(child => this.disposeObject(child));
        //Parent removal
        object.parent.remove(object);
        //Geometry disposal
        if(object.geometry) 
            object.geometry.dispose();
        //Material disposal
        if(object.material) {
            if(object.material.map)
                object.material.map.dispose();
            object.material.dispose();
        }
        object = undefined;
        this.renderer.renderLists.dispose();
    }

    deleteScene = () => {
        for(let iterator = 0; iterator < this.objects.length; iterator++) {
            this.disposeObject(this.objects[iterator])
            delete(this.objects[iterator]);
        }

        while(this.scene.children.length > 0){ 
            this.scene.remove(this.scene.children[0]); 
        }

        this.objects = undefined;
        this.renderer.renderLists.dispose();
        this.renderer.forceContextLoss();
        this.renderer.dispose();
        this.scene = null
        this.camera = null
        
        this.renderer = null;
        
        cancelAnimationFrame(this.requestAnimationFrameId);
        this.plane = null;
        this.orbitControls = null;
        this.dragControls = null;
    }
}