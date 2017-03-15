//React Component import
import React, { Component } from 'react';
//Bootstrap import
import {Glyphicon, Modal, Button} from 'react-bootstrap';
//Project component import
import {getMonth} from './DateFunctions'
import {getActivityInfo} from './APIFunctions';
import CalendarDateBox from './CalendarDateBox';
//CSS import
import '../styles/modal.css';

class ActivityModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            show: false,
            hasChecked: false,
            attending: false,
            loggedIn: false,
            title: "",
            provider: "",
            adaptions: "",
            age: "",
            location: "",
            description: "",
            price: "",
            date: new Date(),
            timeStart: "",
            timeEnd: "",
            images: [],
            videos: []
        };


    this.onSignup = this.onSignup.bind(this);
    this.onSignOf = this.onSignOf.bind(this);

        getActivityInfo(this.props.id, function (data) {
            let images = data.images.split(",").filter(image => {
                return image != "";
            }).map(image => {
                return "/media/" + image;
            });
            images = images.concat(data.instagram.split(",").filter(image => {
                return image != "";
            }));
            this.setState({
                title: data.activityName,
                provider: data.provider,
                adaptions: data.adaptions,
                age: data.age,
                location: data.location,
                description: data.description,
                price: data.price,
                date: new Date(data.date),
                timeStart: data.time_start.substring(0,data.time_start.lastIndexOf(":")),
                timeEnd: data.time_end.substring(0,data.time_end.lastIndexOf(":")),
                images: images,
                videos: data.videos.split(",")
            });
        }.bind(this));

        this.showMap = this.showMap.bind(this);
    }


    componentWillReceiveProps(props) {
        this.setState({show: props.show});
    }

    onSignup() {
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

    }

    onSignOf(){
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
    }

    render() {
        const {date, title, provider, adaptions, age, timeStart, timeEnd, location, description} = this.state;
        let videoContainer = null;
        if (this.state.videos.length > 0 && this.state.videos[0] != "") {
            const videos = this.state.videos.map((video, i) => {
                const path = "/media/video/" + video;
                return (
                    <video className="modal-video" controls="controls" key={i}>
                        <source src={path}/>
                    </video>
                )
            });
            videoContainer =
                <div>
                    <h3 className="modal-image-header">Video fra arrangementet</h3>
                    {videos}
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

        let imageContainer = null;
        if (this.state.images.length > 0 && this.state.images[0] != "") {
            const images = this.state.images.map((image, i) => {
                return (
                    <img className="modal-image" src={image} alt="Et bilde fra arrangementet" key={i}></img>
                )
            });
            imageContainer =
                <div>
                    <h3 className="modal-image-header">Bilder fra arrangementet</h3>
                    <div className="modal-image-container">
                        {images}
                    </div>
                </div>;
        }

        let attendingContainer = null;
        if(!this.state.loggedIn){
            attendingContainer =
                <div className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <h4>Påmelding til {title}</h4>
                        <p>Du må være logget inn for å kunne melde deg på dette arrangementet</p>
                    </div>
                </div>;
        }
        else if(this.state.attending == false){
            attendingContainer =
                <div className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <h5>Påmelding til {title}</h5>
                        <Button className="btn btn-success" onClick={this.onSignup}>Meld på!</Button>
                    </div>
            </div>;

        }else{
            attendingContainer =
                <div className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <h5>Du er påmeldt {title}</h5>
                        <Button onClick={this.onSignOf} className="btn btn-danger">Meld av</Button>
                    </div>
                </div>;
        }



        return (
            <Modal
                show={this.state.show}
                onHide={this.closeActivityModal.bind(this)}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                        <CalendarDateBox date={date}/>
                        <div className="modal-title-style">
                            <h1><b>{title}</b></h1>
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
                            <div className="modal-infobox1-element"><Glyphicon glyph="glyphicon glyphicon-time"/> Tid: {timeStart} - {timeEnd}</div>
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
                    {videoContainer}
                    {imageContainer}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.editActivity.bind(this)}>Endre aktivitet</Button>
                    <Button onClick={this.closeActivityModal.bind(this)}>Lukk</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    showMap() {
        window.open('https://www.google.no/maps/place/' + this.props.location,'_blank');
    }

    editActivity() {
        window.location = "/activity/" + this.props.id;
    }

    closeActivityModal() {
        this.setState({show: false, hasChecked: false});
    }
}

export default ActivityModal;
