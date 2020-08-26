/**
 * @author Damián Alanís Ramírez
 * @version 1.1.0
 */
import Requests from '../../classes/Helpers/Requests';
import ProjectConfiguration from '../../classes/ProjectConfiguration';

//CONSTANTS
//Action types
const GET_FAMILY           = 'GET_FAMILY';
const GET_FAMILY_ERROR     = 'GET_FAMILY_ERROR';
const GET_FAMILY_SUCCESS   = 'GET_FAMILY_SUCCESS';
//Others
const BASE_ENDPOINT         = `${process.env.REACT_APP_API_ENDPOINT}/familias`;
//Initial state
const initialState = {
    family: {},
    fetching: true,
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
        case GET_FAMILY_SUCCESS:
            return {
                ...state,
                family: payload,
                fetching: false,
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



//ACTIONS

/**
 * This action gets family from the designed endpoint using the requests facade
 */
export let getFamilyAction = () => (dispatch, getState) => {
    let { project: { type } } = { ...getState() };
    let familyId = (type === ProjectConfiguration.KITCHEN_PROJECT) ? 3 : 1;
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