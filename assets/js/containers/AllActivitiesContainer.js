import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {connect} from "react-redux";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../../styles/activityBox.css';


import ActivityFilters from '../components/ActivityFilters';
import ActivitiesList from '../components/ActivtiesList'
import { fetchAllActivities, addActivityFilter, addSuitedForFilter, addWeekFilter, addSearchForFilter, trashButtonClicked } from '../actions/activitiesActions';
import configureStore from "../configureStore";

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
                        activitiesName={this.props.activities}
                        onButtonChange={this.props.changeTrashButton}
                    />
                </div>
                <div><ActivitiesList activities={this.props.activities}/></div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    let {activity: {activityList, activeActivityFilters, activeSuitedForFilters, activeDateFilter, activeSearchForFilters}} = state; // Make activityList and activeActivityFilters from state become variables


    //TODO: Send all suited for filters as props from suitedforpicker
    const availableSuitedFor = ['Tilrettelegging 1', 'Tilrettelegging 2', 'Tilrettelegging 3', 'Tilrettelegging 4', 'Annet'];


    const hasActivityFilter = activeActivityFilters.length > 0; // Make boolean telling whether or not an active filter is present
    const activityFilters = activeActivityFilters.split(','); // Convert activeActivityFilters into a list of int, to be able to check against activityType from the server

    const hasSuitedForFilter = activeSuitedForFilters.length > 0;
    const suitedForFilters = activeSuitedForFilters.split(',');


    const hasWeekFilter = activeDateFilter.toString().length > 0;
    const weekPicker = new Date(activeDateFilter);

    activityList = hasWeekFilter
        ? activityList.filter(activity => new Date(activity.fields.date) >= weekPicker)
        : activityList;

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


    activityList = hasSearchForFilter
        ? activityList.filter(activity => (activity.fields.activityName.toUpperCase().includes(searchForFilter) || activity.fields.provider.toUpperCase().includes(searchForFilter)))
        : activityList;


    activityList = activityList.sort((a, b) => new Date(a.fields.date) > new Date(b.fields.date)); // Sort descending based on date

    activeDateFilter = activeDateFilter.toString();

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

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#3F51B5',
    },
});


AllActivitiesContainer = connect(mapStateToProps, mapDispatchToProps)(AllActivitiesContainer);
// Fetch initial data for to the state
store.dispatch(fetchAllActivities());

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <AllActivitiesContainer />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('allActivities')
);

