/**
 * Created by ingrskar on 3/7/2017.
 */
import { applyMiddleware, createStore } from "redux"

// import logger from "redux-logger"
// import thunk from "redux-thunk"
// import promise from "redux-promise-middleware"

import reducer from "./reducers/indexReducer"

const middleware = applyMiddleware(promise(), thunk, logger());

export default createStore(reducer);
