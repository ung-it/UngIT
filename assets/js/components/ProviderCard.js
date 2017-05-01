import React from "react"
import {connect} from "react-redux"
import {Thumbnail, Glyphicon, Button} from 'react-bootstrap';
import {follow, unfollow} from "../APIFunctions";

const moment = require('moment');

class ProviderCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            following: this.props.following,
            hasChecked: false,
            loggedIn: false
        }
    };

    onFollow = () => {
        const request = {
            id: this.props.pk
        };
        follow(request, response => {
            if (!response.following) {
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
            if (response.following) {
                this.setState({
                    following: false
                });
            }
        });
    };

    createProviderItem = () => {
        const provider = this.props.provider;
        let followingContainer = null;

        if (this.state.following === null) {
            followingContainer = <div></div>;
        }
        else if (!this.state.following) {
            followingContainer =
                <div className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <Button id="followButton" className="btn btn-success" onClick={this.onFollow}>Følg</Button>
                    </div>
                </div>;

        } else if (this.state.following) {
            followingContainer =
                <div className="modal-infobox2">
                    <div className="modal-infobox2-element">
                        <Button id="followButton" onClick={this.onUnfollow} className="btn btn-danger">Slutt å
                            følge</Button>
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

                    <div classID="bold-info-text">
                        <div className="big-icon-container-div"><Glyphicon
                            glyph="glyphicon glyphicon-map-marker"/>{provider.Adresse}</div>
                    </div>
                    <div className="provider-info">
                        <p className="bold-info-text">Aktiviteter</p>
                        <ul>
                            <li>Ingen registrert</li>
                        </ul>
                        <p><span className="bold-info-text"> Kategorier: </span> {provider["Kategori(er) "]} </p>
                        <p><span className="bold-info-text"> Type aktiviteter: </span> {provider["Type aktivitet "]}</p>
                        <p><span className="bold-info-text"> Bydel: </span> {provider.Bydel}</p>
                        <p><span className="bold-info-text"> Telefon: </span> {provider.Telefon}</p>
                        <p><span className="bold-info-text"> Internettadresse: </span> <a
                            href={provider.Internettadresse}
                            target="_blank">{provider.Internettadresse}</a></p>
                        <p><span className="bold-info-text"> Medlemmer: </span> {provider.Medlemmer}</p>
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
