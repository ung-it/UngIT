import React, { Component } from 'react';
import {Modal, Button, Glyphicon, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import FacebookButton from './FacebookButton';
import styles from '../styles/loginModalStyle.css'


class LoginModal extends Component {
    constructor() {
    super();
    this.state = {
        show: false,
        username: "",
        password: ""
    };
    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    }

    onSubmit(e) {

    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    openLoginModal() {
        this.setState({show: true})
    }

    closeLoginModal() {
        this.setState({show: false})
    }

    render() {
        return (
            <div>
                <span onClick={this.openLoginModal}>
                    <Glyphicon glyph="glyphicon glyphicon-log-in"/> Logg inn
                </span>
                <Modal show={this.state.show} onHide={this.closeLoginModal} bsSize="large" aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-sm">Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Log inn med bruker navn og passord</h4>
                    <FormGroup>
                        <ControlLabel>Brukernavn</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.username}
                            placeholder="Skriv inn brukernavn"
                            onChange={this.handleUsernameChange}
                        />
                        <ControlLabel>Passord</ControlLabel>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            placeholder="Skriv inn passord"
                            onChange={this.handlePasswordChange}
                        />
                        <br/>
                        <Button onClick={this.onSubmit}>Log inn</Button>
                    </FormGroup>

                    <FacebookButton/>
                </Modal.Body>
                <Modal.Footer>

                    <Button onClick={this.closeLoginModal}>Lukk</Button>
                </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

export default LoginModal;