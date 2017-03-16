import * as actionTypes from '../actions/activitiesActions';
/*
* A reducer is just a little pice of data that we want to return
* It gets notified from all Action creators when they are fired, with the action type
* Thus, the reducer can listen for action type, and if it's something the reducer wants to handle and return some
* data. It can do so.
* */

const initialState = {
    activityList: [],
    activeActivityFilters: '',
    activeSuitedForFilters: '',
    activeDateFilter: '',
    searchText: '',
}


export default function ActivityReducer(state=initialState, action) {
    switch (action.type) {
        case actionTypes.FETCHED_ALL_ACTIVITIES:
            return {
                ...state,
                activityList: action.activities,
            };
        case actionTypes.ADD_ACTIVITY_FILTER:
            return {
                ...state,
                activeActivityFilters: action.filter,
            };
        default:
            return state;
    }
}

// use the api function to get all data from the db, and save in activities array
// so that we do not need to query for each request.
