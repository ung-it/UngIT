import { combineReducers } from "redux";
import activityReducer from "./activityReducer";
import providerReducer from "./providerReducer";

const allReducers = combineReducers({
    activity: activityReducer,
    provider: providerReducer,
});

export default allReducers
