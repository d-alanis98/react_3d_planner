/**
 * @author Damián Alanís Ramírez
 * @version 2.1.0
 */
import Requests from '../../classes/Helpers/Requests';
import ProjectConfiguration from '../../classes/ProjectConfiguration';

//CONSTANTS
//Action types
const GET_FAMILY                = 'GET_FAMILY';
const GET_FAMILY_ERROR          = 'GET_FAMILY_ERROR';
const GET_MISC_OBJECTS          = 'GET_MISC_OBJECTS';
const GET_FAMILY_SUCCESS        = 'GET_FAMILY_SUCCESS';
const GET_MISC_OBJECTS_ERROR    = 'GET_MISC_OBJECTS_ERROR';
const GET_MISC_OBJECTS_SUCCESS  = 'GET_MISC_OBJECTS_SUCCESS';
//Others
const BASE_ENDPOINT         = `${process.env.MIX_APP_API_ENDPOINT}/familias`;
//Initial state
const initialState = {
    family: {},
    fetching: false,
    otherObjects: [],
    fetchingOtherObjects: false,
}

//REDUCER
const reducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch(type){
        case GET_FAMILY:
            return {
                ...state,
                fetching: true,
            };
        case GET_FAMILY_ERROR:
            return {
                ...state,
                error: payload,
                fetching: false,
            };
        case GET_MISC_OBJECTS: 
            return {
                ...state,
                fetchingOtherObjects: true,
            }
        case GET_FAMILY_SUCCESS:
            return {
                ...state,
                family: payload,
                fetching: false,
            };
        case GET_MISC_OBJECTS_ERROR:
            return {
                ...state,
                error: payload,
                fetchingOtherObjects: false,
            };
        case GET_MISC_OBJECTS_SUCCESS:
            return {
                ...state,
                otherObjects: payload,
                fetchingOtherObjects: false,
            };
        default:
            return state;
    }
}

export default reducer;

//Helpers
/**
 * Success callback for getFamilyAction
 * @param {array} data 
 * @param {function} dispatch 
 */
const getFamilySuccess = (data, dispatch) => {
    dispatch({
        type: GET_FAMILY_SUCCESS,
        payload: data,
    });
}

/**
 * Error callback for getFamilyAction
 * @param {number} errorCode 
 * @param {string} errorMessage 
 * @param {function} dispatch 
 */
const getFamilyError = (errorCode, errorMessage, dispatch) => {
    dispatch({ 
        type: GET_FAMILY_ERROR,
        payload: errorMessage,
    });
}

/**
 * Success callback for getMiscObjectsAction
 * @param {array} otherObjects 
 * @param {function} dispatch 
 */
const getMiscObjectsSuccess = (otherObjects, dispatch) => {
    dispatch({
        type: GET_MISC_OBJECTS_SUCCESS,
        payload: otherObjects,
    });
}

/**
 * Error callback for getMiscObjectsAction
 * @param {number} errorCode 
 * @param {string} errorMessage 
 * @param {function} dispatch 
 */
const getMiscObjectsError = (errorCode, errorMessage, dispatch) => {
    dispatch({
        type: GET_MISC_OBJECTS_ERROR,
        payload: errorMessage,
    });
}



//ACTIONS

/**
 * This action gets family from the designed endpoint using the requests facade
 */
export let getFamilyAction = () => (dispatch, getState) => {
    let { project: { type } } = { ...getState() };
    let familyId = ProjectConfiguration.getFamilyIdByProjectType(type);
    let endpoint = `${BASE_ENDPOINT}/${familyId}`
    //We pass dispatch as callback argument to be able to use this method in the callbacks
    let callbackArguments = [dispatch];
    //We dispatch the action to enable the fetching state
    dispatch({
        type: GET_FAMILY,
    });
    //We make the request using the requests facade
    Requests.makeRequest(endpoint, {},  getFamilySuccess, getFamilyError, ...callbackArguments);
}


export let getMiscObjectsAction = () => (dispatch, getState) => {
    let endpoint = `${process.env.MIX_APP_API_ENDPOINT}/3d_editor/extras`
    //We pass dispatch as callback argument to be able to use this method in the callbacks
    let callbackArguments = [dispatch];
    //We dispatch the action to enable the fetching state
    dispatch({
        type: GET_MISC_OBJECTS,
    });
    //We make the request using the requests facade
    Requests.makeRequest(endpoint, {},  getMiscObjectsSuccess, getMiscObjectsError, ...callbackArguments);
}