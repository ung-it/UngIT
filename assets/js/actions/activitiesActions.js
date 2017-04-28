import { getAllActivities, getAllAttendingActivities, getAllHostingActivities, getAllProHosting, getFacebookEventData} from "../APIFunctions";

// ACTION TYPES
export const FETCHED_ALL_ACTIVITIES = 'FETCH_ALL_ACTIVITIES';
export const FETCHED_FACEBOOK_EVENT_DATA = 'FETCHED_FACEBOOK_EVENT_DATA';
export const FETCHED_ALL_ATTENDING_ACTIVITIES = 'FETCH_ALL_ATTENDING_ACTIVITIES';
export const FETCHED_ALL_HOSTING_ACTIVITIES = 'FETCH_ALL_HOSTING_ACTIVITIES';
export const FETCHED_ALL_PROVIDER_HOSTING_ACTIVITIES = 'FETCH_ALL_PROVIDER_HOSTING_ACTIVITIES';
export const ADD_ACTIVITY_FILTER = 'ADD_ACTIVITY_FILTER';
export const ADD_SUITED_FOR_FILTER = 'ADD_SUITED_FOR_FILTER';
export const ADD_WEEK_FILTER = 'ADD_WEEK_FILTER';
export const ADD_SEARCH_FOR_FILTER = 'ADD_SEARCH_FOR_FILTER';
export const TRASH_BUTTON_CLICKED = 'TRASH_BUTTON_CLICKED';
export const SUITED_FOR_BUTTON_CLICKED = 'SUITED_FOR_BUTTON_CLICKED';
export const ACTIVITY_BUTTON_CLICKED = 'ACTIVITY_BUTTON_CLICKED';

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

export function fetchAllProHostingActivities() {
    return (dispatch) => {
        getAllProHosting()
            .then(result =>  dispatch(fetchedAllProHostingActivites(result)))
            .catch(error => console.error(error));
    };
}

export function fetchedAllHostingActivites(hostingActivities) {
    return {
        type: FETCHED_ALL_HOSTING_ACTIVITIES,
        hostingActivities,
    }
}
export function fetchedAllProHostingActivites(proHostingActivities) {
    return {
        type: FETCHED_ALL_PROVIDER_HOSTING_ACTIVITIES,
        proHostingActivities,
    }
}
