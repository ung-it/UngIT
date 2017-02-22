import React, { Component } from 'react';
import {Thumbnail, Glyphicon} from 'react-bootstrap';
import {getActivityInfo} from './APIFunctions';

class ActivityBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            date: "",
            time: "",
            location: "",
        }
    }

    render() {

        const ActivitySmalStyle = {
            width: "20em",
            cursor: "pointer"
        };

        return (
            <Thumbnail style={ActivitySmalStyle} src="./static/images/logoSmall.png" alt="Logo til aktivitet"
                       onClick={this.openActivityModal.bind(this)}>
                <h3>{this.state.title}</h3>
                <p><Glyphicon glyph="glyphicon glyphicon-calendar"/> {this.state.date}</p>
                <p><Glyphicon glyph="glyphicon glyphicon-time"/> Kl: {this.state.time}</p>
                <p><Glyphicon glyph="glyphicon glyphicon-map-marker"/> {this.state.location}</p>
            </Thumbnail>
        );
    }

    componentDidMount() {
        getActivityInfo(this.props.id, function (data) {
            this.setState({title: data.title, date: data.date, time: data.time, location: data.location});
        }.bind(this));
    }

    openActivityModal() {
        console.log(this);
    }
}

export default ActivityBox;