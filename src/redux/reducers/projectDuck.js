/**
 * @author Damián Alanís Ramírez
 * @version 1.2.1
 */

import Requests from "../../classes/Helpers/Requests";

//CONSTANTS
//Action types
const SET_PROJECT_NAME          = 'SET_PROJECT_NAME';
const SET_PROJECT_SCENE         = 'SET_PROJECT_SCENE';
const SET_PROJECT_VERSION       = 'SET_PROJECT_VERSION';
const SET_PROJECT_OBJECTS       = 'SET_PROJECT_OBJECTS';
const SET_PROJECT_DESCRIPTION   = 'SET_PROJECT_DESCRIPTION';
//Initial state
const initialState = {
    name: '',
    scene: {},
    version: '',
    objects: [],
    description: '',
}
//Others
const BASE_ENDPOINT         = '/save_project_progress';

//REDUCER
const reducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch(type){
        case SET_PROJECT_NAME:
            return {
                ...state,
                name: payload,
            };
        case SET_PROJECT_SCENE:
            return {
                ...state,
                scene: payload,
            };
        case SET_PROJECT_VERSION:
            return {
                ...state,
                version: payload,
            };
        case SET_PROJECT_OBJECTS:
            return {
                ...state,
                objects: payload,
            };
        case SET_PROJECT_DESCRIPTION:
            return {
                ...state,
                description: payload,
            };
        default:
            return state;
    }
}

export default reducer;

//Helpers
const saveProgressSuccess = successMessage => {
    //Create notification with successMessage
    console.log(successMessage)
    
}

const saveProgressError = (errorCode, errorMessage) => {
    //Create notification with errorMessage
    console.log(`[${errorCode}]: ${errorMessage}`)
}

//ACTIONS
/**
 * This action sets the name of the project
 */
export let setProjectNameAction = projectName => (dispatch, getState) => {
    dispatch({
        type: SET_PROJECT_NAME,
        payload: projectName,
    });
}

/**
 * This action sets the scene of the project
 */
export let setProjectSceneAction = projectScene => (dispatch, getState) => {
    dispatch({
        type: SET_PROJECT_SCENE,
        payload: projectScene,
    });
}

/**
 * This action sets the dimensions of the 3d scene of the project
 */
export let set3DSceneDimensionsAction = (sceneWidth, sceneHeight) => (dispatch, getState) => {
    let { scene } = { ...getState().project };
    let tridimensionalSceneParameters = scene['3d'];
    let newTridimensionalSceneParameters = {
        ...tridimensionalSceneParameters,
        sceneWidth,
        sceneHeight
    };
    let projectSceneParameters = {
        ...scene,
        '3d': newTridimensionalSceneParameters
    };
    dispatch({
        type: SET_PROJECT_SCENE,
        payload: projectSceneParameters,
    });
}

/**
 * This action sets the dimensions of the 2d scene of the project
 */
export let set2DSceneDimensionsAction = (sceneWidth, sceneHeight) => (dispatch, getState) => {
    let { scene } = { ...getState().project };
    let bidimensionalSceneParameters = scene['2d'];
    let newBidimensionalSceneParameters = {
        ...bidimensionalSceneParameters,
        sceneWidth,
        sceneHeight
    }
    let projectSceneParameters = {
        ...scene,
        '2d': newBidimensionalSceneParameters
    };
    dispatch({
        type: SET_PROJECT_SCENE,
        payload: projectSceneParameters,
    });
}

/**
 * This action sets the version of the project
 */
export let setProjectVersionAction = projectVersion => (dispatch, getState) => {
    dispatch({ 
        type: SET_PROJECT_VERSION,
        payload: projectVersion,
    })
}

/**
 * This action sets project´s objects
 */
export let setProjectObjectsAction = projectObjects => (dispatch, getState) => {
    dispatch({
        type: SET_PROJECT_OBJECTS,
        payload: projectObjects,
    });
}

/**
 * This action sets project´s description
 */
export let setProjectDescriptionAction = projectDescription => (dispatch, getState) => {
    dispatch({
        type: SET_PROJECT_DESCRIPTION,
        payload: projectDescription,
    });
}

/**
 * This action adds a new object to the objects array
 */
export let addObjectToProjectAction = objectToAdd => (dispatch, getState) => {
    let { objects } = { ...getState().project };
    let newProjectObjects = objects.concat(objectToAdd);
    setProjectObjectsAction(newProjectObjects)(dispatch, getState);
}

/**
 * This action updates the project objects by replacing the given updated object in the existing objects array
 * @param {object} updatedObject 
 */
export let updateProjectObjectAction = updatedObject => (dispatch, getState) => {
    let { objects } = { ...getState().project };
    //We update the objects by replacing the updatedObject in the existing objects array
    let updatedObjects = objects.map(object => {
        if(object.id === updatedObject.id)
            return updatedObject;
        return object;
    });
    setProjectObjectsAction(updatedObjects)(dispatch, getState);
}

/**
 * This action removes a new object from the objects array
 */
export let removeObjectFromProjectAction = objectToRemove => (dispatch, getState) => {
    let { objects } = { ...getState().project };
    let newProjectObjects = objects.filter(object => object.id != objectToRemove.id);
    setProjectObjectsAction(newProjectObjects)(dispatch, getState);
}

/**
 * This action restores the project state based on the received project store (which may come serialized in JSON string)
 * @param {string|object} existingProject 
 */
export let restoreProjectAction = existingProject => (dispatch, getState) => {
    //We transform the project data to an object if it comes serialized
    if(typeof(existingProject) === 'string')
        existingProject = JSON.parse(existingProject);
    //We get the data from the object
    let { projectData } = existingProject;
    //We get the project properties
    let { name, version, objects } = projectData;
    setProjectNameAction(name)(dispatch, getState);
    setProjectVersionAction(version)(dispatch, getState);
    setProjectObjectsAction(objects)(dispatch, getState);
}

export let saveProjectAction = () => (dispatch, getState) => {
    let { project } = { ...getState() };
    let headers = {
        method: 'POST',
        body: project
    }
    Requests.makeRequest(
        BASE_ENDPOINT, 
        headers, 
        saveProgressSuccess, 
        saveProgressError
    );
}