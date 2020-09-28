import React, { useState, useEffect, Fragment } from 'react';
//Components
import BidimensionalContextMenu from '../../../Editor/2D/ContextMenu/BidimensionalContextMenu';
//HOC
import withProjectState from '../../../../redux/HOC/withProjectState';
import withEditorState from '../../../../redux/HOC/withEditorState';
//Classes
import BidimensionalRenderer from '../../../../classes/Renderers/BidimensionalRenderer';
import TridimensionalRenderer from '../../../../classes/Renderers/TridimensionalRenderer';
import CoordinatesTransformation from '../../../../classes/Coordinates/CoordinatesTransformation';
import BidimensionalModelRotation from '../../../../classes/2D/Models/BidimensionalModelRotation';
import BidimensionalSceneHelper from '../../../../classes/2D/BidimensionalSceneHelper';
import BidimensionalModelLayerManager from '../../../../classes/2D/Models/BidimensionalModelLayerManager';

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
            editorState: { editorDepth, editorWidth, editorHeight },
            updateObject, 
            removeObject, 
            set2DRoomDimensions,
            set2DSceneDimensions, 
            ...ownProps 
        } = props;
        //Project
        const { 
            scene: projectScene,
            objects: projectObjects, 
        } = project;
        //Project scene
        const bidimensionalScene = projectScene[BIDIMENSIONAL];
        //Editor view (needed to get the context of the plane and the models)
        const { view: editorView } = bidimensionalScene;
        //HOOKS
        //State
        const [models, setModels] = useState({});
        const [sceneInstance, setSceneInstance] = useState();
        const [draggedObject, setDraggedObject] = useState();
        const [contextMenuModel, setContextMenuModel] = useState({});
        const [displayContextMenu, setDisplayContextMenu] = useState(false);
        const [contextMenuPosition, setContextMenuPosition] = useState({});
        


        //Effects

        /**
         * On mount and on every view type change (top or front view), we initialize the scene with the data from project state.
         */
        useEffect(() => {
            initialize();
        }, [editorView]);


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
            const { coordinates: existingTridimensionalCoordinates } = tridimensionalEditorState;
            let updatedObject = { 
                ...existingObject,
                [BIDIMENSIONAL]: {
                    uuid: _id,
                    coordinates: { x, y }
                },
                [TRIDIMENSIONAL]: {
                    ...tridimensionalEditorState,
                    coordinates: {
                        ...existingTridimensionalCoordinates, //Actually just y, but is important to preserve the original y
                        ...get3DCoordinates(x, y), //We get the 3D coordinates, because movements in 2D editor take effect on 3D editor too
                    }    
                }
            };
            updateObject(updatedObject);
        }, [draggedObject]);

        const initialize = () => {
            //The editorYAxis is the parameter that is going to be considered the y in canvas, the height (which actually is the depth) or the depth (which actually is the height)
            let editorYAxis = BidimensionalSceneHelper.getYAxis(editorView, editorHeight, editorDepth);
            //We set the scene instance
            let sceneInstance = new BidimensionalRenderer(editorWidth, editorYAxis);
            sceneInstance.init();
            setSceneInstance(sceneInstance);
            //We set the container dimensions
            let { containerWidth, containerHeight } = sceneInstance;
            set2DSceneDimensions(containerWidth, containerHeight);
            //We set the room dimensions 
            const { width: roomWidth, height: roomHeight } = sceneInstance.getRoomDimensionInPixels();
            set2DRoomDimensions(roomWidth, roomHeight);
            const scene = { 
                ...projectScene,
                [BIDIMENSIONAL]: {
                    ...bidimensionalScene,
                    roomWidth,
                    roomHeight,
                    sceneWidth: containerWidth,
                    sceneHeight: containerHeight,
                }
            }

            /**
             * Returns the 2D coordinates based on the 3D ones as the only source of truth
             * @param {object} model 
             */
            const get2DCoordinatesFrom3DState = model => {
                const { coordinates: tridimensionalCoordinates } = model[TRIDIMENSIONAL];
                const { x, y, z } = tridimensionalCoordinates;
                let roomHeight = editorDepth;
                return new CoordinatesTransformation(scene, x, y, z).tridimensionalToBidimensionalCoordinates(editorView, roomHeight);
            }

            /**
             * This method restores the existing objects in the plane
             */
            const restoreModels = () => {
                //We retrieve the existing models in state
                let modelsCopy = { ...models };
                //We get the objects array ordered in a suitable way to get the correct "layers" according to the view
                const projectObjectsByLayer = BidimensionalModelLayerManager.getModelsArrayOrderedByLayers(projectObjects, editorView);
                //We iterate over the existing models and create the 2d model
                projectObjectsByLayer.forEach(model => {
                    //We get the type and the coordinates (of the 2d key)
                    const { type, rotation, productLine } = model;
                    //We get the coordinates from the calculation of them based on the existing 3d coordinates
                    let coordinates = get2DCoordinatesFrom3DState(model);
                    //We update the model quantity
                    modelsCopy[type] ? modelsCopy[type].quantity++ : modelsCopy[type] = { quantity: 1 };
                    //We create the SVG model
                    sceneInstance.loadSVGModel(
                        type,
                        productLine,
                        coordinates,
                        rotation,
                        editorView,
                        createdModel => { //onSuccess callback
                            let { _id, attrs: { x, y } } = createdModel;
                            const { id, name } = model;
                            let modelWithUpdatedId = {
                                ...model,
                                name: name || `Modelo ${ id }`,
                                [BIDIMENSIONAL]: {
                                    uuid: _id,
                                    coordinates: { x, y }
                                },
                            };
                            updateObject(modelWithUpdatedId) //updateCallback
                        },
                        updateModel, //onUpdate
                        onSelectedModel, //onSelection
                    );
                });
                setModels(modelsCopy);
            }
            restoreModels();
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

        const handleModelRotation = (model, degrees) => {
            let { _id: modelId } = model;
            let rotatingModel = sceneInstance.objects.find(object => object._id === modelId);
            BidimensionalModelRotation.rotate(rotatingModel, degrees, sceneInstance);
            let modelInState = findObjectBy2DModelId(modelId);
            //We retrieve the existing rotation in state to add it to the new one
            let { rotation } = modelInState;
            let updatedObject = { 
                ...modelInState,
                rotation: degrees + rotation || 0,
            };
            updateObject(updatedObject);
        }


        const handleModelDeletion = model => {
            let { _id: modelId } = model;
            if(!window.confirm('Está seguro de querer eliminar este modelo?'))
                return;
            let modelToDelete = sceneInstance.objects.find(object => object._id === modelId);
            modelToDelete.destroy();
            let modelInState = findObjectBy2DModelId(modelId);
            removeObject(modelInState);
        }

        const onSelectedModel = event => {
            const { evt: { x, y }, currentTarget: model } = event;
            setContextMenuModel(model);
            setDisplayContextMenu(true);
            setContextMenuPosition({ x, y });
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
            //The height of the room in a 3D plane is actually what we called editorDepth, and we keep that name to avoid bugs that may appear in the renaming process
            let roomHeight = editorDepth;
            return coordinatesTransformation.bidimensionalToTridimensionalCoordinates(editorView, roomHeight);
        }

        return (
            <Fragment>
                <WrappedComponent 
                    models = { models }
                    { ...ownProps }
                />
                <BidimensionalContextMenu 
                    model = { contextMenuModel }
                    handleModelDeletion = { handleModelDeletion }
                    handleModelRotation = { handleModelRotation }
                    displayContextMenu = { displayContextMenu }
                    contextMenuPositionInX = { contextMenuPosition.x }
                    contextMenuPositionInY = { contextMenuPosition.y }
                />
            </Fragment>
        );
    }

    //We apply the project state HOC
    let WithProjectState = withProjectState(With2DRenderer);
    //We apply the editor state decorator
    let WithEditorState = withEditorState(WithProjectState);
    //We return the decorated component
    return WithEditorState;
}


export default with2DRenderer;