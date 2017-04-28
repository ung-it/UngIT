import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./reducers/indexReducer";

export default function configureStore() {

    const middleware = [
        thunk,
    ];

    const store = createStore(
        rootReducer,
        {},
        compose(
            applyMiddleware(...middleware),
            (process.env.NODE_ENV === 'development' && window.devToolsExtension) ? window.devToolsExtension() : f => f,
        )
    );

    return store;
};
