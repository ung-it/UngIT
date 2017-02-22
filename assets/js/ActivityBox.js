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
            title: "Fotball Demo",
            date: "22.02.17",
            time: "12:00",
            location: "Lerkendal Stadion",

            provider: "Glenn Åges Fotballklubb",
            adaptions: "XXX",
            age: "Alle aldre"
        }
    }

    render() {

        const styles = {
            activitySmalStyle: {
                width: "20em",
                cursor: "pointer"
            },
            modalTitleStyle: {
                width: "100%",
                textAlign: "center",
                margin: "auto"
            },
            modalProviderTitle: {
                margin: "30px 0 0 15px",
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
                textAlign: "left-justify"
            },
            modalInfobox2: {
                width: "50%",
                backgroundColor: "rgb(207, 106, 255)"
            }
        };

        return (
            <div>
                <Thumbnail style={styles.activitySmalStyle} src="./static/images/logoSmall.png" alt="Logo til aktivitet"
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
                            <div style={styles.modalTitleStyle}>
                                <h1><b>{this.state.title}</b></h1>
                                <div style={styles.modalProviderTitle}>Arrangør: <b>{this.state.provider}</b></div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={styles.modalAdapted}>
                            Dette arrangementet er tilpasset for: {this.state.adaptions}
                        </div>
                        <div style={styles.modalInfoContainer}>
                           <div style={styles.modalInfobox1}>
                               <div>Alder: {this.state.age}</div>
                               <div>Tid: {this.state.time}</div>
                               <div>Sted: {this.state.location}</div>
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
                        <div>
                            <h3>Video fra arrangement</h3>
                            <video className="modal-video" controls="controls">
                                <source src="static/video/The-Launch.mp4" type="video/mp4"/>Your browser does not support the video tag. I suggest you upgrade your browser.
                                <source src="static/video/The-Launch.webm" type="video/webm"/>Your browser does not support the video tag. I suggest you upgrade your browser.
                            </video>
                        </div>
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