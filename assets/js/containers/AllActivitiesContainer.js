import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { connect } from "react-redux";

import ActivityFilters from '../components/ActivityFilters';
import ActivitiesList from '../components/ActivtiesList'
import { fetchAllActivities, addActivityFilter, addSuitedForFilter, addWeekFilter, addSearchForFilter, trashButtonClicked } from '../actions/activitiesActions';
import configureStore from "../configureStore";

import '../../styles/activityBox.css';

const store = configureStore();

class AllActivitiesContainer extends Component {

    render() {
        return (
            <div>
                <div className="filter-container">
                    <ActivityFilters
                        onActivityFilterChange={this.props.changeActivityFilter}
                        activityFilters={this.props.activeActivityFilters}
                        onSuitedForFilterChange={this.props.changeSuitedForFilter}
                        suitedForFilters={this.props.activeSuitedForFilters}
                        onWeekPickerChange={this.props.changeWeekFilter}
                        weekFilters={this.props.activeDateFilter}
                        onSearchForChange={this.props.changeSearchForFilter}
                        searchForFilters={this.props.activeSearchForFilters}
                        onButtonChange={this.props.changeTrashButton}
                    />
                </div>
                <ActivitiesList activities={this.props.activities}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let { activity: { activityList, activeActivityFilters, activeSuitedForFilters, activeDateFilter, activeSearchForFilters } } = state; // Make activityList and activeActivityFilters from state become variables


    activityList = activityList.sort((a, b) => new Date(a.fields.date) > new Date(b.fields.date)); // Sort descending based on date

    //TODO: Send all suited for filters as props from suitedforpicker
    const availableSuitedFor = ['Tilrettelegging 1', 'Tilrettelegging 2', 'Tilrettelegging 3', 'Tilrettelegging 4', 'Annet'];


    const hasActivityFilter = activeActivityFilters.length > 0; // Make boolean telling whether or not an active filter is present
    const activityFilters = activeActivityFilters.split(','); // Convert activeActivityFilters into a list of int, to be able to check against activityType from the server

    const hasSuitedForFilter = activeSuitedForFilters.length > 0;
    const suitedForFilters = activeSuitedForFilters.split(',');


    const hasWeekFilter = activeDateFilter.length > 0;
    const weekFilters = activeDateFilter.split(',').map(a => new Date(a));


    const hasSearchForFilter = activeSearchForFilters.length > 0;
    const searchForFilter = activeSearchForFilters.toUpperCase();

    activityList = hasActivityFilter
        ? activityList.filter(activity => activityFilters.includes(activity.fields.activityType))
        : activityList;


    activityList = hasSuitedForFilter
        ? activityList.filter(activity =>
            {
               let result = activity.fields.adaptions.split(',').filter(adaption =>
                {
                    return suitedForFilters.indexOf(adaption) != -1
                });

                if (suitedForFilters.indexOf("Annet") != -1) {

                    result = result.concat(activity.fields.adaptions.split(',').filter( adaption => {
                        return availableSuitedFor.indexOf(adaption) == -1
                    }))
                }

            return result.length >= suitedForFilters.length;
            })
        : activityList;

    activityList = hasWeekFilter
        ? activityList.filter(activity =>
        (
            ((new Date (activity.fields.date).getYear() >= weekFilters[0].getYear() && new Date (activity.fields.date).getMonth() >= weekFilters[0].getMonth() && new Date (activity.fields.date).getDay() >= weekFilters[0].getDay()) &&
            (new Date (activity.fields.date).getYear() <= weekFilters[1].getYear() && new Date (activity.fields.date).getMonth() <= weekFilters[1].getMonth() && new Date (activity.fields.date).getDay() <= weekFilters[1].getDay())) ||
            (weekFilters[0].getYear() >= new Date (activity.fields.date).getYear()  && weekFilters[0].getMonth() >= new Date (activity.fields.date).getMonth() && weekFilters[0].getDay() >= new Date (activity.fields.date).getDay()) &&
            (weekFilters[0].getYear() <= new Date (activity.fields.date_end).getYear()  && weekFilters[0].getMonth() <= new Date (activity.fields.date_end).getMonth() && weekFilters[0].getDay() <= new Date (activity.fields.date_end).getDay())
        ))
        : activityList;

    activityList = hasSearchForFilter
        ? activityList.filter(activity => (activity.fields.activityName.toUpperCase().includes(searchForFilter) || activity.fields.provider.toUpperCase().includes(searchForFilter)))
        : activityList;

    return {
        activities: activityList,
        activeActivityFilters: activeActivityFilters,
        activeSuitedForFilters: activeSuitedForFilters,
        activeDateFilter: activeDateFilter,
        activeSearchForFilters: activeSearchForFilters,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchActivities: () => dispatch(fetchAllActivities()),
        changeActivityFilter: (filter) => dispatch(addActivityFilter(filter)),
        changeSuitedForFilter: (suitedFilter) => dispatch(addSuitedForFilter(suitedFilter)),
        changeWeekFilter: (weekFilter) => dispatch(addWeekFilter(weekFilter)),
        changeSearchForFilter: (searchFilter) => dispatch(addSearchForFilter(searchFilter)),
        changeTrashButton: () => dispatch(trashButtonClicked()),

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

