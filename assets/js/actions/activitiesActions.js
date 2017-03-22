import {  getActivityInfo, getAllActivities, getAllAttendingActivities, getAllHostingActivities} from "../APIFunctions";
/*
* Action creator and action are two separate things, the action creator is the actual action-function
*
* the action is actually the part that gets returned, and consist only of two things, type and payload.
* type: just a string that explains what action happend, EVERY reducer gets notified with this type when an action
* occurs.
*
* payload: any informasion or extra / new  data needed to perform the action
*
* Action creator and action is just a function that is something you can do on your application,
* like submitting a form, clicking a button, adding a user, etc.
* If that action is to change some state or database or reducer ( something in the store ) we need actions because
* they are used to change the application state
*
* To use an Action, you need to import it in the file where you want to use it, then hook it up, through a onClick, etc.
* But to hook it up, you cant just use it like a import function, then you buypass Redux, NOT cool. So -->
* we need to connect the Action to the containar / component through the connect function and another function called
*   matchDispatchToProps(dispatch) <-- Pass in the action as a prop (this.prop)
*   connect(matchDispatchToProps)(className) <-- Make the pass to the class/container/component
*
* Dispatch means/is just a fancy way of saying 'call a function'
*
* */

// ACTION TYPES
export const FETCHED_ALL_ACTIVITIES = 'FETCH_ALL_ACTIVITIES';
export const FETCHED_ALL_ATTENDING_ACTIVITIES = 'FETCH_ALL_ATTENDING_ACTIVITIES';
export const FETCHED_ALL_HOSTING_ACTIVITIES = 'FETCH_ALL_HOSTING_ACTIVITIES';
export const ADD_ACTIVITY_FILTER = 'ADD_ACTIVITY_FILTER';
export const ADD_SUITED_FOR_FILTER = 'ADD_SUITED_FOR_FILTER';
// more actions types here


// ACTION CREATORS
export function fetchedAllActivites(activities) {
    return {
        type: FETCHED_ALL_ACTIVITIES,
        activities,
    }
}

export function addActivityFilter(filter) {
    return {
        type: ADD_ACTIVITY_FILTER,
        filter,
    }
}

export function addSuitedForFilter(suitedFilter) {
    return {
        type: ADD_SUITED_FOR_FILTER,
        suitedFilter,
    }
}

export function fetchAllActivities() {
    return (dispatch) => {
        getAllActivities()
            .then(result => dispatch(fetchedAllActivites(result)))
            .catch(error => console.error(error));
    };
};

export function fetchAllAttendingActivities() {
    return (dispatch) => {
        getAllAttendingActivities()
            .then(result => dispatch(fetchedAllAttendingActivites(result)))
            .catch(error => console.error(error));
    };
};

export function fetchedAllAttendingActivites(attendingActivities) {
    return {
        type: FETCHED_ALL_ATTENDING_ACTIVITIES,
        attendingActivities,
    }
}

export function fetchAllHostingActivities() {
    return (dispatch) => {
        getAllHostingActivities()
            .then(result => dispatch(fetchedAllHostingActivites(result)))
            .catch(error => console.error(error));
    };
};

export function fetchedAllHostingActivites(hostingActivities) {
    return {
        type: FETCHED_ALL_HOSTING_ACTIVITIES,
        hostingActivities,
    }
}
