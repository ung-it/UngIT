import { getAllProviders } from '../APIFunctions';



// ACTION TYPES
export const FETCHED_ALL_PROVIDERS = 'FETCH_ALL_PROVIDERS';
export const ADD_SEARCH_FOR_FILTER = 'ADD_SEARCH_FOR_FILTER';


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



// HELPING METHODS
export function fetchAllProviders() {
    return (dispatch) => {
        getAllProviders()
            .then(result => dispatch(fetchedAllProviders(result)))
            .catch(error => console.log(error));
    }
}
