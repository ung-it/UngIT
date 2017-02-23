import React, { Component } from 'react';
import ActivityBox from './ActivityBox';

class ActivitiesContainer extends Component {
    render() {

        const ActivitiesStyle = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        };

        return (
            <div>
              <h2>Kommende Aktiviteter</h2>
              <div style={ActivitiesStyle}>
                <ActivityBox id="000001"/>
                <ActivityBox id="000002"/>
                <ActivityBox id="000003"/>
                <ActivityBox id="000004"/>
              </div>
            </div>
        );
    }
}

export default ActivitiesContainer;