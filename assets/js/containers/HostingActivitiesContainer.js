import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from "react-redux";

import {fetchAllHostingActivities} from '../actions/activitiesActions';
import ActivityCardHomePage from '../components/ActivityCardHomePage';
import configureStore from "../configureStore";
import { withoutTime } from "../DateFunctions";
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
                padding: "1em"
            },
            activitiesStyle: {
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "flex-start",
                padding: "0.5em"
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

Date.prototype.withoutTime = function () {
    let d = new Date(this);
    d.setHours(0,0,0,0);
    return d;
}

const mapStateToProps = state => {
    return {
        hostingActivities: state.activity.hostingActivityList
            .sort((a, b) => withoutTime(new Date(a.fields.date)) > withoutTime(new Date(b.fields.date)))
        // Only get five first
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchHostingActivities: () => dispatch(fetchAllHostingActivities()),
    }
};

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#3F51B5',
    },
});

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


