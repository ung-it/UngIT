import * as actionTypes from '../actions/providersActions';

const moment = require('moment');

const initialState = {
    providerList: [],
    activeActivityFilters: '',
    activeSuitedForFilters: '',
    activeDateFilter: moment().format('DD/MM/YYYY') + ' - ' + moment().add(29, 'days').format('DD/MM/YYYY'),
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
        default: return state;

    }
}
