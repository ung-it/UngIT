import React, { Component } from 'react';
import {Thumbnail, Glyphicon, Button} from 'react-bootstrap';
import ActivityModal from './ActivityModal';
import {getMonth} from './DateFunctions'
import {getActivityInfo} from './APIFunctions';
import CalendarDateBox from './CalendarDateBox';

//Imports for Modal
import '../styles/activityBox.css';

class ActivityBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,

            title: "",
            location: "",
            date: new Date(),
            timeStart: "",
            timeEnd: "",
            images: [],
        };

        getActivityInfo(this.props.id, function (data) {
            this.setState({
                title: data.activityName,
                location: data.location,
                date: new Date(data.date),
                timeStart: data.time_start.substring(0,data.time_start.lastIndexOf(":")),
                timeEnd: data.time_end.substring(0,data.time_end.lastIndexOf(":")),
                images: data.images.split(","),
            });
        }.bind(this));
    }

    render() {

        let poster = null;
        if (this.state.images.length > 0 && this.state.images[0] != "") {
            poster = "media/" + this.state.images[0];
        }
        return (
            <div tabIndex={this.props.tabIndex}>
                <Thumbnail
                    className="activitySmalStyle"
                    src={poster}
                    onClick={this.openActivityModal.bind(this)}
                    title="Klikk på aktiviteten for mer informasjon">
                    <h3>{this.state.title}</h3>
                    <div className="info-box-wrapper">
                        <div className="icon-container">
                            <p><Glyphicon glyph="glyphicon glyphicon-calendar"/></p>
                            <p><Glyphicon glyph="glyphicon glyphicon-time"/></p>
                            <p><Glyphicon glyph="glyphicon glyphicon-map-marker"/></p>
                        </div>
                        <div className="info-container">
                            <p>{this.state.date.getDate()}. {getMonth(this.state.date.getMonth())}</p>
                            <p>{this.state.timeStart} - {this.state.timeEnd}</p>
                            <p>{this.state.location}</p>
                        </div>
                    </div>
                </Thumbnail>
                <ActivityModal id={this.props.id} show={this.state.show}></ActivityModal>
            </div>
        );
    }

    openActivityModal() {
        this.setState({show: true});
    }

}

export default ActivityBox;
