import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {getUpcomingActivities} from '../APIFunctions';

import HomePageContainer from '../components/HomePageComponent';
import { Provider, connect } from "react-redux";
import store from "../store";

import '../../styles/activityBox.css';

class ActivitiesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {

            ids: []
        }
    }

    createHomePageComponent() {
        return this.props.activities.map((activity) => {
            return (
                <HomePageContainer key={activity.id} activity={activity}/>
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
              <div style={styles.activitiesStyle}>
                  {this.createHomePageComponent()}
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

ActivitiesContainer = connect(mapStateToProps)(ActivitiesContainer);

ReactDOM.render(
    <Provider store={store}>
        <ActivitiesContainer />
    </Provider>, document.getElementById('activities')
);


