import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from "react-redux";

import { fetchAllActivities } from '../actions/activitiesActions';
import ActivityCardHomePage from '../components/ActivityCardHomePage';
import configureStore from "../configureStore";

import '../../styles/activityBox.css';

const store = configureStore();

class ActivitiesContainer extends Component {

    componentDidMount() {
        this.props.fetchActivities();
    }

    createActivityCardComponent = () => {
        return this.props.activities.map(activity => {
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
            activitiesStyle: {
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center"
            }
        };

        return (
              <div style={styles.activitiesStyle}>
                  {this.createActivityCardComponent()}
              </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        activities: state.activity.activityList
            .sort((a, b) => new Date(a.fields.date) > new Date(b.fields.date)) // Sort descending based on date
            .slice(0, 7), // Only get five first
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchActivities: () => dispatch(fetchAllActivities()),
    }
};


// Fetch initial data for state
store.dispatch(fetchAllActivities());

ActivitiesContainer = connect(mapStateToProps, mapDispatchToProps)(ActivitiesContainer);

ReactDOM.render(
    <Provider store={store}>
        <ActivitiesContainer />
    </Provider>, document.getElementById('activities')
);
