import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {getUpcomingActivities} from '../APIFunctions';

import { Provider } from "react-redux";
import store from "../store";
import ActivityPageContainer from '../components/ActivityPageComponent';
import { connect } from "react-redux";

class AllActivitiesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ids: []
        }
    }

    createActivityPageComponent() {
        return this.props.activities.map((activity) => {
            return (
                <ActivityPageContainer key={activity.id} activity={activity}/>
            )
        });
    }


    render() {

        const styles = {
            activitiesContainerStyle: {
                margin: "0px 10px 0px 10px"
            },
            activitiesStyle: {
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center"
            }
        };


        return (
            <div style={styles.activitiesContainerStyle}>
              <h3>Aktiviteter</h3>
              <div style={styles.activitiesStyle}>
                  {this.createActivityPageComponent()}
              </div>
            </div>
        );
    }

    componentDidMount() {
        getUpcomingActivities(function(idArray) {
            this.setState({ids: idArray});
        }.bind(this));
    }
}

function mapStateToProps(state) {
    return {
        activities: state.activity
    };
}

AllActivitiesContainer = connect(mapStateToProps)(AllActivitiesContainer);

ReactDOM.render(
    <Provider store={store}>
        <AllActivitiesContainer />
    </Provider>, document.getElementById('allActivities')
);

