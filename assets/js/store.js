/**
 * Created by ingrskar on 3/7/2017.
 */
import { applyMiddleware, createStore } from "redux"

// import logger from "redux-logger"
// import thunk from "redux-thunk"
// import promise from "redux-promise-middleware"

import allReducers from "./reducers/indexReducer"

import {getAllActivitiesAsArrayForReducer} from "./APIFunctions";


//const middleware = applyMiddleware(promise());


function getActivitiesFromDB(){
    let tempArray =[];
    getAllActivitiesAsArrayForReducer().then((body) =>{
        body.map((activity) => {
            let act = activity.fields;
            act['id'] = activity.pk;
            console.log(act);
            let obj = {
                id: act.id,
                activityName: act.activityName,
                provider: act.provider,
                adaptions: act.adaptions,
                age: act.age,
                location: act.location,
                description: act.description,
                price: act.price,
                date: new Date(act.date),
                time_start: act.time_start.substring(0,act.time_start.lastIndexOf(":")),
                time_end: act.time_end.substring(0,act.time_end.lastIndexOf(":")),
                images: act.images,
                videos: act.videos,
            };

            tempArray.push(obj);
        });
    });

    const state = {
        activity: tempArray
    };

    return state

}

const initState = getActivitiesFromDB();



const store = createStore(
    allReducers,
    initState
);

export default store;
