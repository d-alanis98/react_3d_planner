/**
 * @author Damián Alanís Ramírez
 * @version 1.1.0
 */
import Requests from '../../classes/Helpers/Requests';
import ProjectConfiguration from '../../classes/ProjectConfiguration';

//CONSTANTS
//Action types
const GET_OBJECTS           = 'GET_OBJECTS';
const GET_OBJECTS_ERROR     = 'GET_OBJECTS_ERROR';
const GET_OBJECTS_SUCCESS   = 'GET_OBJECTS_SUCCESS';
//Others
const BASE_ENDPOINT         = `${process.env.REACT_APP_API_ENDPOINT}/familias`;
//Initial state
const initialState = {
    objects: [],
    fetching: false,
}

//REDUCER
const reducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch(type){
        case GET_OBJECTS:
            return {
                ...state,
                fetching: true,
            };
        case GET_OBJECTS_ERROR:
            return {
                ...state,
                error: payload,
                fetching: false,
            };
        case GET_OBJECTS_SUCCESS:
            return {
                ...state,
                objects: payload,
                fetching: false,
            };
        default:
            return state;
    }
}

export default reducer;

//Helpers
/**
 * Success callback for getObjectsAction
 * @param {array} data 
 * @param {function} dispatch 
 */
const getObjectsSuccess = (data, dispatch) => {
    dispatch({
        type: GET_OBJECTS_SUCCESS,
        payload: data,
    });
}

/**
 * Error callback for getObjectsAction
 * @param {number} errorCode 
 * @param {string} errorMessage 
 * @param {function} dispatch 
 */
const getObjectsError = (errorCode, errorMessage, dispatch) => {
    dispatch({ 
        type: GET_OBJECTS_ERROR,
        payload: errorMessage,
    });
}



//ACTIONS

/**
 * This action gets objects from the designed endpoint using the requests facade
 */
export let getObjectsAction = () => (dispatch, getState) => {
    let { project: { type } } = { ...getState() };
    console.log({ type })
    let familyId = (type === ProjectConfiguration.KITCHEN_PROJECT) ? 3 : 1;
    let endpoint = `${BASE_ENDPOINT}/${familyId}`
    //We pass dispatch as callback argument to be able to use this method in the callbacks
    let callbackArguments = [dispatch];
    //We dispatch the action to enable the fetching state
    dispatch({
        type: GET_OBJECTS,
    });
    //We make the request using the requests facade
    Requests.makeRequest(endpoint, {},  getObjectsSuccess, getObjectsError, ...callbackArguments);
}