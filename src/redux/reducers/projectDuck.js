/**
 * @author Damián Alanís Ramírez
 * @version 3.3.5
 */
//Actions
import { createNotificationAction, NOTIFICATION_SUCCESS, NOTIFICATION_TIME_MD, NOTIFICATION_DANGER } from './notificationDuck';
import { setEditorWidthAction, setEditorHeightAction, setEditorDepthAction } from './editorDuck';
//Classes
import Requests from '../../classes/Helpers/Requests';
import ProjectConfiguration from '../../classes/ProjectConfiguration';
import BidimensionalRenderer from '../../classes/Renderers/BidimensionalRenderer';
import TridimensionalRenderer from '../../classes/Renderers/TridimensionalRenderer';
//Constants
import { TOP } from '../../constants/models/models';

//CONSTANTS
//Action types
const SET_PROJECT                   = 'SET_PROJECT';
const SET_PROJECT_NAME              = 'SET_PROJECT_NAME';
const SET_PROJECT_TYPE              = 'SET_PROJECT_TYPE';
const SET_PROJECT_SCENE             = 'SET_PROJECT_SCENE';
const SET_PROJECT_OBJECTS           = 'SET_PROJECT_OBJECTS';
const SET_PROJECT_DESCRIPTION       = 'SET_PROJECT_DESCRIPTION';
const SET_DISPLAY_MODELS_MENU       = 'SET_DISPLAY_MODELS_MENU';
const SET_PROJECT_TO_PDF_ITEMS      = 'SET_PROJECT_TO_PDF_ITEMS';
const SET_PROJECT_TO_PDF_PAGES      = 'SET_PROJECT_TO_PDF_PAGES';
const SET_EXPORTING_PROJECT_TO_PDF  = 'SET_EXPORTING_PROJECT_TO_PDF';
//Initial state
const initialScene = {
    [BidimensionalRenderer.BIDIMENSIONAL_SCENE]: {
        view: TOP,
    },
    [TridimensionalRenderer.TRIDIMENSIONAL_SCENE]: {}
}

const initialState = {
    name: '',
    type: ProjectConfiguration.CLOSET_PROJECT,
    scene: initialScene,
    objects: [],
    description: '',
    displayModelsMenu: false,
    projectToPDFItems: [],
    projectToPDFPages: [],
    exportingProjectToPDF: false,
}
//Others
const PROJECT_ID              = 'PROJECT_ID';
const BASE_ENDPOINT           = `${process.env.MIX_APP_API_ENDPOINT}/disenhios3D`;
const PROJECT_SAVED_MESSAGE   = 'Progreso guardado';
export const PROJECT_PROGRESS = 'PROJECT_PROGRESS';

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
        case SET_PROJECT_TO_PDF_ITEMS:
            return {
                ...state,
                projectToPDFItems: payload,
            };
        case SET_PROJECT_TO_PDF_PAGES:
            return {
                ...state,
                projectToPDFPages: payload,
            };
        case SET_EXPORTING_PROJECT_TO_PDF:
            return {
                ...state,
                exportingProjectToPDF: payload,
            }
        default:
            return state;
    }
}

export default reducer;

//Helpers
/**
 * Success callback for the saveProjectAction request method
 * @param {object} createdDesign 
 */
const saveProgressSuccess = (createdDesign) => {
    //Create notification with successMessage
    const { id_disenhio: designId } = createdDesign;
    localStorage.setItem(PROJECT_ID, designId.toString());
    
}


/**
 * Error callback for the saveProjectAction request method
 * @param {number} errorCode 
 * @param {string} errorMessage 
 */
const saveProgressError = (errorCode, errorMessage) => {
    //Create notification with errorMessage
    console.log(`[${errorCode}]: ${errorMessage}`)
}

/**
 * Success callback for the saveProgressInDatabaseAction
 * @param {string} data 
 * @param {function} dispatch 
 * @param {function} getState 
 */
const saveProgressInDatabaseSuccess = (data, dispatch, getState) => {
    createNotificationAction(PROJECT_SAVED_MESSAGE, NOTIFICATION_SUCCESS, NOTIFICATION_TIME_MD)(dispatch, getState);
}

/**
 * Error callback for the saveProgressInDatabaseAction
 * @param {number} errorCode 
 * @param {string} errorMessage 
 * @param {function} dispatch 
 * @param {function} getState 
 */
const saveProgressInDatabaseError = (errorCode, errorMessage, dispatch, getState) => {
    createNotificationAction(`[${errorCode}]: ${errorMessage}`, NOTIFICATION_SUCCESS, NOTIFICATION_TIME_MD)(dispatch, getState);
}

/**
 * Success callback for the restoreProjectAction, it parses the serialized data and sets the project and editor parameters
 * that are necessary to restore a project.
 * @param {string} serializedProjectData 
 * @param {function} dispatch 
 * @param {function} getState 
 */
const restoreProjectSuccess = (serializedProjectData, dispatch, getState) => {
    //We transform the serialized project data to an object
    let projectData = JSON.parse(serializedProjectData);
    //We get the data from the object
    let { 
        editor: { editorDepth, editorWidth, editorHeight }, 
        project,
    } = projectData;
    //Project
    setProjectAction(project)(dispatch, getState);
    //Editor
    setEditorDepthAction(editorDepth)(dispatch, getState);
    setEditorWidthAction(editorWidth)(dispatch, getState);
    setEditorHeightAction(editorHeight)(dispatch, getState);
    createNotificationAction('Proyecto restaurado con éxito desde el servidor', NOTIFICATION_SUCCESS, NOTIFICATION_TIME_MD)(dispatch, getState);
} 

/**
 * Error callback for the restoreProjectAction.
 * @param {number} errorCode 
 * @param {string} errorMessage 
 * @param {function} dispatch 
 * @param {function} getState 
 */
const restoreProjectError = (errorCode, errorMessage, dispatch, getState) => {
    createNotificationAction(`[${errorCode}]: ${errorMessage}`, NOTIFICATION_DANGER, NOTIFICATION_TIME_MD)(dispatch, getState);
}

/**
 * Gets the existing project design id from the local storage
 * @todo this will later come from a data attribute in the root div container, with the id of the project
 */
const getExistingProjectId = () => localStorage.getItem(PROJECT_ID);


/**
 * Converts the required parameters from project state to form data type.
 * @param {function} getState 
 */
const getProjectStateAsFormData = (getState) => {
    //We get the required parameters from state
    let { 
        editor: { editorDepth, editorWidth, editorHeight },
        family: { family: { id_familiaProducto } },
        project: { name, description },
    } = { ...getState() };
    //We prepare them in an object
    let data = {
        alto: editorDepth * 100,
        ancho: editorWidth * 100,
        fondo: editorHeight * 100,
        nombre: name,
        descripcion: description,
        id_familiaProducto,
    }
    //We create and return the form data using the formDataFromObject method of the Requests class
    return Requests.getFormDataFromObject(data);
}

/**
 * This function gets the endpoint of the save progress request based on the existance or inexistance of the projectProgressId
 * @todo get from root div dataset and not from local storage
 */
const getSaveProgressEndpoint = () => {
    let endpoint = `${BASE_ENDPOINT}/`;
    let projectProgressId = getExistingProjectId();
    //Endpoint based on the existance of project id (if it doesn´t exist a new design is created, if it exists the id is used to update the data of the existing design)
    return endpoint += projectProgressId ? projectProgressId : 'new';
}

/**
 * This function returns the necessary headers for the save progress request
 * @param {object} formData 
 */
const getSaveProgressHeaders = formData => ({
    method: 'POST',
    body: formData
});

/**
 * Returns an object with the necessary data from the state to reconstruct the project at any time.
 * @param {function} getState 
 */
const getProgressDataFromState = getState => {
    const { 
        editor, 
        project, 
    } = { ...getState() };
    return {
        editor, 
        project: {
            ...project,
            displayModelsMenu: false //By default we hide the models menu
        }
    }
}

//ACTIONS

/**
 * This action sets the whole project object
 * @param {object} project 
 */
export let setProjectAction = project => (dispatch, getState) => {
    const { project: existingProjectState } = { ...getState() };
    let projectState = { 
        ...existingProjectState,
        ...project
    };
    dispatch({
        type: SET_PROJECT,
        payload: projectState
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
    let projectProgressId = getExistingProjectId();
    if(!projectProgressId)
        return;
    //The endpoint to load the existing project
    let endpoint = `${BASE_ENDPOINT}/${projectProgressId}/load`;
    const callbackArguments = [dispatch, getState];
    //We make the request
    Requests.makeRequest(
        endpoint,
        { },
        restoreProjectSuccess,
        restoreProjectError,
        ...callbackArguments
    );
}


/**
 * This action saves the project's progress data in the database.
 */
const saveProgressDataInDatabaseAction = () => (dispatch, getState) => {
    let projectProgressId = getExistingProjectId();
    if(!projectProgressId)
        return;
    let endpoint = `${BASE_ENDPOINT}/${projectProgressId}/save`;
    let formData = Requests.getFormDataFromObject({ 
        data: JSON.stringify(getProgressDataFromState(getState))
    });
    let headers = getSaveProgressHeaders(formData);
    const callbackArguments = [dispatch, getState];
    Requests.makeRequest(
        endpoint,
        headers,
        saveProgressInDatabaseSuccess,
        saveProgressInDatabaseError,
        ...callbackArguments
    );
}


export let saveProjectAction = () => (dispatch, getState) => {
    //SAVE IN SERVER
    //Endpoint and headers for the request
    let endpoint = getSaveProgressEndpoint();
    let formData = getProjectStateAsFormData(getState);
    let headers = getSaveProgressHeaders(formData);
    //We make the request
    Requests.makeRequest(
        endpoint, 
        headers, 
        saveProgressSuccess, 
        saveProgressError
    );
    saveProgressDataInDatabaseAction()(dispatch, getState);
}

export let setDisplayModelsMenuAction = displayModelsMenu => (dispatch, getState) => {
    dispatch({
        type: SET_DISPLAY_MODELS_MENU,
        payload: displayModelsMenu,
    });
}


export let startProjectPDFExportAction = () => (dispatch, getState) => {
    dispatch({
        type: SET_EXPORTING_PROJECT_TO_PDF,
        payload: true
    });
}

export let stopProjectPDFExportAction = () => (dispatch, getState) => {
    dispatch({
        type: SET_EXPORTING_PROJECT_TO_PDF,
        payload: false
    });
}

export let setProjectToPDFItemsAction = items => (dispatch, getState) => {
    dispatch({
        type: SET_PROJECT_TO_PDF_ITEMS,
        payload: items
    });
}

export let addItemToPDFAction = item => (dispatch, getState) => {
    const { projectToPDFItems: existingItems } = { ...getState().project };
    
    let updatedItems = existingItems.concat(item);
    setProjectToPDFItemsAction(updatedItems)(dispatch, getState);
}

export let removeItemFromPDFAction = itemToRemove => (dispatch, getState) => {
    const { projectToPDFItems: existingItems } = { ...getState().project };

    let updatedItems = existingItems.filter(item => item.id !== itemToRemove.id);
    setProjectToPDFItemsAction(updatedItems)(dispatch, getState);
}

export let setProjectPDFPagesAction = pages => (dispatch, getState) => {
    dispatch({
        type: SET_PROJECT_TO_PDF_PAGES,
        payload: pages,
    });
}