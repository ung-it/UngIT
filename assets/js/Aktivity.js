import React, { Component } from 'react';
import {Thumbnail, Glyphicon} from "react-bootstrap";
import styles from '../styles/activityStyle.css'

class Aktivitet extends Component {
  render() {
    return (
      <Thumbnail src="./res/images/logoSmall.png" alt="242x200">
        <h3>Møte Babak og Peter</h3>
        <p><Glyphicon glyph="glyphicon glyphicon-calendar"/> 17.02.17</p>
        <p><Glyphicon glyph="glyphicon glyphicon-time"/> Kl: 10:00</p>
        <p><Glyphicon glyph="glyphicon glyphicon-map-marker"/> SINTEF</p>

      </Thumbnail>
    );
  }
}

export default Aktivitet;