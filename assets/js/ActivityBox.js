import React, { Component } from 'react';
import {Thumbnail, Glyphicon} from "react-bootstrap";

class ActivityBox extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const ActivitySmalStyle = {
            width: "20em",
            cursor: "pointer"
        };

        return (
            <Thumbnail style={ActivitySmalStyle} src="./static/images/logoSmall.png" alt="Logo til aktivitet" onClick={this.openActivityModal}>
            <h3>{this.props.title}</h3>
            <p><Glyphicon glyph="glyphicon glyphicon-calendar"/> {this.props.date}</p>
            <p><Glyphicon glyph="glyphicon glyphicon-time"/> Kl: {this.props.time}</p>
            <p><Glyphicon glyph="glyphicon glyphicon-map-marker"/> {this.props.location}</p>
            </Thumbnail>
        );
    }

    openActivityModal() {
        console.log("clicked")
    }
}

export default ActivityBox;