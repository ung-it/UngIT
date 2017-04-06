import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from "react-redux";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import "../../styles/activityBox.css";

import {fetchAllProviders, addSearchForFilter, addActivityFilter, addSuitedForFilter, trashButtonClicked, activityButtonClicked, suitedForButtonClicked} from "../actions/providersActions";
import ProvidersList from '../components/ProvidersList';
import ProviderFilters from '../components/ProviderFilters';
import configureStore from "../configureStore";
const store = configureStore();

class AllProvidersContainer extends Component {

    componentDidMount() {
        this.props.fetchProviders();
    }


    render() {
        return (
            <div>
                <ProviderFilters
                    onSearchForChange={this.props.changeSearchForFilter}
                    providersForSearch={this.props.providers}
                    searchForFilter={this.props.activeSearchForFilters}
                    onActivityFilterChange={this.props.changeActivityFilter}
                    activityFilters={this.props.activeActivityFilters}
                    activityButton={this.props.changeActivityButton}
                    onButtonChange={this.props.changeTrashButton}

                    onSuitedForFilterChange={this.props.changeSuitedForFilter}
                    suitedForFilters={this.props.activeSuitedForFilters}
                    suitedForButton={this.props.changeSuitedForButton}
                />
                <ProvidersList providers={this.props.providers}/>
            </div>


        )
    }
}


const mapStateToProps = state => {
    let {provider: {providerList, activeSearchForFilters, activeActivityFilters, activeSuitedForFilters}} = state; // Make activityList and activeActivityFilters from state become variables

    const hasActivityFilter = activeActivityFilters.length > 0; // Make boolean telling whether or not an active filter is present
    const activityFilter = activeActivityFilters;

    const hasSearchForFilter = activeSearchForFilters.length > 0;
    const searchForFilter = activeSearchForFilters.toUpperCase();

    const hasSuitedForFilter = activeSuitedForFilters.length > 0;

    providerList = hasActivityFilter
        ? providerList.filter(provider => activityFilter.includes(JSON.parse(provider.fields.aktordatabase).TypeAktivitet))
        : providerList;

    providerList = hasSearchForFilter
        ? providerList.filter(provider => (JSON.parse(provider.fields.aktordatabase).Navn.includes(searchForFilter)))
        : providerList;

    if (hasSuitedForFilter) {
        providerList = [];
    }

    return {
        providers: providerList,
        activeActivityFilters: activeActivityFilters,
        activeSearchForFilters: activeSearchForFilters,
        activeSuitedForFilters: activeSuitedForFilters,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProviders: () => dispatch(fetchAllProviders()),
        changeActivityFilter: (filter) => dispatch(addActivityFilter(filter)),
        changeSearchForFilter: (searchFilter) => dispatch(addSearchForFilter(searchFilter)),
        changeTrashButton: () => dispatch(trashButtonClicked()),
        changeActivityButton: () => dispatch(activityButtonClicked()),
        changeSuitedForButton: () => dispatch(suitedForButtonClicked()),
        changeSuitedForFilter: (suitedFilter) => dispatch(addSuitedForFilter(suitedFilter)),

    }
};

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#3F51B5',
    },
});


AllProvidersContainer = connect(mapStateToProps, mapDispatchToProps)(AllProvidersContainer);
// Fetch initial data for to the state
store.dispatch(fetchAllProviders());


ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <AllProvidersContainer />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('allProviders')
);
