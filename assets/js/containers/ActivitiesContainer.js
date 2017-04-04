import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from "react-redux";

import {fetchAllActivities, fetchFacebookEventData} from '../actions/activitiesActions';
import ActivityCardHomePage from '../components/ActivityCardHomePage';
import configureStore from "../configureStore";
// import for material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import '../../styles/activityBox.css';

const store = configureStore();

class ActivitiesContainer extends Component {

    componentDidMount() {
        this.props.fetchActivities().then(() => {
            this.props.fetchFacebookEventData(this.props.activities);
        });
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

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.activities.length != nextProps.activities.length) {
            return true;
        }
        return false;
    }

    render() {
        const styles = {
            activitiesStyle: {
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-between",
                width: '100%',
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
            .slice(0, 4).reverse() // Only get five first
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchActivities: () => dispatch(fetchAllActivities()),
        fetchFacebookEventData: (activities) => dispatch(fetchFacebookEventData(activities)),
    }
};

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#3F51B5',
    },
});

// Fetch initial data for state
// store.dispatch(fetchAllActivities());

ActivitiesContainer = connect(mapStateToProps, mapDispatchToProps)(ActivitiesContainer);

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <ActivitiesContainer />
        </Provider>
    </MuiThemeProvider>, document.getElementById('activities')
);
