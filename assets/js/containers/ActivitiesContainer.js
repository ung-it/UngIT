import React, { Component } from 'react';
import AllActivitiesBox from '../components/AllActivitiesBox';
import {getUpcomingActivities} from '../APIFunctions';

import HomePageContainer from '../components/HomePageComponent';
import { connect } from "react-redux";

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
              <h3>Aktiviteter</h3>
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


export default connect(mapStateToProps)(ActivitiesContainer);
