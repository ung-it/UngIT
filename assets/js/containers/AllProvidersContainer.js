import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from "react-redux";

import "../../styles/activityBox.css";

import {fetchAllProviders, addSearchForFilter, addActivityFilter, trashButtonClicked} from "../actions/providersActions";
import ProvidersList from '../components/ProvidersList';
import ProviderFilters from '../components/ProviderFilters';
import configureStore from "../configureStore";
const store = configureStore();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class AllProvidersContainer extends Component {

    componentDidMount() {
        this.props.fetchProviders();
    }


    render() {
        return (
            <div>
                <ProviderFilters
                    onSearchForChange={this.props.changeSearchForFilter}
                    searchForFilters={this.props.activeSearchForFilters}
                    onActivityFilterChange={this.props.changeActivityFilter}
                    activityFilters={this.props.activeActivityFilters}
                    onButtonChange={this.props.changeTrashButton}
                />
                <ProvidersList providers={this.props.providers}/>
            </div>


        )
    }
}


const mapStateToProps = state => {
    let {provider: {providerList, activeSearchForFilters, activeActivityFilters}} = state; // Make activityList and activeActivityFilters from state become variables

    const hasActivityFilter = activeActivityFilters.length > 0; // Make boolean telling whether or not an active filter is present
    const activityFilters = activeActivityFilters.split(','); // Convert activeActivityFilters into a list of int, to be able to check against activityType from the server


    const hasSearchForFilter = activeSearchForFilters.length > 0;
    const searchForFilter = activeSearchForFilters.toUpperCase();

    providerList = hasActivityFilter
        ? providerList.filter(provider => activityFilters.includes(provider.TypeAktivitet))
        : providerList;

    providerList = hasSearchForFilter
        ? providerList.filter(provider => (provider.Navn.includes(searchForFilter)))
        : providerList;

    return {
        providers: providerList,
        activeActivityFilters: activeActivityFilters,
        activeSearchForFilters: activeSearchForFilters,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProviders: () => dispatch(fetchAllProviders()),
        changeActivityFilter: (filter) => dispatch(addActivityFilter(filter)),
        changeSearchForFilter: (searchFilter) => dispatch(addSearchForFilter(searchFilter)),
        changeTrashButton: () => dispatch(trashButtonClicked()),

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
