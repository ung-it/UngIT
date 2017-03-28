import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from "react-redux";

import { fetchAllProviders } from "../actions/providersActions";
import configureStore from "../configureStore";
const store = configureStore();

class AllProvidersContainer extends Component {

    componentDidMount() {
        this.props.fetchActivities();
    }


    render() {
        return (
            <div>
                <h1>Sigve was here, Christina as well</h1>
                {this.props.providers}
            </div>


        )
    }
}




const mapStateToProps = state => {
    let { provider: { providerList } } = state; // Make activityList and activeActivityFilters from state become variables


    // providerList = providerList.sort((a, b) => new Date(a.fields.date) > new Date(b.fields.date)); // Sort descending based on date


//     const hasActivityFilter = activeActivityFilters.length > 0; // Make boolean telling whether or not an active filter is present
//     const activityFilters = activeActivityFilters.split(',').map(a => parseInt(a)); // Convert activeActivityFilters into a list of int, to be able to check against activityType from the server
//
//     const hasSuitedForFilter = activeSuitedForFilters.length > 0;
//     const suitedForFilters = activeSuitedForFilters.split(',').map(a => parseInt(a));
//
//     const hasWeekFilter = activeDateFilter.length > 0;
//     const weekFilters = activeDateFilter.split(',').map(a => new Date(a));
//
//     //console.log(activeDateFilter);
//     //console.log(new Date(weekFilters[0]));
//     //console.log(new Date(weekFilters[1]));
//
//     const hasSearchForFilter = activeSearchForFilters.length > 0;
//     const searchForFilter = activeSearchForFilters.toUpperCase();
//
//     activityList = hasActivityFilter
//         ? activityList.filter(activity => activityFilters.includes(activity.fields.activityType))
//         : activityList;
//
//     activityList = hasSuitedForFilter
//         ? activityList.filter(activity => suitedForFilters.includes(activity.fields.suitedForType))
//         : activityList;
//
//     /*activityList = hasWeekFilter
//         ? activityList.filter(activity =>
//         (
//             ((new Date (activity.fields.date).getYear() >= weekFilters[0].getYear() && new Date (activity.fields.date).getMonth() >= weekFilters[0].getMonth() && new Date (activity.fields.date).getDay() >= weekFilters[0].getDay()) &&
//             (new Date (activity.fields.date).getYear() <= weekFilters[1].getYear() && new Date (activity.fields.date).getMonth() <= weekFilters[1].getMonth() && new Date (activity.fields.date).getDay() <= weekFilters[1].getDay())) ||
//             (weekFilters[0].getYear() >= new Date (activity.fields.date).getYear()  && weekFilters[0].getMonth() >= new Date (activity.fields.date).getMonth() && weekFilters[0].getDay() >= new Date (activity.fields.date).getDay()) &&
//             (weekFilters[0].getYear() <= new Date (activity.fields.date_end).getYear()  && weekFilters[0].getMonth() <= new Date (activity.fields.date_end).getMonth() && weekFilters[0].getDay() <= new Date (activity.fields.date_end).getDay())
//         ))
//         : activityList;
// */
//     activityList = hasSearchForFilter
//         ? activityList.filter(activity => (activity.fields.activityName.toUpperCase().includes(searchForFilter) || activity.fields.provider.toUpperCase().includes(searchForFilter)))
//         : activityList;

    return {
        providers: providerList,
        // activeActivityFilters: activeActivityFilters,
        // activeSuitedForFilters: activeSuitedForFilters,
        // activeDateFilter: activeDateFilter,
        // activeSearchForFilters: activeSearchForFilters,
    };
};









const mapDispatchToProps = dispatch => {
    return {
        fetchActivities: () => dispatch(fetchAllProviders()),
        // changeActivityFilter: (filter) => dispatch(addActivityFilter(filter)),
        // changeSuitedForFilter: (suitedFilter) => dispatch(addSuitedForFilter(suitedFilter)),
        // changeWeekFilter: (weekFilter) => dispatch(addWeekFilter(weekFilter)),
        // changeSearchForFilter: (searchFilter) => dispatch(addSearchForFilter(searchFilter)),
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
