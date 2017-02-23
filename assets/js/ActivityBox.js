import React, { Component } from 'react';
import {Thumbnail, Glyphicon, Modal, Button} from 'react-bootstrap';
import {getActivityInfo} from './APIFunctions';
import CalendarDateBox from './CalendarDateBox';

//Imports for Modal
import '../styles/modal.css';

class ActivityBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            title: "Astronaut Demo",
            date: "22.02.17",
            time: "12:00",
            location: "Trondheim Space Centre",

            provider: "SINTEF",
            adaptions: "XXX",
            age: "Alle aldre",

            videos: ["The-Launch.mp4"],
            images: ["spaceImage1.png","spaceImage1.png"]
        }
    }

    render() {

        const styles = {
            activitySmalStyle: {
                width: "20em",
                cursor: "pointer",
                marginLeft: "5px",
                marginRight: "5px"
            },
            modalTitleStyle: {
                width: "100%",
                textAlign: "center",
                position: "relative"
            },
            modalProviderTitle: {
                position: "absolute",
                bottom: "0px",
                left: "10px",
                textAlign: "left"
            },
            modalAdapted: {
                backgroundColor: "rgb(207, 226, 243)"
            }
            ,
            modalInfoContainer: {
                display: "flex"
            },
            modalInfobox1: {
                width: "50%",
                backgroundColor: "rgb(207, 206, 255)",
                textAlign: "left-justify",
                lineHeight: "2"
            },
            modalInfobox2: {
                width: "50%",
                backgroundColor: "rgb(207, 106, 255)"
            },
            modalMediaContainer: {


            }
        };

        const videos = this.state.videos.map((video, i) => {
            const path = "static/video/" + video;
            return (
                <video className="modal-video" controls="controls" key={i}>
                    <source src={path}/>
                </video>
            )
        });
        let videoContainer = null;
        if (videos.length > 0) {
            videoContainer =
                <div>
                    <h3>Video fra arrangementet</h3>
                    {videos}
                </div>;
        }

        const images = this.state.images.map((image, i) => {
            const path = "static/images/" + image;
            return (
               <img className="modal-image" src={path} alt="Et bilde fra arrangementet" key={i}></img>
            )
        });
        let imageContainer = null;
        if (images.length > 0) {
            imageContainer =
                <div>
                    <h3>Bilder fra arrangementet</h3>
                    {images}
                </div>;
        }

        return (
            <div>
                <Thumbnail style={styles.activitySmalStyle} src="static/images/astronaut.jpg" alt="Logo til aktivitet"
                           onClick={this.openActivityModal.bind(this)}>
                    <h3>{this.state.title}</h3>
                    <p><Glyphicon glyph="glyphicon glyphicon-calendar"/> {this.state.date}</p>
                    <p><Glyphicon glyph="glyphicon glyphicon-time"/> Tid: {this.state.time}</p>
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
                            <div style={styles.modalTitleStyle}>
                                <h1><b>{this.state.title}</b></h1>
                                <div style={styles.modalProviderTitle}>Arrangeres av: <b>{this.state.provider}</b></div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={styles.modalAdapted}>
                            Dette arrangementet er tilpasset for: {this.state.adaptions}
                        </div>
                        <div style={styles.modalInfoContainer}>
                           <div style={styles.modalInfobox1}>
                               <div><Glyphicon glyph="glyphicon glyphicon-user"/> Alder: {this.state.age}</div>
                               <div><Glyphicon glyph="glyphicon glyphicon-time"/> Tid: {this.state.time}</div>
                               <div><Glyphicon glyph="glyphicon glyphicon-map-marker"/> Sted: {this.state.location}</div>
                           </div>
                            <div style={styles.modalInfobox2}>
                                Påmelding
                                <Button>Meld på!</Button>
                            </div>
                        </div>
                        <div>
                            <h2>Om arrangement</h2>
                            Her vil det stå ekstra informasjon om arrangementet! Hurra dette blir gøy! :)
                        </div>
                        {videoContainer}
                        {imageContainer}
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