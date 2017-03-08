import React, { Component } from 'react';
import AllActivitiesBox from './components/AllActivitiesBox';
import {getUpcomingActivities} from './APIFunctions';
import ActivityPageLayout from "./components/ActivityPageLayout"

class AllActivitiesContainer extends Component {

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

        const activities = this.state.ids.map((id, i) => {
           return(
               <ActivityPageLayout id={id} key={id} tabIndex={i+1}/>
           )
        });

        return (
            <div style={styles.activitiesContainerStyle}>
              <h3>Aktiviteter</h3>
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

export default AllActivitiesContainer;
