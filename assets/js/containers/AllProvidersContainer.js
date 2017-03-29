import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from "react-redux";

import "../../styles/activityBox.css";

import { fetchAllProviders, addSearchForFilter, addActivityFilter } from "../actions/providersActions";
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
                    searchForFilters={this.props.activeSearchForFilters}
                    onActivityFilterChange={this.props.changeActivityFilter}
                    activityFilters={this.props.activeActivityFilters}
                />
                <ProvidersList providers={this.props.providers} />
            </div>


        )
    }
}




const mapStateToProps = state => {
    let { provider: { providerList, activeSearchForFilters, activeActivityFilters } } = state; // Make activityList and activeActivityFilters from state become variables

    //console.log(providerList)
    //console.log(providerList);

     const hasActivityFilter = activeActivityFilters.length > 0; // Make boolean telling whether or not an active filter is present
     const activityFilters = activeActivityFilters.split(',').map(a => parseInt(a)); // Convert activeActivityFilters into a list of int, to be able to check against activityType from the server
//
//     const hasSuitedForFilter = activeSuitedForFilters.length > 0;
//     const suitedForFilters = activeSuitedForFilters.split(',').map(a => parseInt(a));
//

//
     const hasSearchForFilter = activeSearchForFilters.length > 0;
     const searchForFilter = activeSearchForFilters.toUpperCase();
//
     providerList = hasActivityFilter
         ? providerList.filter(provider => activityFilters.includes(provider["Type aktivitet "]))
         : providerList;
//
//     activityList = hasSuitedForFilter
//         ? activityList.filter(activity => suitedForFilters.includes(activity.fields.suitedForType))
//         : activityList;
//

    providerList = hasSearchForFilter
        ? providerList.filter(provider => (provider.Navn.includes(searchForFilter)))
        : providerList;

    return {
        providers: providerList,
        activeActivityFilters: activeActivityFilters,
        // activeSuitedForFilters: activeSuitedForFilters,
        activeSearchForFilters: activeSearchForFilters,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProviders: () => dispatch(fetchAllProviders()),
        changeActivityFilter: (filter) => dispatch(addActivityFilter(filter)),
        // changeSuitedForFilter: (suitedFilter) => dispatch(addSuitedForFilter(suitedFilter)),
        // changeWeekFilter: (weekFilter) => dispatch(addWeekFilter(weekFilter)),
        changeSearchForFilter: (searchFilter) => dispatch(addSearchForFilter(searchFilter)),
        // changeTrashButton: () => dispatch(trashButtonClicked()),

    }
};


AllProvidersContainer = connect(mapStateToProps, mapDispatchToProps)(AllProvidersContainer);
// Fetch initial data for to the state
store.dispatch(fetchAllProviders());




ReactDOM.render(
    <Provider store={store}>
        <AllProvidersContainer />
    </Provider>,
    document.getElementById('allProviders')
);
