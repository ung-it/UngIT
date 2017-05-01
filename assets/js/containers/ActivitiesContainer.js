import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from "react-redux";
import {fetchAllActivities, fetchFacebookEventData} from '../actions/activitiesActions';
import ActivityCardHomePage from '../components/ActivityCardHomePage';
import configureStore from "../configureStore";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {withoutTime} from "../DateFunctions";
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
                    key={activity.pk + activity.fields.activityName}
                    id={activity.pk}
                    activity={activity.fields}
                />
            )
        });
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.activities != nextProps.activities) {
            return true;
        }
        return false;
    }

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

        return (
            <div style={styles.activitiesContainerStyle}>
                <div style={styles.activitiesStyle}>{this.createActivityCardComponent()}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activities: state.activity.activityList
            .sort((a, b) => withoutTime(new Date(a.fields.date)) > withoutTime(new Date(b.fields.date))) // Sort descending based on date
            .filter((a) => withoutTime(new Date(a.fields.date_end)) >= withoutTime(new Date()))
            .slice(0, 4) // Only get five first
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

ActivitiesContainer = connect(mapStateToProps, mapDispatchToProps)(ActivitiesContainer);

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <ActivitiesContainer />
        </Provider>
    </MuiThemeProvider>, document.getElementById('activities')
);
