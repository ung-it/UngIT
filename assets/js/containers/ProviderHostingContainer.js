import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from "react-redux";
import {fetchAllProHostingActivities, fetchFacebookEventData} from '../actions/activitiesActions';
import ActivityCardHomePage from '../components/ActivityCardHomePage';
import configureStore from "../configureStore";
import {withoutTime} from "../DateFunctions";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../../styles/activityBox.css';

const store = configureStore();

class ProviderHostingContainer extends Component {

    componentDidMount() {
        this.props.fetchAllProHostingActivities().then(() => {
            this.props.fetchFacebookEventData(this.props.proHostingActivities);
        });
    }

    createActivityCardComponent = () => {
        return this.props.proHostingActivities.map(activity => {
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
        if (this.props.proHostingActivities != nextProps.proHostingActivities) {
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

        let proHostingContainer = <p>Vi har desverre ingen kommende aktiviteter for øyeblikket</p>;
        if (this.props.proHostingActivities.length > 0) {
            proHostingContainer =
                <div style={styles.activitiesStyle}>
                    {this.createActivityCardComponent()}
                </div>
        }

        return (
            <div style={styles.activitiesContainerStyle}>
                {proHostingContainer}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        proHostingActivities: state.activity.proHostingList
            .sort((a, b) => withoutTime(new Date(a.fields.date)) > withoutTime(new Date(b.fields.date)))
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProHostingActivities: () => dispatch(fetchAllProHostingActivities()),
        fetchFacebookEventData: (activities) => dispatch(fetchFacebookEventData(activities)),
    }
};

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#3F51B5',
    },
});

ProviderHostingContainer = connect(mapStateToProps, mapDispatchToProps)(ProviderHostingContainer);

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
            <ProviderHostingContainer />
        </Provider>
    </MuiThemeProvider>, document.getElementById('proHostingActivities')
);


