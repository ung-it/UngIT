import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from "react-redux";
import {fetchAllHostingActivities, fetchFacebookEventData} from '../actions/activitiesActions';
import ActivityCardHomePage from '../components/ActivityCardHomePage';
import configureStore from "../configureStore";
import {withoutTime} from "../DateFunctions";
import '../../styles/activityBox.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const store = configureStore();

class HostingActivitiesContainer extends Component {

    componentDidMount() {
        this.props.fetchAllHostingActivities().then(() => {
            this.props.fetchFacebookEventData(this.props.hostingActivities);
        });
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

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.hostingActivities != nextProps.hostingActivities) {
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
            <div>
                {hostingContainer}
            </div>
        );
    }
}

Date.prototype.withoutTime = function () {
    let d = new Date(this);
    d.setHours(0, 0, 0, 0);
    return d;
};

const mapStateToProps = state => {
    return {
        hostingActivities: state.activity.hostingActivityList
            .sort((a, b) => withoutTime(new Date(a.fields.date)) > withoutTime(new Date(b.fields.date)))
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllHostingActivities: () => dispatch(fetchAllHostingActivities()),
        fetchFacebookEventData: (activities) => dispatch(fetchFacebookEventData(activities)),
    }
};

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#3F51B5',
    },
});

HostingActivitiesContainer = connect(mapStateToProps, mapDispatchToProps)(HostingActivitiesContainer);

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <HostingActivitiesContainer />
        </Provider>
    </MuiThemeProvider>, document.getElementById('hostingActivities')
);


