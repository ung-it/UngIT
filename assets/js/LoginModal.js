import React, { Component } from 'react';
import {Modal, Button, Glyphicon} from "react-bootstrap";

import styles from '../styles/loginModalStyle.css'


class LoginModal extends Component {
    constructor() {
    super();
    this.state = {
      show: false
    };
    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
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
                    <h4>Wrapped Text</h4>

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
