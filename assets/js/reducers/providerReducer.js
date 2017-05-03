import * as actionTypes from '../actions/providersActions';

const moment = require('moment');

const initialState = {
    providerList: [],
    activeActivityFilters: [],
    activeSuitedForFilters: [],
    activeSearchForFilters: '',
    activeButtonClicked: false,
};

export default function ProviderReducer(state = initialState, action) {
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
        case actionTypes.TRASH_BUTTON_CLICKED:
            return {
                ...state,
                activeActivityFilters: [],
                activeSuitedForFilters: [],
                activeSearchForFilters: '',
                activeButtonClicked: false,
            };
        case actionTypes.ACTIVITY_BUTTON_CLICKED:
            return {
                ...state,
                activeActivityFilters: [],
            };
        case actionTypes.SUITED_FOR_BUTTON_CLICKED:
            return {
                ...state,
                activeSuitedForFilters: [],
            };
        default:
            return state;
    }
}
