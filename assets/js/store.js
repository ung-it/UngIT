/**
 * Created by ingrskar on 3/7/2017.
 */
import { applyMiddleware, createStore } from "redux"

// import logger from "redux-logger"
// import thunk from "redux-thunk"
// import promise from "redux-promise-middleware"

import allReducers from "./reducers/indexReducer"

//const middleware = applyMiddleware(promise());

console.log('store');
const store = createStore(allReducers);

export default store;
