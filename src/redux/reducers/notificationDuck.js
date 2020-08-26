/**
 * @author Damián Alanís Ramírez
 * @version 1.0.0
 */

//CONSTANTS
//Notification types
export const NOTIFICATION_DANGER    = 'danger';
export const NOTIFICATION_SUCCESS   = 'success'
export const NOTIFICATION_WARNING   = 'warning';
//Notification times
export const NOTIFICATION_TIME_SM   = 1000;
export const NOTIFICATION_TIME_MD   = 3000;
export const NOTIFICATION_TIME_LG   = 5000;
//Action types
const NEW_NOTIFICATION = 'NEW_NOTIFICATION';
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
//iNITIAL STATE
const initialState = {
    notificationData: {
        message: '',
        type: '',
    },
    display: false,
};

//REDUCER
const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type){
        case NEW_NOTIFICATION:
            return {
                ...state,
                notificationData: payload,
                display: true,
            };
        case HIDE_NOTIFICATION:
            return {
                ...state,
                notificationData: payload,
                display: false,
            };
        default:
            return state;
    }
}

export default reducer;

//ACTIONS
/**
 * This action creates displays a new notification of the desired type with the specified message during the specified number of miliseconds.
 * @param {string} message 
 * @param {string} type 
 * @param {number} duration 
 */
export let createNotificationAction = (message, type, duration = 0) => (dispatch, getState) => {
    //We display the notification
    dispatch({
        type: NEW_NOTIFICATION,
        payload: {
            message,
            type,
        }
    });
    //Ocultamos la notificacion
    duration > 0 && setTimeout(() => {
        dispatch({
            type: HIDE_NOTIFICATION,
            payload: {
                message: '',
                type: ''
            }
        })
    }, duration);
}