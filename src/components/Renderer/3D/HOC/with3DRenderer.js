import React, { useState, useEffect } from 'react';
//HOC
import withProjectState from '../../../../redux/HOC/withProjectState';
import withEditorState from '../../../../redux/HOC/withEditorState';
import with3DRendererContextConsumer from './with3DRendererContextConsumer';
//Classes
import BidimensionalRenderer from '../../../../classes/Renderers/BidimensionalRenderer';
import TridimensionalRenderer from '../../../../classes/Renderers/TridimensionalRenderer';
import CoordinatesTransformation from '../../../../classes/Coordinates/CoordinatesTransformation';
//Factories
import TextureFactory from '../../../../classes/3D/Models/TextureFactory';
import CameraRotationFactory from '../../../../classes/3D/Camera/CameraRotationFactory';



const with3DRenderer = (WrappedComponent) => {
    let sceneInstanceModels = [];
    const With3DRenderer = props => {
        //PROPS
        //Destructuring
        const { 
            //From project HOC
            project, 
            addObject,
            editorState: { editorWidth, editorHeight },
            updateObject, 
            removeObject, 
            //From 3d renderer context consumer HOC
            rendererState,
            setRendererState,
            //From editor HOC
            set2DSceneDimensions, 
            set3DSceneDimensions, 
            ...extraProps
        } = props;
        const { objects: projectObjects } = project;

        //CONSTANTS
        const { BIDIMENSIONAL_SCENE } = BidimensionalRenderer;
        const { TRIDIMENSIONAL_SCENE } = TridimensionalRenderer;
    
        //HOOKS
        //State
        //Model, scene and events
        const [models, setModels] = useState({});
        const [sceneInstance, setSceneInstance] = useState();
        const [draggedObject, setDraggedObject] = useState();
        //Orbit controls
        const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);
        
        //Effects
        useEffect(() => {
            //We generate a tridimensional renderer instance with the width and height that are currently set in the state
            let sceneInstance = new TridimensionalRenderer(editorWidth, editorHeight);
            //We initialize the scene instance and provide the drag end callback, which is the update model function
            sceneInstance.init();
            sceneInstance.setDragEndCallback(updateModel);
            sceneInstance.setUpdateObjectsCallback(onObjectsUpdate);
            setSceneInstance(sceneInstance);
            /**
             * This method restores the existing objects in the plane
             */
            const restoreModels = () => {
                //We retrieve the existing models
                let modelsCopy = { ...models };
                //We iterate over the existing models and create the 2d model
                projectObjects.forEach(model => {
                    //We get the type and the coordinates (of the 2d key)
                    const { type, rotation, texture, productLine } = model;
                    const { coordinates } = model[TRIDIMENSIONAL_SCENE];
                    //We update the model quantity
                    modelsCopy[type] ? modelsCopy[type].quantity++ : modelsCopy[type] = { quantity: 1 };
                    //We create the 3D model
                    sceneInstance.load3DModel(
                        type,
                        productLine,
                        coordinates,
                        rotation,
                        texture,
                        createdModel => onCreationSuccess(createdModel)(model, coordinates), //onSuccess
                    );
                });
                setModels(modelsCopy);
            }
            restoreModels();
            //Freeing up memory
            return () => {
                sceneInstance.deleteScene()
                sceneInstance = null;
            }
        }, []);

        useEffect(() => {
            if(sceneInstance)
                setRendererState({
                    ...rendererState,
                    sceneInstance,
                    deleteModelById,
                    updateModelPosition,
                    sceneInstanceModels,
                });
        }, [
            sceneInstance, 
            projectObjects, 
            sceneInstanceModels
        ]);


        useEffect(() => {
            if(!draggedObject)
                return;
            //We get the id and coordinates
            let { uuid, x, y, z } = draggedObject;
            updateModelPosition(uuid, { x, y, z });
            /*
            //We find the object in the porject state by its id
            let existingObject = findObjectBy3DModelId(uuid);
            if(!existingObject)
                return;
            //We update the model's coordinates in both planes, and the uuid of the 3d editor
            let bidimensionalEditorState = { ...existingObject[BIDIMENSIONAL_SCENE] };
            let tridimensionalEditorState = { ...existingObject[TRIDIMENSIONAL_SCENE] };
            let updatedObject = {
                ...existingObject,
                [BIDIMENSIONAL_SCENE]: {
                    ...bidimensionalEditorState,
                    coordinates: get2DCoordinates(x, y, z)
                },
                [TRIDIMENSIONAL_SCENE]: {
                    ...tridimensionalEditorState,
                    uuid,
                    coordinates: { x, y: 0, z }
                }
            }
            updateObject(updatedObject);
            */
            
        }, [draggedObject]);

        const updateModelPosition = (modelId, { x, y, z }) => {
            //We find the object in the porject state by its id
            let existingObject = findObjectBy3DModelId(modelId);
            if(!existingObject)
                return;
            //We update the model's coordinates in both planes, and the uuid of the 3d editor
            let bidimensionalEditorState = { ...existingObject[BIDIMENSIONAL_SCENE] };
            let tridimensionalEditorState = { ...existingObject[TRIDIMENSIONAL_SCENE] };
            let updatedObject = {
                ...existingObject,
                [BIDIMENSIONAL_SCENE]: {
                    ...bidimensionalEditorState,
                    coordinates: get2DCoordinates(x, y, z)
                },
                [TRIDIMENSIONAL_SCENE]: {
                    ...tridimensionalEditorState,
                    uuid: modelId,
                    coordinates: { 
                        x, 
                        y, 
                        z 
                    }
                }
            }
            updateObject(updatedObject);
        }

        useEffect(() => {
            if(sceneInstance)
                sceneInstance.setOrbitControlsEnabled(orbitControlsEnabled);
        }, [orbitControlsEnabled]);

        /**
         * Success callback for the load3DModel method, in this callback we add the created object at project´s level, 
         * generating the id and 3d keys, which will contain the id´s and coordinates of the object in the current
         * project.
         * @param {object} createdModel 
         */
        const onCreationSuccess = createdModel => (projectModelData, coordinates) => {
            const { uuid } = createdModel;
            const { id, name } = projectModelData;
            let modelWithUpdatedId = {
                ...projectModelData,
                name: name || `Modelo ${ id }`,
                '3d': {
                    uuid: uuid,
                    container: getBoxBound(createdModel),
                    coordinates,
                }
            };
            updateObject(modelWithUpdatedId);
        }

        /**
         * This function calculates the bounding box (in depth and width), according to the maximum and minimum points in Z and X axis,
         * respectively.
         * @param {object} object 
         */
        const getBoxBound = object => {
            //We use object destructuring to get the required parameters from the object data
            const { 
                scale: { x: scaleX, z: scaleZ },
                geometry: { boundingBox: { min: { x: minimumX, z: minimumZ }, max: { x: maximumX, z: maximumZ }} },
            } = object;
            let itemSizeInXAxis = (maximumX - minimumX) * scaleX;
            let itemSizeInZAxis = (maximumZ - minimumZ) * scaleZ;
            return {
                itemDepth: itemSizeInZAxis,
                itemWidth: itemSizeInXAxis,
            }
        }

        /**
         * This function is the callback for the drag end event of an object. Every time an object is moved this function is executed.
         * Maintains the local state according to the new position of the object, in order to raise that change to the global state.
         * @param {object} event 
         */
        const updateModel = event => {
            //To discard the interaction event (double click)
            if(!event.object)
                return
            //We get the position and the id of the object
            const { object: { position: { x, y, z }, uuid } } = event;
            //This will trigger the effect that listens on changes on the draggedObject, and this will update objects position in the 
            //global state, also, the new 2d coordinates will be calculated to get a smooth transition. 
            setDraggedObject({ x, y, z, uuid });
        }

        /**
         * This function is the callback for the objects update of the scene instance. This way we can get the real reference to the
         * objects in the local state.
         * @param {array} models 
         */
        const onObjectsUpdate = models => sceneInstanceModels = models;

        /**
         * This method return the complete object based on it´s 3d model id
         * @param {string} id2DModel 
         */
        const findObjectBy3DModelId = id3DModel => projectObjects.find(object => object['3d'].uuid === id3DModel);
        
        /**
         * This method transforms the 3D coordinates to the corresponding 2D ones, to get the object placed in the same
         * way between both editors, making use of the class CoordinatesTransformation.
         * @param {number} x 
         * @param {number} y 
         * @param {number} z
         */
        const get2DCoordinates = (x, y, z) => {
            const { scene } = project;
            let coordinatesTransformation = new CoordinatesTransformation(scene, x, y, z);
            return coordinatesTransformation.tridimensionalToBidimensionalCoordinates();
        }

        /**
         * Toggles the state of the orbit controls.
         */
        const toggleOrbitControls = () => {
            setOrbitControlsEnabled(!orbitControlsEnabled);
        }

        /**
         * Loads a new texture to the provided object, making use of the addTextureObject from the TridimensionalRenderer instance.
         * @param {object} object 
         * @param {string} textureUri 
         */
        const addTextureToObject = (object, textureUri) => sceneInstance.addTextureToObject(object, textureUri);

        /**
         * 
         * @param {string|number} texture 
         */
        const addTextureToPlane = textureId => {
            let textureUri = TextureFactory.getTextureUri(textureId);
            sceneInstance.addTextureToObject(sceneInstance.plane, textureUri);
        }

        /**
         * This method moves the camera to the desired point of view.
         * @param {string} view 
         */
        const rotateCamera = (view = CameraRotationFactory.TOP_VIEW) => {
            let cameraDistance = sceneInstance.getOptimalCameraDistance();
            let cameraPositionVector = CameraRotationFactory.createCameraRotationVector(view, cameraDistance);
            sceneInstance.camera.position.copy(cameraPositionVector);
        }

        /**
         * This method deletes a model from the scene and from the project.
         * @param {string} modelId 
         */
        const deleteModelById = modelId => {    
            const projectObjectToDelete = findObjectBy3DModelId(modelId);
            sceneInstance.deleteModelById(modelId);  
            removeObject(projectObjectToDelete);  
        }



        return <WrappedComponent
            models = { models }
            sceneModels = { sceneInstanceModels }
            rotateCamera = { rotateCamera }
            deleteModelById = { deleteModelById }
            addTextureToPlane = { addTextureToPlane }
            addTextureToObject = { addTextureToObject }
            toggleOrbitControls = { toggleOrbitControls }
            orbitControlsEnabled = { orbitControlsEnabled }
            { ...extraProps }
        />
    }

    //We apply the project state HOC
    let WithProjectState = withProjectState(With3DRenderer);
    //We apply the editor state HOC
    let WithEditorState = withEditorState(WithProjectState);
    //We apply the 3d renderer context consumer HOC
    let With3DRendererContextConsumer = with3DRendererContextConsumer(WithEditorState);
    //We return the decorated component
    return With3DRendererContextConsumer;
}

export default with3DRenderer;