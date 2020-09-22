/**
 * @author Damián Alanís Ramírez
 * @version 2.1.0
 */

//Dependencies
import WallFactory from '../../classes/3D/Walls/WallFactory';

//CONSTANTS
//Action types
const SET_WALLS_COLOR               = 'SET_WALLS_COLOR';
const SET_PLANE_TEXTURE             = 'SET_PLANE_TEXTURE';
const SET_DISPLAY_PLANE_SETTINGS    = 'SET_DISPLAY_PLANE_SETTINGS';
//Initial state
const initialState = {
    wallsColor: WallFactory.DEFAULT_COLOR,
    planeTexture: 5,
    displayPlaneSettings: false,
}

//REDUCER
const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case SET_WALLS_COLOR:
            return {
                ...state,
                wallsColor: payload,
            };
        case SET_PLANE_TEXTURE:
            return {
                ...state,
                planeTexture: payload
            };
        case SET_DISPLAY_PLANE_SETTINGS:
            return {
                ...state,
                displayPlaneSettings: payload,
            };
        default:
            return state;
    }
}

export default reducer;

//ACTIONS
/**
 * Action to set the current wall color.
 * @param {string|number} color 
 */
export let setWallsColorAction = color => (dispatch, getState) => {
    dispatch({
        type: SET_WALLS_COLOR,
        payload: color,
    });
}

/**
 * Action to set the current texture applied to the plane.
 * @param {number|string} textureId 
 */
export let setPlaneTextureAction = textureId => (dispatch, getState) => {
    dispatch({
        type: SET_PLANE_TEXTURE,
        payload: textureId,
    });
}

/**
 * Action to set the state of the display setting flag, if true, the plane settings 
 * menu will be displayed, else it will be hidden.
 * @param {bool} displayPlaneSettings 
 */
export let setDisplayPlaneSettingsAction = displayPlaneSettings => (dispatch, getState) => {
    dispatch({
        type: SET_DISPLAY_PLANE_SETTINGS,
        payload: displayPlaneSettings,
    });
}

/**
 * Action that takes the walls color and plane texture retrieved from the restore
 * session action. 
 * @param {object} state 
 */
export let setPlaneStateAction = ({ wallsColor, planeTexture }) => (dispatch, getState) => {
    setWallsColorAction(wallsColor)(dispatch, getState);
    setPlaneTextureAction(planeTexture)(dispatch, getState);
}