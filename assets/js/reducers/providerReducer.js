import * as actionTypes from '../actions/providersActions';

const moment = require('moment');

const initialState = {
    providerList: [],
    activeActivityFilters: '',
    activeSuitedForFilters: '',
    activeSearchForFilters: '',
    activeButtonClicked: false,
};

export default function ProviderReducer(state=initialState, action) {

    switch (action.type) {
        case actionTypes.FETCHED_ALL_PROVIDERS:
             return {
                 ...state,
                 providerList: action.providers
             };
        case actionTypes.ADD_SEARCH_FOR_FILTER:
            return {
                ...state,
                activeSearchForFilters: action.searchFilter,
            };
        default: return state;

    }
}
