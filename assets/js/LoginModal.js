import React, { Component } from 'react';
import {Modal, Button, Glyphicon, FormGroup, FormControl, ControlLabel} from "react-bootstrap";

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
/*
    this.handleClick = this.handleClick.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
    this.testAPI = this.testAPI.bind(this);
*/
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


    /*
    componentDidMount() {
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '1658650714438155',
          cookie     : true,  // enable cookies to allow the server to access
                            // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.3' // use version 2.1
        });

        FB.getLoginStatus(function(response) {
          this.statusChangeCallback(response);
        }.bind(this));
      }.bind(this);

      // Load the SDK asynchronously
        (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/nb_NO/sdk.js#xfbml=1&version=v2.8&appId=1658650714438155";
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      console.log('Thanks for logging in, ' + response.name + '!');
      });
    }

    statusChangeCallback(response) {
      console.log('statusChangeCallback');
      console.log(response);
    if (response.status === 'connected') {
        this.testAPI();
      } else if (response.status === 'not_authorized') {
        console.log('Please log into this app.');
      } else {
        console.log('Please log into facebook.');
      }
    }

    checkLoginState() {
      FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }

    handleClick() {
      FB.login(this.checkLoginState());
    }
    <div id="fb-root"></div>
    <div className="fb-login-button" data-size="large" data-show-faces="false" data-auto-logout-link="true"></div>
    */
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
