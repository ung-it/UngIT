import React from "react"
import {connect} from "react-redux"
import {Thumbnail, Glyphicon, Button} from 'react-bootstrap';
import  {follow, unfollow, checkIfFollowing, getUserState } from "../APIFunctions";


const moment = require('moment');


class ProviderCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            following: false,
            hasChecked: false,
            loggedIn: false

        }
    };

    onFollow = () => {
        const request = {
            id: this.props.pk
        };
        follow(request, response => {
            if (response.following == false) {
                this.setState({
                    following: true
                });
            }
        });
    };

    onUnfollow = () => {
        const request = {
            id: this.props.pk
        };
        unfollow(request, response => {
            if (response.following == true) {
                this.setState({
                    following: false
                });
            }
        });
    };


    onCheckIFollowing = () => {
        const request = {
            id: this.props.pk
        };
        checkIfFollowing(request, response => {
            if (response.following == true) {
                this.setState({
                    attending: true,
                    hasChecked: true,
                    loggedIn: true
                });
            } else if (response.following == false) {
                this.setState({
                    loggedIn: true,
                    hasChecked: true
                });
            } else {
                this.setState({
                    loggedIn: false,
                    hasChecked: true
                })
            }
        })
    };

    checkUserState = () => {
        getUserState(response => {
            console.log(response);
            if(response.active){
                this.setState({
                    loggedIn: true,
                    hasChecked: true
                });
                return true;

            }
            else{
                this.setState({
                   loggedIn: false,
                    hasChecked:true
                });
                return false;
            }
        })
    };


    createProviderItem = () => {
        const provider = this.props.provider;
        let followingContainer = null;

        if (!this.state.loggedIn) {
            followingContainer =
                <div className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <p>Du må være logget inn for å kunne følge denne aktøren</p>
                    </div>
                </div>;
        } else if (this.state.following == false) {
            followingContainer =
                <div className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <Button id="followButton" className="btn btn-success" onClick={this.onFollow}>Følg</Button>
                    </div>
                </div>;

        } else {
            followingContainer =
                <div className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <Button id="followButton" onClick={this.onUnfollow} className="btn btn-danger">Slutt å følge</Button>
                    </div>
                </div>;
        }


        return (

            <div key={provider.Id}
                 className="provider-card">
                <div
                    className="demo-card-wide mdl-card mdl-shadow--2dp"
                >
                    <h3 className="big-info-header-provider">{provider.Navn}</h3>
                    <div classID="big-info-container">
                        <div className="big-icon-container-div"><Glyphicon
                            glyph="glyphicon glyphicon-map-marker"/>{provider.Adresse}</div>
                    </div>
                    <p className="provider-card-bold-info">Aktiviteter</p>
                    <ul>
                        <li>Ingen registrert</li>
                    </ul>
                    <div className="provider-info">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-md-4">
                                        <p className="provider-card-bold-info">Kategorier: </p>
                                        <p className="provider-card-bold-info">Type aktiviteter: </p>
                                        <p className="provider-card-bold-info">Bydel: </p>
                                        <p className="provider-card-bold-info">Telefon: </p>
                                        <p className="provider-card-bold-info">Internettadresse:
                                        </p>
                                        <p className="provider-card-bold-info">Medlemmer: </p>
                                    </div>
                                    <div className="col-md-7">
                                        <p>{provider["Kategori(er) "]}</p>
                                        <p>{provider["Type aktivitet "]}</p>
                                        <p>{provider.Bydel}</p>
                                        <p>{provider.Telefon}</p>
                                        <p><a href={provider.Internettadresse}
                                              target="_blank">{provider.Internettadresse}</a>
                                        </p>
                                        <p>{provider.Medlemmer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {followingContainer}
                </div>
            </div>
        )

    };


    render() {


        return (
            <div>
                {this.createProviderItem()}
            </div>
        );
    }
}

export default ProviderCard;
