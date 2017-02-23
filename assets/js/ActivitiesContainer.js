import React, { Component } from 'react';
import ActivityBox from './ActivityBox';

class ActivitiesContainer extends Component {
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
              <h2>Kommende Aktiviteter</h2>
              <div style={styles.activitiesStyle}>
                <ActivityBox id="000001"/>
                <ActivityBox id="000002"/>
                <ActivityBox id="000003"/>
                <ActivityBox id="000004"/>
                <ActivityBox id="000005"/>
                <ActivityBox id="000006"/>
                <ActivityBox id="000007"/>
                <ActivityBox id="000008"/>
              </div>
            </div>
        );
    }
}

export default ActivitiesContainer;