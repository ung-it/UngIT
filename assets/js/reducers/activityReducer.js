import * as actionTypes from '../actions/activitiesActions';
/*
* A reducer is just a little pice of data that we want to return
* It gets notified from all Action creators when they are fired, with the action type
* Thus, the reducer can listen for action type, and if it's something the reducer wants to handle and return some
* data. It can do so.
* */

var moment = require('moment');

const initialState = {
    attendingActivityList: [],
    activityList: [],
    activeActivityFilters: '',
    activeSuitedForFilters: '',
    activeDateFilter: moment().format('DD/MM/YYYY') + ' - ' + moment().add(29, 'days').format('DD/MM/YYYY'),
    activeSearchForFilters: '',
    activeButtonClicked: false,

}


export default function ActivityReducer(state=initialState, action) {
    switch (action.type) {
        case actionTypes.FETCHED_ALL_ATTENDING_ACTIVITIES:
            return {
                ...state,
                attendingActivityList: action.attendingActivities,
            };
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
        case actionTypes.ADD_SUITED_FOR_FILTER:
            return {
                ...state,
                activeSuitedForFilters: action.suitedFilter,
            };
        case actionTypes.ADD_WEEK_FILTER:
            return {
                ...state,
                activeDateFilter: action.weekFilter,
            }
        case actionTypes.ADD_SEARCH_FOR_FILTER:
            return {
                ...state,
                activeSearchForFilters: action.searchFilter,
            }
        case actionTypes.TRASH_BUTTON_CLICKED:
            return {
                ...state,
                activeActivityFilters: '',
                activeSuitedForFilters: '',
                activeDateFilter: moment().format('DD/MM/YYYY') + ' - ' + moment().add(29, 'days').format('DD/MM/YYYY'),
                activeSearchForFilters: '',
                activeButtonClicked: false,
            }
        default:
            return state;
    }
}

// use the api function to get all data from the db, and save in activities array
// so that we do not need to query for each request.
