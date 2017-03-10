import React, { Component } from 'react';
import AllActivitiesBox from '../components/AllActivitiesBox';
import {getUpcomingActivities} from '../APIFunctions';

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


export default connect(mapStateToProps)(AllActivitiesContainer);
