import React, { useState, useEffect } from 'react';
//Classes
import TridimensionalRenderer from '../../../../classes/Renderers/TridimensionalRenderer';
//Factories
import TextureFactory from '../../../../classes/3D/Models/TextureFactory';
import CameraRotationFactory from '../../../../classes/3D/Camera/CameraRotationFactory';
//Functions
import { getModelUri } from '../../../../constants/models/models';
import withProjectState from '../../../../redux/HOC/withProjectState';


const with3DRenderer = (WrappedComponent) => {

    const With3DRenderer = ({ project, addObject, updateObject, removeObject, set2DSceneDimensions, set3DSceneDimensions, ...extraProps}) => {
        //PROPS
        //Destructuring
        const { objects: projectObjects } = project;

        //HOOKS
        //State
        const [models, setModels] = useState({});
        const [sceneInstance, setSceneInstance] = useState();
        const [draggedObject, setDraggedObject] = useState();
        const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);

        //Effects
        useEffect(() => {
            let sceneInstance = new TridimensionalRenderer();
            sceneInstance.init();
            sceneInstance.setDragEndCallback(updateModel);
            setSceneInstance(sceneInstance);
            //We set the container dimensions
            const { sceneWidth, sceneHeight } = sceneInstance;
            set3DSceneDimensions(sceneWidth, sceneHeight);
            //If not set already, we set the 2D editor dimensions (the whole dom container dimensions)
            if(!project.scene || !project.scene['2d']){
                let editorContainer = document.getElementById(TridimensionalRenderer.DOM_CONTAINER_ID);
                set2DSceneDimensions(editorContainer.clientWidth, editorContainer.clientHeight);
            }
            /**
             * This method restores the existing objects in the plane
             */
            const restoreModels = () => {
                //We retrieve the existing models in state
                let modelsCopy = { ...models };
                //We iterate over the existing models and create the 2d model
                projectObjects.forEach(model => {
                    //We get the type and the coordinates (of the 2d key)
                    const { type } = model;
                    const { coordinates } = model['3d'];
                    //We update the model quantity
                    modelsCopy[type] ? modelsCopy[type].quantity++ : modelsCopy[type] = { quantity: 1 };
                    //We create the 3D model
                    sceneInstance.load3DModel(
                        type,
                        coordinates,
                        createdModel => { //onSuccess callback
                            const { uuid } = createdModel;
                            let modelWithUpdatedId = {
                                ...model,
                                '3d': {
                                    uuid: uuid,
                                    coordinates,
                                }
                            };
                            updateObject(modelWithUpdatedId) 
                        },
                        updateModel //updateCallback
                    );
                });
                setModels(modelsCopy);
            }
            restoreModels();
        }, []);

        useEffect(() => {
            if(!draggedObject)
                return;
            const { uuid, x, y, z } = draggedObject;
            let existingObject = findObjectBy3DModelId(uuid);
            if(!existingObject){
                console.log('Objeto no encontrado')
                return;
            }
            let bidimensionalEditorState = { ...existingObject['2d'] };
            let updatedObject = {
                ...existingObject,
                '2d': {
                    ...bidimensionalEditorState,
                    coordinates: get2DCoordinates(x, z)
                },
                '3d': {
                    uuid: uuid,
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
                    coordinates: get2DCoordinates(x, z)
                },
                '3d': {
                    uuid: uuid, //THREE.js generated ID 
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

        const updateModel = event => {
            //We get the position and the id of the object
            const { object: { position: { x, y, z }, uuid } } = event;
            setDraggedObject({ x, y, z, uuid });
        }

        /**
         * This method return the complete object based on it´s 3d model id
         * @param {string} id2DModel 
         */
        const findObjectBy3DModelId = id3DModel => projectObjects.find(object => object['3d'].uuid === id3DModel);

        const calculateOriginCoordinates = (x, y) => {
            let { sceneWidth, sceneHeight } = { ...project.scene['2d'] };
            let planeCenterX = sceneWidth / 2;
            let planeCenterY = sceneHeight / 2;
            return {
                x: planeCenterX - x,
                y: planeCenterY - y
            }
        }

        const get2DCoordinates = (x, z) => {
            const { scene } = project;
            //We get the dimensions of each scene
            let { sceneWidth: bidimensionalSceneWidth, sceneHeight: bidimensionalSceneHeight } = { ...scene['2d'] };
            let { sceneWidth: tridimensionalSceneWidth, sceneHeight: tridimensionalSceneHeight } = { ...scene['3d'] };
            //We get the ratio between the two scenes dimensions
            let xRatio = bidimensionalSceneWidth / tridimensionalSceneWidth;
            let yRatio = bidimensionalSceneHeight / tridimensionalSceneHeight;
            //Remembering that z (depth) in 3D editor is y in 2D editor (TOP_VIEW), and that they are inverted
            return calculateOriginCoordinates(-1 * x * xRatio, -1 * z * yRatio);
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
        


        return <WrappedComponent
            models = { models }
            addModel = { addModel }
            rotateCamera = { rotateCamera }
            addTextureToPlane = { addTextureToPlane }
            addTextureToObject = { addTextureToObject }
            toggleOrbitControls = { toggleOrbitControls }
            orbitControlsEnabled = { orbitControlsEnabled }
            { ...extraProps }
        />
    }

    //We apply the project state HOC
    let WithProjectState = withProjectState(With3DRenderer);
    //We return the decorated component
    return WithProjectState;
}

export default with3DRenderer;