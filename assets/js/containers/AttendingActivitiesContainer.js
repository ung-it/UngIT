import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from "react-redux";

import { fetchAllAttendingActivities } from '../actions/activitiesActions';
import ActivityCardHomePage from '../components/ActivityCardHomePage';
import configureStore from "../configureStore";

import '../../styles/activityBox.css';

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
                margin: "0px 10px 0px 10px"
            },
            activitiesStyle: {
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-around"
            },
        };

        let attendingContainer = <p>Du er ikke påmeldt noen aktiviteter</p>;
        if(this.props.attendingActivities.length > 0){
            attendingContainer=
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
            .sort((a, b) => new Date(a.fields.date) > new Date(b.fields.date)) // Sort descending based on date
            // Only get five first
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAttendingActivities: () => dispatch(fetchAllAttendingActivities()),
    }
};


// Fetch initial data for state
store.dispatch(fetchAllAttendingActivities());

AttendingActivitiesContainer = connect(mapStateToProps, mapDispatchToProps)(AttendingActivitiesContainer);

ReactDOM.render(
    <Provider store={store}>
        <AttendingActivitiesContainer />
    </Provider>, document.getElementById('attendingActivities')
);


