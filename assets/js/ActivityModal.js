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

        getActivityInfo(this.props.id, function (data) {
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
                images: data.images.split(","),
                videos: data.videos.split(",")
            });
        }.bind(this));

        this.showMap = this.showMap.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({show:props.show});
    }

    render() {

        const {date, title, provider, adaptions, age, timeStart, timeEnd, location, description} = this.state;
        let videoContainer = null;
        if (this.state.videos.length > 0 && this.state.videos[0] != "") {
            const videos = this.state.videos.map((video, i) => {
                const path = "media/video/" + video;
                return (
                    <video className="modal-video" controls="controls" key={i}>
                        <source src={path}/>
                    </video>
                )
            });
            videoContainer =
                <div>
                    <h3>Video fra arrangementet</h3>
                    {videos}
                </div>;
        }

        let imageContainer = null;
        if (this.state.images.length > 0 && this.state.images[0] != "") {
            const images = this.state.images.map((image, i) => {
                const path = "media/" + image;
                return (
                    <img className="modal-image" src={path} alt="Et bilde fra arrangementet" key={i}></img>
                )
            });
            imageContainer =
                <div>
                    <h3>Bilder fra arrangementet</h3>
                    {images}
                </div>;
        }

        return (
            <Modal
                show={this.state.show}
                onHide={this.closeActivityModal.bind(this)}
                container={this}
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
                            <div><Glyphicon glyph="glyphicon glyphicon-user"/> Alder: {age}</div>
                            <div><Glyphicon glyph="glyphicon glyphicon-time"/> Tid: {timeStart} - {timeEnd}</div>
                            <div><Glyphicon glyph="glyphicon glyphicon-map-marker"/> Sted: {location}</div>
                            <div><Button onClick={this.showMap}>Vis på kart</Button></div>
                        </div>
                        <div className="modal-infobox2">
                            Påmelding
                            <Button>Meld på!</Button>
                        </div>
                    </div>
                    <div>
                        <h2>Om arrangement</h2>
                        <pre>{description}</pre>
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
        this.setState({show: false});
        document.body.style.overflow = null;
    }
}

export default ActivityModal;
