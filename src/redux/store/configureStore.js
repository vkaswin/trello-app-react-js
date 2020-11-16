import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk';

import rootReducer from '../reducer/index'

export default function configureStore(initialState){
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer,
        initialState,
        composeEnhancer(applyMiddleware(thunk, reduxImmutableStateInvariant()))
    )
}