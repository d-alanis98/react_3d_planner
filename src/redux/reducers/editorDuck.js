/**
 * @author Damián Alanís Ramírez
 * @version 2.3.1
 */


//CONSTANTS
//Action types
const SET_EDITOR_TYPE   = 'SET_EDITOR_TYPE';
const SET_EDITOR_DEPTH  = 'SET_EDITOR_DEPTH';
const SET_EDITOR_WIDTH  = 'SET_EDITOR_WIDTH';
const SET_EDITOR_HEIGHT = 'SET_EDITOR_HEIGHT';
//Others
export const BIDIMENSIONAL_EDITOR = 'BIDIMENSIONAL_EDITOR';
export const TRIDIMENSIONAL_EDITOR = 'TRIDIMENSIONAL_EDITOR';
//Initial state
const initialState = {
    editorType: TRIDIMENSIONAL_EDITOR,
    editorWidth: 0,
    editorHeight: 0,
    editorDepth: 0,
}

//REDUCER
const reducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch(type){
        case SET_EDITOR_TYPE:
            return {
                ...state,
                editorType: payload,
            };
        case SET_EDITOR_DEPTH:
            return {
                ...state,
                editorDepth: payload,
            };
        case SET_EDITOR_WIDTH:
            return {
                ...state,
                editorWidth: payload,
            };
        case SET_EDITOR_HEIGHT:
            return {
                ...state,
                editorHeight: payload,
            };
        default:
            return state;
    }
}

export default reducer;

//ACTIONS
/**
 * This method sets editor´s type. The available options are 2D or 3D.
 * @param {string} editorType 
 */
export let setEditorTypeAction = editorType => (dispatch, getState) => {
    dispatch({
        type: SET_EDITOR_TYPE,
        payload: editorType,
    });
}

export let setEditorDepthAction = depth => (dispatch, getState) => {
    dispatch({
        type: SET_EDITOR_DEPTH,
        payload: depth,
    });
}

/**
 * This method sets editor´s width. It must be a number representing the width in meters (assuming natural scale).
 * @param {number} width 
 */
export let setEditorWidthAction = width => (dispatch, getState) => {
    dispatch({
        type: SET_EDITOR_WIDTH,
        payload: width,
    });
}

/**
 * This method sets editor´s height. It must be a number representing the height in meters (assuming natural scale).
 * @param {number} height 
 */
export let setEditorHeightAction = height => (dispatch, getState) => {
    dispatch({
        type: SET_EDITOR_HEIGHT,
        payload: height,
    });
}