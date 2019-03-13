import { createStore, combineReducers, compose } from 'redux';

import Reducers from './reducers/reducer'

const rootReducer = combineReducers({mainStore: Reducers});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configure = () => {
    return createStore(rootReducer, composeEnhancers())
}

export default configure;