<div className="fb-login-button" data-size="large" data-show-faces="false" data-auto-logout-link="true"></div>
import React, { Component } from 'react';
import {Button} from "react-bootstrap";

class FacebookButton extends Component {
        constructor(props) {
        super(props);

        this.state = {
        };

        this.handleClick = this.handleClick.bind(this);
        this.checkLoginState = this.checkLoginState.bind(this);
        this.statusChangeCallback = this.statusChangeCallback.bind(this);
        this.testAPI = this.testAPI.bind(this);
   }


    componentDidMount() {
    window.fbAsyncInit= function() {
        FB.init({
          appId      : '1658650714438155',
          cookie     : true,  // enable cookies to allow the server to access
                            // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.3' // use version 2.1
        });
    }.bind(this);

        /*
    // Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/nb_NO/sdk.js#xfbml=1&version=v2.8&appId=1658650714438155";
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
         */

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


    render(){
        return (
            <div>
                <div id="fb-root"></div>
                <div
                    className="fb-login-button"
                    data-size="large"
                    data-show-faces="false"
                    data-auto-logout-link="true">
                </div>
                <Button onClick={this.checkLoginState}>Status</Button>
            </div>
        );
    }
}

export default FacebookButton;
