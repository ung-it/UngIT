import React, { Component } from 'react';
import {Thumbnail, Glyphicon, Modal, Button} from 'react-bootstrap';
import {getActivityInfo} from './APIFunctions';
import {getMonth} from './DateFunctions'
import CalendarDateBox from './CalendarDateBox';

//Imports for Modal
import '../styles/modal.css';
import '../styles/activityBox.css';

class AllActivitiesBox extends Component {

    constructor(props) {
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

    render() {

        const styles = {
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

        let videoContainer = null;
        if (this.state.videos.length > 0 && this.state.videos[0] != "") {
            const videos = this.state.videos.map((video, i) => {
                const path = "static/provider/video/" + video;
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
                const path = "static/provider/images/" + image;
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

        let poster = null;
        if (this.state.images.length > 0) {
            poster = "static/provider/images/" + this.state.images[0];
        }
        return (
            <div tabIndex={this.props.tabIndex}>
                <Thumbnail
                    className="activityBigStyle"
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
                        <div className="about-container">
                            <p>{this.state.description}</p>
                        </div>
                    </div>
                </Thumbnail>
                <Modal
                    show={this.state.show}
                    onHide={this.closeActivityModal.bind(this)}
                    container={this}
                    bsSize="large"
                    aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">
                            <CalendarDateBox date={this.state.date}/>
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
                               <div><Glyphicon glyph="glyphicon glyphicon-time"/> Tid: {this.state.timeStart} - {this.state.timeEnd}</div>
                               <div><Glyphicon glyph="glyphicon glyphicon-map-marker"/> Sted: {this.state.location}</div>
                               <div><Button onClick={this.showMap}>Vis på kart</Button></div>
                           </div>
                            <div style={styles.modalInfobox2}>
                                Påmelding
                                <Button>Meld på!</Button>
                            </div>
                        </div>
                        <div>
                            <h2>Om arrangement</h2>
                            <pre>{this.state.description}</pre>
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

    showMap() {
        window.open('https://www.google.no/maps/place/' + this.state.location,'_blank');
    }

    openActivityModal() {
        this.setState({show: true})
    }

    closeActivityModal() {
        this.setState({show: false})
    }
}

export default AllActivitiesBox;
