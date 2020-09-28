import React, { useState, useEffect } from 'react';
//HOC
import withProjectState from '../../../../redux/HOC/withProjectState';
import withEditorState from '../../../../redux/HOC/withEditorState';
import with3DRendererContextConsumer from './with3DRendererContextConsumer';
//Classes
import BidimensionalRenderer from '../../../../classes/Renderers/BidimensionalRenderer';
import TridimensionalRenderer from '../../../../classes/Renderers/TridimensionalRenderer';
import ModelPositionCalculator from '../../../../classes/3D/Models/ModelPositionCalculator';
//Factories
import TextureFactory from '../../../../classes/3D/Models/TextureFactory';
import CameraRotationFactory from '../../../../classes/3D/Camera/CameraRotationFactory';
import withPlaneState from '../../../../redux/HOC/withPlaneState';
import PlaneTextureHelper from '../../../../classes/3D/Plane/PlaneTextureHelper';
import WallColor from '../../../../classes/3D/Walls/WallColor';



const with3DRenderer = (WrappedComponent) => {
    let sceneInstanceModels = [];
    const With3DRenderer = props => {
        //PROPS
        //Destructuring
        const { 
            //From project HOC
            project, 
            addObject,
            editorState: { editorWidth, editorHeight, editorDepth: roomHeight },
            updateObject, 
            removeObject, 
            //From 3d renderer context consumer HOC
            rendererState,
            setRendererState,
            //From editor HOC
            set2DSceneDimensions, 
            set3DSceneDimensions, 
            //From plane state HOC
            plane: { planeTexture, wallsColor },
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
        //Walls visibility
        const [displayWalls, setDisplayWalls] = useState(true);
        //Orbit controls
        const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);
        
        //Effects
        useEffect(() => {
            //We generate a tridimensional renderer instance with the width and height that are currently set in the state
            let sceneInstance = new TridimensionalRenderer(editorWidth, editorHeight, roomHeight, planeTexture);
            //We set the plane texture and wall's color with the values that we have in the global state
            sceneInstance.setPlaneTexture(planeTexture);
            sceneInstance.setWallsColor(wallsColor);
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
                sceneInstance.deleteScene();
                sceneInstance = null;
            }
        }, []);

        useEffect(() => {
            if(sceneInstance)
                setRendererState({
                    ...rendererState,
                    displayWalls,
                    sceneInstance,
                    deleteModelById,
                    sceneInstanceModels,
                    updateModelPositionParameters,
                });
        }, [
            displayWalls,
            sceneInstance, 
            projectObjects, 
            sceneInstanceModels
        ]);

        useEffect(() => {
            if(!sceneInstance || !sceneInstance.plane)
                return;
            let plane = sceneInstance.plane;
            let planeTextureHelper = new PlaneTextureHelper(plane, sceneInstance);
            planeTextureHelper.applyTexture(planeTexture);
        }, [planeTexture]);

        useEffect(() => {
            if(!sceneInstance || !sceneInstance.walls)
                return;
            sceneInstance.walls.forEach(wall => {
                WallColor.applyColor(wall, wallsColor);
            });
        }, [wallsColor]);

        useEffect(() => {
            if(!draggedObject)
                return;
            //We get the id and coordinates
            let { uuid, x, y, z } = draggedObject;
            updateModelPosition(uuid, { x, y, z });  
        }, [draggedObject]);

        useEffect(() => {
            if(sceneInstance) {
                sceneInstance.walls.forEach(wall => {
                    wall.visible = displayWalls;
                })
            }
        }, [displayWalls]);

        useEffect(() => {
            if(sceneInstance)
                sceneInstance.setOrbitControlsEnabled(orbitControlsEnabled);
        }, [orbitControlsEnabled]);

        /**
         * A template of an updated object, which accepts the 2d and 3d key properties to be updated in that specific model.
         * @param {string} modelId 
         * @param {object} bidimensionalEditorParameters 
         * @param {object} tridimensionalEditorParameters 
         */
        const getUpdatedModelTemplate = (modelId, bidimensionalEditorParameters, tridimensionalEditorParameters) => {
            //We find the object in the porject state by its id
            let existingObject = findObjectBy3DModelId(modelId);
            if(!existingObject)
                return;
            //We update the model's coordinates in both planes, and the uuid of the 3d editor
            let bidimensionalEditorState = { ...existingObject[BIDIMENSIONAL_SCENE] };
            let tridimensionalEditorState = { ...existingObject[TRIDIMENSIONAL_SCENE] };
            return {
                ...existingObject,
                [BIDIMENSIONAL_SCENE]: {
                    ...bidimensionalEditorState,
                    ...bidimensionalEditorParameters
                },
                [TRIDIMENSIONAL_SCENE]: {
                    uuid: modelId,
                    ...tridimensionalEditorState,
                    ...tridimensionalEditorParameters
                }
            }
        }

        /**
         * Updates the model position in the global state.
         * @param {string} modelId 
         * @param {object} position 
         */
        const updateModelPosition = (modelId, { x, y, z }) => {
            let model = sceneInstance.objects.find(model => model.uuid === modelId);
            //We don't need to update any parameter of the 2D key
            let bidimensionalEditorParameters = { }
            //We are going to update the coordinates
            let tridimensionalEditorParameters = {
                coordinates: {
                    x, y, z
                },
                maxPointInZ: ModelPositionCalculator.getMaximumPointInZ(model)
            }
            let updatedModel = getUpdatedModelTemplate(modelId, bidimensionalEditorParameters, tridimensionalEditorParameters);
            if(!updatedModel)
                return;
            updateObject(updatedModel);
        }

        /**
         * Updates the model's coordinates and maximum point on the Y axis in the global state.
         * @note Main difference between this method and updateModelPosition is that the last one only updates model
         * coordinates, while updateModelPositionParameters also updates the maxPointInY. Also, this method was created 
         * mainly for the PositionModifier component, and updateModelPosition is for internal use (in this HOC), intended
         * to be fired on every object's drag end event.
         * @param {string} modelId 
         * @param {number} maxPointInY 
         */
        const updateModelPositionParameters = (modelId, coordinates = { }, maxPointInY, maxPointInZ) => {
            //We don't need to update any parameter of the 2D key
            let bidimensionalEditorParameters = { }
            //We are going to update the maxPointInY parameter of the model
            let tridimensionalEditorParameters = {
                maxPointInY,
                maxPointInZ,
                coordinates: {
                    ...coordinates
                }
            }
            let updatedModel = getUpdatedModelTemplate(modelId, bidimensionalEditorParameters, tridimensionalEditorParameters);
            if(!updatedModel)
                return;
            updateObject(updatedModel);
        }

        /**
         * Success callback for the load3DModel method, in this callback we add the created object at project´s level, 
         * generating the id and 3d keys, which will contain the id´s and coordinates of the object in the current
         * project.
         * @param {object} createdModel 
         */
        const onCreationSuccess = createdModel => (projectModelData, coordinates) => {
            const { uuid } = createdModel;
            const { id, name } = projectModelData;
            //We calculate the model max point in y, to be able to render models by layers in 2D editor
            const maxPointInY =  ModelPositionCalculator.getMaximumPointInY(createdModel);
            const maxPointInZ = ModelPositionCalculator.getMaximumPointInZ(createdModel);
            //We create the updated model object
            let modelWithUpdatedId = {
                ...projectModelData,
                name: name || `Modelo ${ id }`,
                [TRIDIMENSIONAL_SCENE]: {
                    uuid: uuid,
                    container: getBoxBound(createdModel),
                    coordinates,
                    maxPointInY,
                    maxPointInZ
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

        const toggleWallsVisibility = () => {
            setDisplayWalls(!displayWalls);
        };



        return <WrappedComponent
            models = { models }
            sceneModels = { sceneInstanceModels }
            displayWalls = { displayWalls }
            rotateCamera = { rotateCamera }
            deleteModelById = { deleteModelById }
            addTextureToPlane = { addTextureToPlane }
            addTextureToObject = { addTextureToObject }
            toggleOrbitControls = { toggleOrbitControls }
            orbitControlsEnabled = { orbitControlsEnabled }
            toggleWallsVisibility = { toggleWallsVisibility }
            { ...extraProps }
        />
    }

    //We apply the project state HOC
    let WithProjectState = withProjectState(With3DRenderer);
    //We apply the editor state HOC
    let WithEditorState = withEditorState(WithProjectState);
    //We apply the plane state HOC
    let WithPlaneState = withPlaneState(WithEditorState);
    //We apply the 3d renderer context consumer HOC
    let With3DRendererContextConsumer = with3DRendererContextConsumer(WithPlaneState);
    //We return the decorated component
    return With3DRendererContextConsumer;
}

export default with3DRenderer;