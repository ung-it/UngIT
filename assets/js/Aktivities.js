import React, { Component } from 'react';
import Aktivitet from './Aktivity';
import styles from '../styles/activitiesStyle.css'

class App extends Component {
    render() {
        return (
            <div classID="activitiesContainer">
              <h2>Kommende Aktiviteter</h2>
              <div id="upcomingActivities">
                <Aktivitet/>
                <Aktivitet/>
                <Aktivitet/>
              </div>
            </div>
        );
    }
}

export default App;