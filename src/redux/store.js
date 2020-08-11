import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//Reducers
import editorReducer from './reducers/editorDuck';
import projectReducer from './reducers/projectDuck';
import objectsReducer from './reducers/objectsDuck';

let rootReducer = combineReducers({
    editor: editorReducer,
    project: projectReducer,
    objects: objectsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const generateStore = () => {
    let store = createStore(
        rootReducer, 
        composeEnhancers(applyMiddleware(thunk))
    );
    //Restore project action
    return store;
}

export default generateStore;