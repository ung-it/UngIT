import { getAllProviders } from '../APIFunctions';



// ACTION TYPES
export const FETCHED_ALL_PROVIDERS = 'FETCH_ALL_PROVIDERS';


// ACTION CREATORS
export function fetchedAllProviders(providers) {
    return {
        type: FETCHED_ALL_PROVIDERS,
        providers,
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
