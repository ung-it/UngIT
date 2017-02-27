import React, { Component } from 'react';
import {Button} from "react-bootstrap";

class FacebookButton extends Component {
        constructor(props) {
        super(props);

        this.state = {
            connected: "",
            buttonText: ""
        };

        this.handleLogInOut = this.handleLogInOut.bind(this);
        this.checkLoginState = this.checkLoginState.bind(this);
        this.testAPI = this.testAPI.bind(this);
   }


    componentDidMount() {
    window.fbAsyncInit= function() {
        FB.init({
            appId      : '1658650714438155',
            cookie     : true,  // enable cookies to allow the server to access
                            // the session
            fields     : 'id,name,email,picture',
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.8' // use version 2.1
        });
    }.bind(this);
    this.checkLoginState();

    }

    handleLogInOut() {
        var that = this;
        if(this.state.connected === "notconnected"){
            FB.login(function(response) {
                console.log(response);
                that.checkLoginState();
            });
        }
        else{
            FB.logout(function(response) {
                console.log(response);
                that.checkLoginState();
            });
        }
    }


    testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', 'GET', {fields: 'name,id,picture,email'}, function(response) {
            console.log('Successful login for: ' + response.name);
            console.log('Thanks for logging in, ' + response.name + '!');
            console.log(JSON.stringify(response));

        });
    }

    checkLoginState() {
        FB.getLoginStatus(function(response) {
            console.log(response);
            if (response.status === 'connected') {
                this.setState(() => ({
                    connected: "connected",
                    buttonText: "Log out"
                }));
            } else {
                this.setState(() => ({
                    connected: "notconnected",
                    buttonText: "Log in"
                }));
            }
        }.bind(this));
    }


    render(){
        return (
            <div>
                <Button id="" onClick={this.handleLogInOut}>{this.state.buttonText + " with Facebook"}</Button>
                <Button onClick={this.checkLoginState}>Status</Button>
            </div>
        );
    }
}

export default FacebookButton;
