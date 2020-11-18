/**
 * @author Damian Alanis Ramirez
 * @version 1.0.0
 */

import Requests from "../../classes/Helpers/Requests";

//CONSTANTS
//Action types
const GET_TEXTURES         = 'GET_TEXTURES';
const GET_TEXTURES_ERROR   = 'GET_TEXTURES_ERROR';
const GET_TEXTURES_SUCCESS = 'GET_TEXTURES_SUCCESS';
//Initial state
const initialState = {
    textures: [],
    fetching: false,
};

//REDUCER
const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case GET_TEXTURES:
            return {
                ...state,
                fetching: true,
            };
        case GET_TEXTURES_ERROR:
            return {
                ...state,
                error: payload,
            };
        case GET_TEXTURES_SUCCESS:
            return {
                ...state,
                textures: payload,
            };
        default:
            return state;
    }
}

export default reducer;

//Helpers
let getTexturesSuccess = (textures, dispatch) => {
    dispatch({
        type: GET_TEXTURES_SUCCESS,
        payload: textures,
    });
}

let getTexturesError = (errorCode, errorMessage, dispatch) => {
    dispatch({
        type: GET_TEXTURES_ERROR,
        payload: errorMessage,
    });
}

//ACTIONS

export let getTexturesAction = () => (dispatch, getState) => {
    dispatch({
        type: GET_TEXTURES
    });
    let endpoint = `${process.env.MIX_APP_API_ENDPOINT}/colors?hd=1`;
    let callbackArguments = [dispatch];
    Requests.makeRequest(endpoint, {}, getTexturesSuccess, getTexturesError, ...callbackArguments);
}