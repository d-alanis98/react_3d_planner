/**
 * @author Damián Alanís Ramírez
 * @version 1.3.2
 */
//Classes
import Requests from '../../classes/Helpers/Requests';
import ProjectConfiguration from '../../classes/ProjectConfiguration';
import { createNotificationAction, NOTIFICATION_SUCCESS, NOTIFICATION_TIME_MD } from './notificationDuck';
import { setEditorWidthAction, setEditorHeightAction } from './editorDuck';

//CONSTANTS
//Action types
const SET_PROJECT               = 'SET_PROJECT';
const SET_PROJECT_NAME          = 'SET_PROJECT_NAME';
const SET_PROJECT_TYPE          = 'SET_PROJECT_TYPE';
const SET_PROJECT_SCENE         = 'SET_PROJECT_SCENE';
const SET_PROJECT_OBJECTS       = 'SET_PROJECT_OBJECTS';
const SET_PROJECT_DESCRIPTION   = 'SET_PROJECT_DESCRIPTION';
const SET_DISPLAY_MODELS_MENU   = 'SET_DISPLAY_MODELS_MENU';
//Initial state
const initialState = {
    name: '',
    type: ProjectConfiguration.CLOSET_PROJECT,
    scene: {},
    objects: [],
    description: '',
    displayModelsMenu: false,
}
//Others
export const PROJECT_PROGRESS      = 'PROJECT_PROGRESS';
const BASE_ENDPOINT         = '/save_project_progress';

//REDUCER
const reducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch(type){
        case SET_PROJECT:
            return {
                ...payload
            };
        case SET_PROJECT_NAME:
            return {
                ...state,
                name: payload,
            };
        case SET_PROJECT_TYPE:
            return {
                ...state,
                type: payload,
            };
        case SET_PROJECT_SCENE:
            return {
                ...state,
                scene: payload,
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
        case SET_DISPLAY_MODELS_MENU:
            return {
                ...state,
                displayModelsMenu: payload,
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

export let setProjectAction = project => (dispatch, getState) => {
    dispatch({
        type: SET_PROJECT,
        payload: project
    });
}
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
 * This action sets the dimensions of the 2d room of the project
 */
export let set2DRoomDimensionsAction = (roomWidth, roomHeight) => (dispatch, getState) => {
    let { scene } = { ...getState().project };
    let bidimensionalSceneParameters = scene['2d'];
    let newBidimensionalSceneParameters = {
        ...bidimensionalSceneParameters,
        roomWidth,
        roomHeight
    };
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
 * This action sets the type of the project
 */
export let setProjectTypeAction = projectVersion => (dispatch, getState) => {
    dispatch({ 
        type: SET_PROJECT_TYPE,
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
 * @param {string|object} serializedProject 
 */
export let restoreProjectAction = (serializedProject = null) => (dispatch, getState) => {
    let existingProject = serializedProject || localStorage.getItem(PROJECT_PROGRESS);
    if(!existingProject)
        return;
    //We transform the project data to an object if it comes serialized
    if(typeof(existingProject) === 'string')
        existingProject = JSON.parse(existingProject);
    //We get the data from the object
    let { 
        editor: { editorWidth, editorHeight }, 
        project,
    } = existingProject;
    //Project
    setProjectAction(project)(dispatch, getState);
    //Editor
    setEditorWidthAction(editorWidth)(dispatch, getState);
    setEditorHeightAction(editorHeight)(dispatch, getState);
}

export let saveProjectAction = () => (dispatch, getState) => {
    let { editor, project } = { ...getState() };
    const projectProgress = {
        editor, 
        project
    }

    let projectProgressSerialized = JSON.stringify(projectProgress);
    localStorage.setItem(PROJECT_PROGRESS, projectProgressSerialized);
    createNotificationAction('Progreso guardado', NOTIFICATION_SUCCESS, NOTIFICATION_TIME_MD)(dispatch, getState);
    /*
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
    */
}

export let setDisplayModelsMenuAction = displayModelsMenu => (dispatch, getState) => {
    dispatch({
        type: SET_DISPLAY_MODELS_MENU,
        payload: displayModelsMenu,
    });
}