import React, { useState, useEffect, Fragment } from 'react';
//Classes
import TridimensionalRenderer from '../../../../classes/Renderers/TridimensionalRenderer';
//Factories
import TextureFactory from '../../../../classes/3D/Models/TextureFactory';
import CameraRotationFactory from '../../../../classes/3D/Camera/CameraRotationFactory';
//Functions
import withProjectState from '../../../../redux/HOC/withProjectState';
import withEditorState from '../../../../redux/HOC/withEditorState';
import CoordinatesTransformation from '../../../../classes/Coordinates/CoordinatesTransformation';
import TridimensionalContextMenu from '../../../Editor/3D/ContextMenu/TridimensionalContextMenu';


const with3DRenderer = (WrappedComponent) => {
    let sceneInstanceModels = [];
    const With3DRenderer = props => {
        //PROPS
        //Destructuring
        const { 
            project, 
            addObject,
            editorState: { editorWidth, editorHeight },
            updateObject, 
            removeObject, 
            set2DSceneDimensions, 
            set3DSceneDimensions, 
            ...extraProps
        } = props;
        const { objects: projectObjects } = project;

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
                    const { coordinates } = model['3d'];
                    //We update the model quantity
                    modelsCopy[type] ? modelsCopy[type].quantity++ : modelsCopy[type] = { quantity: 1 };
                    
                    //We create the 3D model
                    sceneInstance.load3DModel(
                        type,
                        productLine,
                        coordinates,
                        rotation,
                        texture,
                        createdModel => { //onSuccess callback
                            const { uuid } = createdModel;
                            let modelWithUpdatedId = {
                                ...model,
                                '3d': {
                                    uuid: uuid,
                                    container: getBoxBound(createdModel),
                                    coordinates,
                                }
                            };
                            updateObject(modelWithUpdatedId);
                        },
                        //updateModel, //updateCallback
                        onSelectedModel, //onSelection
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
            if(!draggedObject)
                return;
            let { uuid, x, y, z } = draggedObject;
            let existingObject = findObjectBy3DModelId(uuid);


            if(!existingObject){
                console.log('Objeto no encontrado')
                return;
            }

            let bidimensionalEditorState = { ...existingObject['2d'] };
            let tridimensionalEditorState = { ...existingObject['3d'] };
            let updatedObject = {
                ...existingObject,
                '2d': {
                    ...bidimensionalEditorState,
                    coordinates: get2DCoordinates(x, y, z)
                },
                '3d': {
                    ...tridimensionalEditorState,
                    uuid,
                    coordinates: { x, y: 0, z }
                }
            }
            updateObject(updatedObject);
            
        }, [draggedObject]);

        useEffect(() => {
            if(sceneInstance){
                sceneInstance.setOrbitControlsEnabled(orbitControlsEnabled);
            }
        }, [orbitControlsEnabled]);

        /**
         * Success callback for the load3DModel method, in this callback we add the created object at project´s level, 
         * generating the id and 3d keys, which will contain the id´s and coordinates of the object in the current
         * project.
         * @param {object} createdModel 
         */
        const onCreationSuccess = (createdModel, type) => {
            //We get the id, type and the coordinates of the created model
            const { uuid, position: { x, y, z } } = createdModel;
            //We generate an object with all the properties needed to keep it in the state
            let objectToAdd = {
                id: projectObjects.length,
                type,
                '2d': {
                    uuid: '', //We don´t know the id for the 3D model, it will be generated and updated on render time
                    coordinates: get2DCoordinates(x, y, z)
                },
                '3d': {
                    uuid: uuid, //THREE.js generated ID 
                    container: getBoxBound(createdModel),
                    coordinates: { x, y: 0, z }
                }
            }
            //We add the object at project´s level
            addObject(objectToAdd);
        }
        const addModel = type => {
            increaseModelQuantity(type);
            sceneInstance.load3DModel(type, {x: 0, y: 0, z: 0}, model => onCreationSuccess(model, type));
        }

        const getBoxBound = object => {
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

        const updateModel = event => {
            //To discard the interaction event (double click)
            if(!event.object)
                return
            //We get the position and the id of the object
            const { object: { position: { x, y, z }, uuid } } = event;
            setDraggedObject({ x, y, z, uuid });
        }

        const onObjectsUpdate = models => {
            sceneInstanceModels = models;
        }

        const onSelectedModel = event => {/*
            const { data: { target: model, originalEvent: { x, y } } } = event;
            console.log({ x, y });
            
            setContextMenuModel(model);
            setDisplayContextMenu(true);
            setContextMenuPosition({ x, y });
            */
            
        }

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

        const toggleOrbitControls = () => {
            setOrbitControlsEnabled(!orbitControlsEnabled);
        }

        const increaseModelQuantity = type => {
            let modelsCopy = { ...models };
            modelsCopy[type] ? modelsCopy[type].quantity++ : modelsCopy[type] = { quantity: 1 };
            setModels(modelsCopy);
        }

        const addTextureToObject = (object, textureUri) => sceneInstance.addTextureToObject(object, textureUri);

        const addTextureToPlane = texture => {
            let textureUri = TextureFactory.getTextureUri(texture);
            sceneInstance.addTextureToObject(sceneInstance.plane, textureUri);
        }

        const rotateCamera = (view = CameraRotationFactory.TOP_VIEW) => {
            let cameraDistance = sceneInstance.getOptimalCameraDistance();
            //We get the available views
            let cameraPositionVector = CameraRotationFactory.createCameraRotationVector(view, cameraDistance);
            sceneInstance.camera.position.copy(cameraPositionVector);
        }

        const deleteModelById = modelId => {    
            const projectObjectToDelete = findObjectBy3DModelId(modelId);
            sceneInstance.deleteModelById(modelId);      
            removeObject(projectObjectToDelete);  

        }
        


        return (
            <Fragment>
                <WrappedComponent
                    models = { models }
                    addModel = { addModel }
                    sceneModels = { sceneInstanceModels }
                    rotateCamera = { rotateCamera }
                    deleteModelById = { deleteModelById }
                    addTextureToPlane = { addTextureToPlane }
                    addTextureToObject = { addTextureToObject }
                    toggleOrbitControls = { toggleOrbitControls }
                    orbitControlsEnabled = { orbitControlsEnabled }
                    { ...extraProps }
                />
            </Fragment>
        )
    }

    //We apply the project state HOC
    let WithProjectState = withProjectState(With3DRenderer);
    //We apply the editor state HOC
    let WithEditorState = withEditorState(WithProjectState);
    //We return the decorated component
    return WithEditorState;
}

export default with3DRenderer;