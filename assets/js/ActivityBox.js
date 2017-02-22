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

            provider: "Glenn Åges Fotballklubb"
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
                backgroundColor: "rgb(207, 206, 255)"
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
                            This arrangement is adapted for: XXX
                        </div>
                        <div style={styles.modalInfoContainer}>
                           <div style={styles.modalInfobox1}>
                               Alder, tid, sted
                           </div>
                            <div style={styles.modalInfobox2}>
                                Påmelding
                            </div>
                        </div>
                        <div>
                            <h2>Om arrangement</h2>
                            Her vil det stå ekstra informasjon om en aktivitet! Hurra dette blir gøy! :)
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