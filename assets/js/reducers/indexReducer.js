import { combineReducers } from "redux"
import activityReducer from "./activityReducer"
import filterReducer from "./filterReducer"

const allReducers = combineReducers({
    activity: activityReducer,
    filterActive: filterReducer
});

export default allReducers
