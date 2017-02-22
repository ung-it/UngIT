import React, { Component } from 'react';
import {Thumbnail, Glyphicon} from 'react-bootstrap';
import {getActivityInfo} from './APIFunctions';
import CalendarDateBox from './CalendarDateBox';

//Imports for Modal
import {Modal, Button} from 'react-bootstrap';
import '../styles/modal.css';

class ActivityBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            title: "Fotball Demo",
            date: "22.02.17",
            time: "12:00",
            location: "Lerkendal Stadion",
        }
    }

    render() {

        const ActivitySmalStyle = {
            width: "20em",
            cursor: "pointer"
        };

        return (
            <div>
                <Thumbnail style={ActivitySmalStyle} src="./static/images/logoSmall.png" alt="Logo til aktivitet"
                           onClick={this.openActivityModal.bind(this)}>
                    <h3>{this.state.title}</h3>
                    <p><Glyphicon glyph="glyphicon glyphicon-calendar"/> {this.state.date}</p>
                    <p><Glyphicon glyph="glyphicon glyphicon-time"/> Kl: {this.state.time}</p>
                    <p><Glyphicon glyph="glyphicon glyphicon-map-marker"/> {this.state.location}</p>
                </Thumbnail>
                <Modal
                    show={this.state.show}
                    onHide={this.closeActivityModal.bind(this)}
                    container={this}
                    bsSize="large"
                    aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">
                            <CalendarDateBox day="22" month="Februar" weekday="Onsdag"/>
                            <div id="modal-title"><h3>{this.state.title}</h3></div></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Her vil det stå ekstra informasjon om en aktivitet! Hurra dette blir gøy! :)
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeActivityModal.bind(this)}>Lukk</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    componentDidMount() {
        getActivityInfo(this.props.id, function (data) {
            this.setState({title: data.title, date: data.date, time: data.time, location: data.location});
        }.bind(this));
    }

    openActivityModal() {
        this.setState({show: true})
    }

    closeActivityModal() {
        this.setState({show: false})
    }
}

export default ActivityBox;