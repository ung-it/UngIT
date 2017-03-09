import React, { Component } from 'react';
import AllActivitiesBox from '../components/AllActivitiesBox';
import {getUpcomingActivities} from '../APIFunctions';

import ActivityPageContainer from '../components/ActivityPageComponent';
import { connect } from "react-redux";

class AllActivitiesContainer extends Component {

    constructor(props) {
        super(props);
        console.log("AllActivitiesContainer is here");
        this.state = {

            ids: []
        }
    }

    createActivityPageComponent() {
        console.log(this.props.activities);
        console.log('^from All activities Container');
        return this.props.activities.activities.map((activity) => {
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





        console.log('render');
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
    //console.log(state.activity);
    //console.log("^ is from mapStateToProps in APC");
    return {
        activities: state.activity
    };
}


export default connect(mapStateToProps)(AllActivitiesContainer);
