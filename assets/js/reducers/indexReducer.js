import { combineReducers } from "redux"
import activityReducer from "./activityReducer"

const allReducers = combineReducers({
    activity: activityReducer
});

export default allReducers
