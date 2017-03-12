import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ActivityBox from '../ActivityBox';
import {getUpcomingActivities} from '../APIFunctions';

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

        const activities = this.state.ids.map((id, i) => {
           return(
               <ActivityBox id={id} key={id} tabIndex={i+1}/>
           )
        });

        return (
            <div style={styles.activitiesContainerStyle}>
              <h2>Kommende Aktiviteter</h2>
              <div style={styles.activitiesStyle}>
                  {activities}
              </div>
                <a href="/activity">Opprett ny aktivitet</a>
            </div>
        );
    }

    componentDidMount() {
        getUpcomingActivities(function(idArray) {
            this.setState({ids: idArray});
        }.bind(this));
    }
}

ReactDOM.render(
    <ActivitiesContainer/>,
    document.getElementById('activities')
);
