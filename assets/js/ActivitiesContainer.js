import React, { Component } from 'react';
import ActivityBox from './ActivityBox';
import {getUpcomingActivities} from './APIFunctions';

class ActivitiesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ids: []
        }
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

        const activities = this.state.ids.map(id => {
           return(
               <ActivityBox id={id} key={id}/>
           )
        });

        return (
            <div style={styles.activitiesContainerStyle}>
              <h2>Kommende Aktiviteter</h2>
              <div style={styles.activitiesStyle}>
                  {activities}
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

export default ActivitiesContainer;
