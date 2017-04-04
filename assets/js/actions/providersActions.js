import { getAllProviders } from '../APIFunctions';



// ACTION TYPES
export const FETCHED_ALL_PROVIDERS = 'FETCH_ALL_PROVIDERS';
export const ADD_SEARCH_FOR_FILTER = 'ADD_SEARCH_FOR_FILTER';
export const ADD_ACTIVITY_FILTER = 'ADD_ACTIVITY_FILTER';
export const TRASH_BUTTON_CLICKED = 'TRASH_BUTTON_CLICKED';
export const ACTIVITY_BUTTON_CLICKED = 'ACTIVITY_BUTTON_CLICKED';




// ACTION CREATORS
export function fetchedAllProviders(providers) {
    return {
        type: FETCHED_ALL_PROVIDERS,
        providers,
    }
}

export function addSearchForFilter(searchFilter) {
    return {
        type: ADD_SEARCH_FOR_FILTER,
        searchFilter,
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

export function trashButtonClicked() {
    return {
        type: TRASH_BUTTON_CLICKED,
    }
}


// HELPING METHODS
export function fetchAllProviders() {
    return (dispatch) => {
        getAllProviders()
            .then(result => dispatch(fetchedAllProviders(result.map(p => (JSON.parse(p.fields.aktordatabase))))))
            .catch(error => console.log(error));
    }
}
