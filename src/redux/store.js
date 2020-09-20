import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//Reducers
import planeReducer from './reducers/planeDuck';
import editorReducer from './reducers/editorDuck';
import familyReducer from './reducers/familyDuck';
import projectReducer, { restoreProjectAction } from './reducers/projectDuck';
import texturesReducer, { getTexturesAction } from './reducers/texturesDuck';
import notificationReducer from './reducers/notificationDuck';

let rootReducer = combineReducers({
    plane: planeReducer,
    editor: editorReducer,
    family: familyReducer,
    project: projectReducer,
    textures: texturesReducer,
    notification: notificationReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ 
        trace: true, 
        traceLimit: 25 
    }) || compose;


const generateStore = () => {
    let store = createStore(
        rootReducer, 
        composeEnhancers(applyMiddleware(thunk))
    );
    //Restore project action
    restoreProjectAction()(store.dispatch, store.getState);
    getTexturesAction()(store.dispatch, store.getState);
    return store;
}

const store = generateStore();

export default store;