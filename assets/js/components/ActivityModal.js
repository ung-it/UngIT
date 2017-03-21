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
            hasChecked: false,
            attending: false,
            loggedIn: false,
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            show: props.show
        });
    }

    showMap = () => {
        window.open('https://www.google.no/maps/place/' + this.props.activity.location,'_blank');
    };

    editActivity = () => {
        window.location = "/activity/" + this.props.id;
    };

    closeActivityModal = () => {
        this.setState({
            show: false,
            hasChecked: false
        });
    };

    onSignup = () => {
        var request = {
            id: this.props.id
        };

        fetch('http://localhost:8000/signupActivity/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "same-origin",
            body: JSON.stringify(request)

        }).then((response) => {
            console.log(response);
            if(response.status == 204){
                this.setState({
                    attending: true
                });
            }
            return response.status;
        })

    };

    onSignOf = () => {
        console.log("id " + this.props.id);

        var request = {
            id: this.props.id
        };

        fetch('http://localhost:8000/signOfEvent/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "same-origin",
            body: JSON.stringify(request)

        }).then((response) => {
            console.log(response);
            if(response.status == 210){
                this.setState({
                    attending: false
                });
            }
            return response.status;
        })
    };

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

        if(this.state.show && !this.state.hasChecked){
            var request = {
                id: this.props.id
            };
            fetch('http://localhost:8000/checkIfSignedUp/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "same-origin",
                body: JSON.stringify(request)

            }).then((response) => {
                console.log(response);
                if(response.status == 204){
                    this.setState({
                        attending: true,
                        hasChecked:true,
                        loggedIn: true
                    });
                }else if(response.status == 205){
                    this.setState({
                        loggedIn: true,
                        hasChecked: true

                    })

                }else if(response == 206){
                    this.setState({
                        loggedIn: false
                    })
                }

                return response.status;
            })
        }

        let attendingContainer = null;
        if(!this.state.loggedIn){
            attendingContainer =
                <div className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <h4>Påmelding til {activityName}</h4>
                        <p>Du må være logget inn for å kunne melde deg på dette arrangementet</p>
                    </div>
                </div>;
        } else if(this.state.attending == false) {
            attendingContainer =
                <div className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <h5>Påmelding til {activityName}</h5>
                        <Button className="btn btn-success" onClick={this.onSignup}>Meld på!</Button>
                    </div>
            </div>;

        } else {
            attendingContainer =
                <div className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <h5>Du er påmeldt {activityName}</h5>
                        <Button onClick={this.onSignOf} className="btn btn-danger">Meld av</Button>
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
                        {attendingContainer}
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