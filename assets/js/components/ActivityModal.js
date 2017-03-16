//React Component import
import React, { Component } from 'react';
//Bootstrap import
import { Glyphicon, Modal, Button } from 'react-bootstrap';
//Project component import
import {getMonth} from '../DateFunctions'
import CalendarDateBox from './CalendarDateBox';
//CSS import
import '../../styles/modal.css';

class ActivityModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            show: false,
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            show: props.show
        });
    }

    showMap = () => {
        window.open('https://www.google.no/maps/place/' + this.props.activity.location,'_blank');
    }

    editActivity = () => {
        window.location = "/activity/" + this.props.id;
    }

    closeActivityModal = () => {
        this.setState({
            show: false
        });
    }

    render() {
        const { date, activityName, activityType, provider, adaptions, age, time_start, time_end, location, description, videos, images } = this.props.activity;

        //let videoContainer = null;
        //if (videos.length > 0) {
        //    const videos = this.state.videos.map((video, i) => {
        //        const path = "/media/video/" + video;
        //        return (
        //            <video className="modal-video" controls="controls" key={i}>
        //                <source src={path}/>
        //            </video>
        //        )
            //    });
        //    videoContainer =
        //        <div>
        //            <h3 className="modal-image-header">Video fra arrangementet</h3>
        //            {videos}
        //        </div>;
        //}

        let imageContainer = null;
        if (images.length > 0) {
            imageContainer =
                <div>
                    <h3 className="modal-image-header">Bilder fra arrangementet</h3>
                    <div className="modal-image-container">
                        <img className="modal-image" src={images} alt="Et bilde fra arrangementet"></img>
                    </div>
                </div>;
        }

        return (
            <Modal
                show={this.state.show}
                onHide={this.closeActivityModal}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                        <CalendarDateBox date={new Date(date)}/>
                        <div className="modal-title-style">
                            <h1><b>{activityName}</b></h1>
                            <div className="modal-provider-title">Arrangeres av: <b>{provider}</b></div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-adapted">
                        Dette arrangementet er tilpasset for: {adaptions}
                    </div>
                    <div className="modal-info-container">
                        <div className="modal-infobox1">
                            <div className="modal-infobox1-element"><Glyphicon glyph="glyphicon glyphicon-user"/> Alder: {age}</div>
                            <div className="modal-infobox1-element"><Glyphicon glyph="glyphicon glyphicon-time"/> Tid: {time_start} - {time_end}</div>
                            <div className="modal-infobox1-element">
                                <Glyphicon glyph="glyphicon glyphicon-map-marker"/>
                                Sted: {location}
                            </div>
                            <div className="modal-infobox1-map">
                                <a onClick={this.showMap} >Vis på kart</a>
                            </div>
                        </div>
                        <div className="modal-infobox2">
                            <div className="modal-infobox2-element">
                                Påmelding til {activityName}
                            </div>
                            <div className="modal-infobox2-element">
                                <Button bsStyle="info">Meld meg på</Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="modal-description-header">Om arrangementet</h2>
                        <p className="modal-description">{description}</p>
                    </div>
                    {/* videoContainer */}
                    {imageContainer}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.editActivity}>Endre aktivitet</Button>
                    <Button onClick={this.closeActivityModal}>Lukk</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ActivityModal;
