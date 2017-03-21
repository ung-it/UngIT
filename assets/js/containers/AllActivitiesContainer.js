import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { connect } from "react-redux";

import ActivityFilters from '../components/ActivityFilters';
import ActivitiesList from '../components/ActivtiesList'
import { fetchAllActivities, addActivityFilter, addSuitedForFilter, addWeekFilter } from '../actions/activitiesActions';
import configureStore from "../configureStore";

import '../../styles/activityBox.css';

const store = configureStore();

class AllActivitiesContainer extends Component {

    componentDidMount() {
        this.props.fetchActivities();
    }

    render() {
        return (
            <div>
                <ActivityFilters
                    onActivityFilterChange={this.props.changeActivityFilter}
                    activityFilters={this.props.activeActivityFilters}
                    onSuitedForFilterChange={this.props.changeSuitedForFilter}
                    suitedForFilters={this.props.activeSuitedForFilters}
                    onWeekPickerChange={this.props.changeWeekFilter}
                    weekFilters={this.props.activeDateFilter}
                />
                <ActivitiesList activities={this.props.activities} />
            </div>
        );
    }

}

const mapStateToProps = state => {
    let { activity: { activityList, activeActivityFilters, activeSuitedForFilters, activeDateFilter } } = state; // Make activityList and activeActivityFilters from state become variables

    activityList = activityList.sort((a, b) => new Date(a.fields.date) > new Date(b.fields.date)); // Sort descending based on date


    const hasActivityFilter = activeActivityFilters.length > 0; // Make boolean telling whether or not an active filter is present
    const activityFilters = activeActivityFilters.split(',').map(a => parseInt(a)); // Convert activeActivityFilters into a list of int, to be able to check against activityType from the server

    const hasSuitedForFilter = activeSuitedForFilters.length > 0;
    const suitedForFilters = activeSuitedForFilters.split(',').map(a => parseInt(a));

    //const hasWeekFilter = activeWeekFilters;
    //const weekFilters = activeWeekFilters.split(',').map(a => parseInt(a));
    console.log(activeDateFilter);


    activityList = hasActivityFilter
        ? activityList.filter(activity => activityFilters.includes(activity.fields.activityType))
        : activityList;

    activityList = hasSuitedForFilter
        ? activityList.filter(activity => suitedForFilters.includes(activity.fields.suitedForType))
        : activityList;

    return {
        activities: activityList,
        activeActivityFilters: activeActivityFilters,
        activeSuitedForFilters: activeSuitedForFilters,
        activeDateFilter: activeDateFilter,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchActivities: () => dispatch(fetchAllActivities()),
        changeActivityFilter: (filter) => dispatch(addActivityFilter(filter)),
        changeSuitedForFilter: (suitedFilter) => dispatch(addSuitedForFilter(suitedFilter)),
        changeWeekFilter: (weekFilter) => dispatch(addWeekFilter(weekFilter)),
    }
}

AllActivitiesContainer = connect(mapStateToProps, mapDispatchToProps)(AllActivitiesContainer);

// Fetch initial data for to the state
store.dispatch(fetchAllActivities());

ReactDOM.render(
    <Provider store={store}>
        <AllActivitiesContainer />
    </Provider>,
    document.getElementById('allActivities')
);

