/**
 * Created by ingrskar on 3/7/2017.
 */
import { combineReducers } from "redux"
import activityReducer from "./activityReducer"

const allReducers = combineReducers({
    activity: activityReducer
});

console.log("reducer");

export default allReducers
