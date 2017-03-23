import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from "react-redux";

import { fetchAllHostingActivities } from '../actions/activitiesActions';
import ActivityCardHomePage from '../components/ActivityCardHomePage';
import configureStore from "../configureStore";

import '../../styles/activityBox.css';

const store = configureStore();

class HostingActivitiesContainer extends Component {

    componentDidMount() {
        this.props.fetchHostingActivities();
    }

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
                margin: "0px 10px 0px 10px"
            },
            activitiesStyle: {
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "flex-start"
            }
        };

        return (
            <div style={styles.activitiesContainerStyle}>
              <div style={styles.activitiesStyle}>
                  {this.createActivityCardComponent()}
              </div>
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
    <Provider store={store}>
        <HostingActivitiesContainer />
    </Provider>, document.getElementById('hostingActivities')
);


