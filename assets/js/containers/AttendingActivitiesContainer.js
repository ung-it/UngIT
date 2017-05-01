import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from "react-redux";
import {fetchAllAttendingActivities} from '../actions/activitiesActions';
import ActivityCardHomePage from '../components/ActivityCardHomePage';
import configureStore from "../configureStore";
import {withoutTime} from "../DateFunctions";
import '../../styles/activityBox.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const store = configureStore();

class AttendingActivitiesContainer extends Component {

    createActivityCardComponent = () => {
        return this.props.attendingActivities.map(activity => {
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

        let attendingContainer = <p>Du er ikke påmeldt noen aktiviteter</p>;
        if (this.props.attendingActivities.length > 0) {
            attendingContainer =
                <div style={styles.activitiesStyle}>
                    {this.createActivityCardComponent()}
                </div>
        }

        return (
            <div style={styles.activitiesContainerStyle}>
                {attendingContainer}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        attendingActivities: state.activity.attendingActivityList
            .sort((a, b) => withoutTime(new Date(a.fields.date)) > withoutTime(new Date(b.fields.date)))
            .filter((a) => withoutTime(new Date(a.fields.date_end)) >= withoutTime(new Date()))
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAttendingActivities: () => dispatch(fetchAllAttendingActivities()),
    }
};

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#3F51B5',
    },
});

// Fetch initial data for state
store.dispatch(fetchAllAttendingActivities());

AttendingActivitiesContainer = connect(mapStateToProps, mapDispatchToProps)(AttendingActivitiesContainer);

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <AttendingActivitiesContainer />
        </Provider>
    </MuiThemeProvider>, document.getElementById('attendingActivities')
);


