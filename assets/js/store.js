import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducers from "./reducers/indexReducer";
import { getAllActivitiesAsArrayForReducer } from "./APIFunctions";
import { setActivityPickerFilter } from "./actions/filterActions";


//const middleware = applyMiddleware(promise());


function getActivitiesFromDB(){
    let tempArray =[];
    getAllActivitiesAsArrayForReducer(data => {
        data.map((activity) => {
            let act = activity.fields;
            act['id'] = activity.pk;
            let images = act.images.split(",").filter(image => {
                return image != "";
            }).map(image => {
                return "/media/" + image;
            });
            images = images.concat(act.instagram.split(",").filter(image => {
                return image != "";
            }));


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
                images: images,
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

function getActiveFilters() {


};

function getActivityPicker() {
    /*activityPicker.filter((active) => {
        console.log(active);
    })*/
    console.log("get activity picker");

    let activeActtivites = [];

}

const initState = getActivitiesFromDB();

// const activeActivityPicker = getActivityPicker();

const store = createStore(
    allReducers,
    initState,
    applyMiddleware(thunk)
);

// store.dispatch(setActivityPickerFilter(''));

export default store;
