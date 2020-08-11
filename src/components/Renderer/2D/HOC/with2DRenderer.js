import React, { useState, useEffect } from 'react';
//Classes
import BidimensionalRenderer from '../../../../classes/Renderers/BidimensionalRenderer';
import withProjectState from '../../../../redux/HOC/withProjectState';

const with2DRenderer = WrappedComponent => {
    const With2DRenderer = ({ project, addObject, updateObject, removeObject, set2DSceneDimensions, ...ownProps }) => {
        //PROPS
        //Destructuring
        const { objects: projectObjects } = project;
        //HOOKS
        //State
        const [models, setModels] = useState({});
        const [sceneInstance, setSceneInstance] = useState();
        const [draggedObject, setDraggedObject] = useState();
        

        //Effects
        useEffect(() => {
            //We set the scene instance
            let sceneInstance = new BidimensionalRenderer();
            sceneInstance.init();
            setSceneInstance(sceneInstance);
            //We set the container dimensions
            const { containerWidth, containerHeight } = sceneInstance;
            set2DSceneDimensions(containerWidth, containerHeight);
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
                    const { coordinates } = model['2d'];
                    //We update the model quantity
                    modelsCopy[type] ? modelsCopy[type].quantity++ : modelsCopy[type] = { quantity: 1 };
                    //We create the SVG model
                    sceneInstance.loadSVGModel(
                        type,
                        coordinates,
                        createdModel => { //onSuccess callback
                            let { _id, attrs: { x, y } } = createdModel;
                            let modelWithUpdatedId = {
                                ...model,
                                '2d': {
                                    uuid: _id,
                                    coordinates: { x, y }
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
            let tridimensionalEditorState = { ...existingObject['3d'] };
            let updatedObject = { 
                ...existingObject,
                '2d': {
                    uuid: _id,
                    coordinates: { x, y }
                },
                '3d': {
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
                '2d': {
                    uuid: _id, //Konva generated ID
                    coordinates: { x, y }
                },
                '3d': {
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
        const findObjectBy2DModelId = id2DModel => projectObjects.find(object => object['2d'].uuid === id2DModel);

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

        const calculateOriginCoordinates = (x, y) => {
            let { x: planeCenterX, y: planeCenterY } = sceneInstance.planeCenterCoordinates;
            return {
                x: planeCenterX - x,
                y: planeCenterY - y
            }
        }

        const get3DCoordinates = (x, y) => {
            let originCoordinates = calculateOriginCoordinates(x, y);
            let { x: originX, y: originY } = originCoordinates;
            let xRatio = 5 / sceneInstance.containerWidth; //Posteriormente se obtiene del estado
            let yRatio = 5 / sceneInstance.containerHeight;
            return {
                x:  -1 * originX * xRatio,
                y: 0,
                z: -1 * originY * yRatio
            }

        }

        return <WrappedComponent 
            models = { models }
            addModel = { addModel }
            { ...ownProps }
        />
    }

    //We apply the project state HOC
    let WithProjectState = withProjectState(With2DRenderer);
    //We return the decorated component
    return WithProjectState;
}


export default with2DRenderer;