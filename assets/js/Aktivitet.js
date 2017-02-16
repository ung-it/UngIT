import React, { Component } from 'react';
import {Thumbnail, Glyphicon} from "react-bootstrap";
import styles from '../styles/activityStyle.css'

class Aktivitet extends Component {
  render() {
    return (
      <Thumbnail src="./res/images/logoSmal.png" alt="242x200">
        <h3>Banke opp Martin</h3>
        <p><Glyphicon glyph="glyphicon glyphicon-map-marker"/> Gløshaugen</p>
        <p><Glyphicon glyph="glyphicon glyphicon-time"/> Kl: 1400-14:15</p>

      </Thumbnail>
    );
  }
}

export default Aktivitet;