import {  getActivityInfo, getAllActivities, getAllAttendingActivities, getAllHostingActivities, getFacebookEventData} from "../APIFunctions";
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
export const FETCHED_FACEBOOK_EVENT_DATA = 'FETCHED_FACEBOOK_EVENT_DATA';
export const FETCHED_ALL_ATTENDING_ACTIVITIES = 'FETCH_ALL_ATTENDING_ACTIVITIES';
export const FETCHED_ALL_HOSTING_ACTIVITIES = 'FETCH_ALL_HOSTING_ACTIVITIES';
export const ADD_ACTIVITY_FILTER = 'ADD_ACTIVITY_FILTER';
export const ADD_SUITED_FOR_FILTER = 'ADD_SUITED_FOR_FILTER';
export const ADD_WEEK_FILTER = 'ADD_WEEK_FILTER';
export const ADD_SEARCH_FOR_FILTER = 'ADD_SEARCH_FOR_FILTER';
export const TRASH_BUTTON_CLICKED = 'TRASH_BUTTON_CLICKED';
export const SUITED_FOR_BUTTON_CLICKED = 'SUITED_FOR_BUTTON_CLICKED';
export const ACTIVITY_BUTTON_CLICKED = 'ACTIVITY_BUTTON_CLICKED';


// more actions types here


// ACTION CREATORS
export function fetchedAllActivites(activities) {
    return {
        type: FETCHED_ALL_ACTIVITIES,
        activities,
    }
}

export function fetchedFacebookEventData(facebookData) {
    return {
        type: FETCHED_FACEBOOK_EVENT_DATA,
        facebookData,
    }
}

export function fetchedAllAttendingActivites(attendingActivities) {
    return {
        type: FETCHED_ALL_ATTENDING_ACTIVITIES,
        attendingActivities,
    }
}

export function addActivityFilter(filter) {
    return {
        type: ADD_ACTIVITY_FILTER,
        filter,
    }
}

export function activityButtonClicked() {
    return {
        type: ACTIVITY_BUTTON_CLICKED,
    }
}

export function addSuitedForFilter(suitedFilter) {
    return {
        type: ADD_SUITED_FOR_FILTER,
        suitedFilter,
    }
}

export function suitedForButtonClicked() {
    return {
        type: SUITED_FOR_BUTTON_CLICKED,
    }
}

export function addWeekFilter(weekFilter) {
    return {
        type: ADD_WEEK_FILTER,
        weekFilter,
    }
}

export function addSearchForFilter(searchFilter) {
    return {
        type: ADD_SEARCH_FOR_FILTER,
        searchFilter,
    }
}

export function trashButtonClicked() {
    return {
        type: TRASH_BUTTON_CLICKED,
    }
}

export function fetchAllActivities() {
    return (dispatch) => {
        return getAllActivities()
            .then(result => dispatch(fetchedAllActivites(result)))
            .catch(error => console.error(error));
    };
}

export function fetchFacebookEventData(activities) {
    return (dispatch) => {
        getFacebookEventData(activities)
            .then(result => dispatch(fetchedFacebookEventData(result)))
            .catch(error => console.log(error));
    }
}

export function fetchAllAttendingActivities() {
    return (dispatch) => {
        getAllAttendingActivities()
            .then(result => dispatch(fetchedAllAttendingActivites(result)))
            .catch(error => console.error(error));
    };
}


export function fetchAllHostingActivities() {
    return (dispatch) => {
        getAllHostingActivities()
            .then(result => dispatch(fetchedAllHostingActivites(result)))
            .catch(error => console.error(error));
    };
}

export function fetchedAllHostingActivites(hostingActivities) {
    return {
        type: FETCHED_ALL_HOSTING_ACTIVITIES,
        hostingActivities,
    }
}
