import React, { useState, useEffect } from 'react';
//Classes
import BidimensionalRenderer from '../../../../classes/Renderers/BidimensionalRenderer';
import withProjectState from '../../../../redux/HOC/withProjectState';
import withEditorState from '../../../../redux/HOC/withEditorState';
import TridimensionalRenderer from '../../../../classes/Renderers/TridimensionalRenderer';
import CoordinatesTransformation from '../../../../classes/Coordinates/CoordinatesTransformation';

const with2DRenderer = WrappedComponent => {
    const With2DRenderer = props => {
        //CONSTANTS
        const BIDIMENSIONAL  = BidimensionalRenderer.BIDIMENSIONAL_SCENE;
        const TRIDIMENSIONAL = TridimensionalRenderer.TRIDIMENSIONAL_SCENE;
        //PROPS
        //Destructuring
        const { 
            project,
            addObject, 
            editorState: { editorWidth, editorHeight },
            updateObject, 
            removeObject, 
            set2DRoomDimensions,
            set2DSceneDimensions, 
            ...ownProps 
        } = props;
        const { objects: projectObjects } = project;
        //HOOKS
        //State
        const [models, setModels] = useState({});
        const [sceneInstance, setSceneInstance] = useState();
        const [draggedObject, setDraggedObject] = useState();
        

        //Effects
        useEffect(() => {
            //We set the scene instance
            let sceneInstance = new BidimensionalRenderer(editorWidth, editorHeight);
            sceneInstance.init();
            setSceneInstance(sceneInstance);
            //We set the container dimensions
            let { containerWidth, containerHeight } = sceneInstance;
            set2DSceneDimensions(containerWidth, containerHeight);
            //We set the room dimensions 
            const { width: roomWidth, height: roomHeight } = sceneInstance.getRoomDimensionInPixels();
            set2DRoomDimensions(roomWidth, roomHeight);

            /**
             * This method restores the existing objects in the plane
             */
            const restoreModels = () => {
                //We retrieve the existing models in state
                let modelsCopy = { ...models };
                //We iterate over the existing models and create the 2d model
                projectObjects.forEach(model => {
                    //We get the type and the coordinates (of the 2d key)
                    const { type, productLine } = model;
                    const { coordinates } = model[BIDIMENSIONAL];
                    //We update the model quantity
                    modelsCopy[type] ? modelsCopy[type].quantity++ : modelsCopy[type] = { quantity: 1 };
                    //We create the SVG model
                    sceneInstance.loadSVGModel(
                        type,
                        productLine,
                        coordinates,
                        createdModel => { //onSuccess callback
                            let { _id, attrs: { x, y } } = createdModel;
                            let modelWithUpdatedId = {
                                ...model,
                                [BIDIMENSIONAL]: {
                                    uuid: _id,
                                    coordinates: { x, y }
                                },
                                [TRIDIMENSIONAL]: {
                                    uuid: '',
                                    coordinates: get3DCoordinates(x, y)
                                }
                            };
                            updateObject(modelWithUpdatedId) //updateCallback
                        },
                        updateModel
                    );
                });
                setModels(modelsCopy);
            }
            restoreModels();
            
        }, []);


        /**
         * Effect used to update the dragged object
         */
        useEffect(() => {
            if(!draggedObject)
                return;
            //We get the id and the coordinates from the dragged object
            const { _id, x, y } = draggedObject
            
            let existingObject = findObjectBy2DModelId(_id);
            if(!existingObject)
                return;
            let tridimensionalEditorState = { ...existingObject[TRIDIMENSIONAL] };
            let updatedObject = { 
                ...existingObject,
                [BIDIMENSIONAL]: {
                    uuid: _id,
                    coordinates: { x, y }
                },
                [TRIDIMENSIONAL]: {
                    ...tridimensionalEditorState,
                    coordinates: get3DCoordinates(x, y), //We get the 3D coordinates, because movements in 2D editor take effect on 3D editor too
                }
            };
            updateObject(updatedObject);
        }, [draggedObject]);
        /**
         * Success callback for the loadSVGModel method, in this callback we add the created object at project´s level, 
         * generating the id and the 2d and 3d keys, which will contain the id´s and coordinates of the object in the current
         * project.
         * @param {object} createdModel 
         */
        const onCreationSuccess = createdModel => {
            //We get the id, type and the coordinates of the created model
            let { _id, attrs: { x, y, type } } = createdModel;
            //We generate an object with all the properties needed to keep it in the state
            let objectToAdd = {
                id: projectObjects.length,
                type,
                [BIDIMENSIONAL]: {
                    uuid: _id, //Konva generated ID
                    coordinates: { x, y }
                },
                [TRIDIMENSIONAL]: {
                    uuid: '', //We don´t know the id for the 3D model, it will be generated and updated on render time
                    coordinates: { x: 0, y: 0, z: 0 }
                }
            }
            //We add the object at project´s level
            addObject(objectToAdd);
        }

        /**
         * This method return the complete object based on it´s 2d model id
         * @param {string} id2DModel 
         */
        const findObjectBy2DModelId = id2DModel => projectObjects.find(object => object[BIDIMENSIONAL].uuid === id2DModel);

        const updateModel = event => {
            if(!event.target)
                return;
            //We get the 2d model id and the new coordinates
            const { target: { _id, attrs: { x, y } } } = event;
            setDraggedObject({ x, y, _id });       
        }

        /**
         * This method adds a new model of the specified type to the scene
         * @param {string} type 
         */
        const addModel = (type, coordinates = { }) => {
            increaseModelQuantity(type);
            //We provide the success callback to add the object at project´s level
            sceneInstance.loadSVGModel(type, coordinates, onCreationSuccess, updateModel);
        }

        /**
         * This method increases the quantity of the specified model
         * @param {string} type 
         */
        const increaseModelQuantity = type => {
            let modelsCopy = { ...models };
            modelsCopy[type] ? modelsCopy[type].quantity++ : modelsCopy[type] = { quantity: 1 };
            setModels(modelsCopy);
        }

        /**
         * This method transforms the 2D coordinates to the corresponding 3D ones, to get the object placed in the same
         * way between both editors, making use of the class CoordinatesTransformation.
         * @param {number} x 
         * @param {number} y 
         */
        const get3DCoordinates = (x, y) => {
            const { scene } = project;
            let coordinatesTransformation = new CoordinatesTransformation(scene, x, y);
            return coordinatesTransformation.bidimensionalToTridimensionalCoordinates();
        }

        return <WrappedComponent 
            models = { models }
            addModel = { addModel }
            { ...ownProps }
        />
    }

    //We apply the project state HOC
    let WithProjectState = withProjectState(With2DRenderer);
    //We apply the editor state decorator
    let WithEditorState = withEditorState(WithProjectState);
    //We return the decorated component
    return WithEditorState;
}


export default with2DRenderer;