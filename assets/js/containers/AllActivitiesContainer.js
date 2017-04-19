import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {connect} from "react-redux";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../../styles/activityBox.css';


import ActivityFilters from '../components/ActivityFilters';
import ActivitiesList from '../components/ActivtiesList'
import {
    fetchAllActivities, addActivityFilter, addSuitedForFilter, addWeekFilter, addSearchForFilter,
    trashButtonClicked, suitedForButtonClicked, activityButtonClicked, fetchFacebookEventData
} from '../actions/activitiesActions';

import configureStore from "../configureStore";

const store = configureStore();


class AllActivitiesContainer extends Component {

    componentDidMount() {
        this.props.fetchActivities().then(() => {
            this.props.fetchFacebookEventData(this.props.activities);
        });
    }

    render() {
        return (
            <div>
                <div className="filter-container">
                    <ActivityFilters
                        onActivityFilterChange={this.props.changeActivityFilter}
                        activityFilters={this.props.activeActivityFilters}
                        activityButton={this.props.changeActivityButton}
                        onSuitedForFilterChange={this.props.changeSuitedForFilter}
                        suitedForFilters={this.props.activeSuitedForFilters}
                        suitedForButton={this.props.changeSuitedForButton}
                        onWeekPickerChange={this.props.changeWeekFilter}
                        weekFilters={this.props.activeDateFilter}
                        onSearchForChange={this.props.changeSearchForFilter}
                        activitiesName={this.props.activities}
                        searchForFilter={this.props.activeSearchForFilters}
                        onButtonChange={this.props.changeTrashButton}
                    />
                </div>
                <div><ActivitiesList activities={this.props.activities}/></div>

            </div>
        );
    }
}

Date.prototype.withoutTime = function () {
    let d = new Date(this);
    d.setHours(0,0,0,0);
    return d;
}

const mapStateToProps = state => {
    let {activity: {activityList, activeActivityFilters, activeSuitedForFilters, activeDateFilter, activeSearchForFilters}} = state; // Make activityList and activeActivityFilters from state become variables

    const availableSuitedFor = ['Tilrettelegging 1', 'Tilrettelegging 2', 'Tilrettelegging 3', 'Tilrettelegging 4', 'Annet'];

    const hasActivityFilter = activeActivityFilters.length > 0; // Make boolean telling whether or not an active filter is present

    const hasSuitedForFilter = activeSuitedForFilters.length > 0;
    const suitedForFilters = activeSuitedForFilters;

    const hasWeekFilter = activeDateFilter.toString().length > 0;
    const weekPicker = new Date(activeDateFilter);

    activityList = hasWeekFilter
        ? activityList.filter(activity => new Date(activity.fields.date) >= weekPicker)
        : activityList;

    const hasSearchForFilter = activeSearchForFilters.length > 0;
    const searchForFilter = activeSearchForFilters.toUpperCase();

    activityList = hasActivityFilter
        ? activityList.filter(activity => activeActivityFilters.includes(activity.fields.activityType))
        : activityList;


    activityList = hasSuitedForFilter
        ? activityList.filter(activity => {
            let result = activity.fields.adaptions.split(',').filter(adaption => {
                return suitedForFilters.indexOf(adaption) != -1
            });

            if (suitedForFilters.indexOf("Annet") != -1) {

                result = result.concat(activity.fields.adaptions.split(',').filter(adaption => {
                    return availableSuitedFor.indexOf(adaption) == -1
                }))
            }
            return result.length >= suitedForFilters.length;
        })
        : activityList;


    activityList = hasSearchForFilter
        ? activityList.filter(activity => (activity.fields.activityName.toUpperCase().includes(searchForFilter) || activity.fields.provider.toUpperCase().includes(searchForFilter)))
        : activityList;


    activityList = activityList.sort((a, b) => new Date(a.fields.date).withoutTime() > new Date(b.fields.date).withoutTime()); // Sort descending based on date
    activityList = activityList.filter((a) => new Date(a.fields.date_end).withoutTime() >= new Date().withoutTime())


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
        fetchFacebookEventData: (activities) => dispatch(fetchFacebookEventData(activities)),
        changeActivityFilter: (filter) => dispatch(addActivityFilter(filter)),
        changeSuitedForFilter: (suitedFilter) => dispatch(addSuitedForFilter(suitedFilter)),
        changeWeekFilter: (weekFilter) => dispatch(addWeekFilter(weekFilter)),
        changeSearchForFilter: (searchFilter) => dispatch(addSearchForFilter(searchFilter)),
        changeTrashButton: () => dispatch(trashButtonClicked()),
        changeSuitedForButton: () => dispatch(suitedForButtonClicked()),
        changeActivityButton: () => dispatch(activityButtonClicked()),
    }
}

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#3F51B5',
    },
});


AllActivitiesContainer = connect(mapStateToProps, mapDispatchToProps)(AllActivitiesContainer);

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <AllActivitiesContainer />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('allActivities')
);

