import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from "react-redux";

import {fetchAllHostingActivities} from '../actions/activitiesActions';
import ActivityCardHomePage from '../components/ActivityCardHomePage';
import configureStore from "../configureStore";

import '../../styles/activityBox.css';

const store = configureStore();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class HostingActivitiesContainer extends Component {

    createActivityCardComponent = () => {
        return this.props.hostingActivities.map(activity => {
            return (
                <ActivityCardHomePage
                    key={activity.id + activity.fields.activityName}
                    id={activity.pk}
                    activity={activity.fields}
                />
            )
        });
    };

    render() {
        const styles = {
            activitiesContainerStyle: {
                display: 'flex',
                justifyContent: 'flex-start'
            },
            activitiesStyle: {
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-between",
            },
        };

        let hostingContainer = <p>Du har ikke opprettet noen aktiviteter</p>;
        if (this.props.hostingActivities.length > 0) {
            hostingContainer =
                <div style={styles.activitiesStyle}>
                    {this.createActivityCardComponent()}
                </div>
        }

        return (
            <div style={styles.activitiesContainerStyle}>
                {hostingContainer}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        hostingActivities: state.activity.hostingActivityList
            .sort((a, b) => new Date(a.fields.date) > new Date(b.fields.date)) // Sort descending based on date
        // Only get five first
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchHostingActivities: () => dispatch(fetchAllHostingActivities()),
    }
};


// Fetch initial data for state
store.dispatch(fetchAllHostingActivities());

HostingActivitiesContainer = connect(mapStateToProps, mapDispatchToProps)(HostingActivitiesContainer);

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <HostingActivitiesContainer />
        </Provider>
    </MuiThemeProvider>, document.getElementById('hostingActivities')
);


