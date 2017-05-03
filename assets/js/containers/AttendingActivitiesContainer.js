import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from "react-redux";
import {fetchAllAttendingActivities, fetchFacebookEventData} from '../actions/activitiesActions';
import ActivityCardHomePage from '../components/ActivityCardHomePage';
import configureStore from "../configureStore";
import {withoutTime} from "../DateFunctions";
import '../../styles/activityBox.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const store = configureStore();

class AttendingActivitiesContainer extends Component {

    componentDidMount() {
        this.props.fetchAllAttendingActivities().then(() => {
            this.props.fetchFacebookEventData(this.props.attendingActivities);
        });
    }

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

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.attendingActivities != nextProps.attendingActivities) {
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
        fetchAllAttendingActivities: () => dispatch(fetchAllAttendingActivities()),
        fetchFacebookEventData: (activities) => dispatch(fetchFacebookEventData(activities)),
    }
};

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#3F51B5',
    },
});

AttendingActivitiesContainer = connect(mapStateToProps, mapDispatchToProps)(AttendingActivitiesContainer);

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <AttendingActivitiesContainer />
        </Provider>
    </MuiThemeProvider>, document.getElementById('attendingActivities')
);


