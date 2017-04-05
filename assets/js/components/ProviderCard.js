import React from "react"
import {connect} from "react-redux"
import {Thumbnail, Glyphicon} from 'react-bootstrap';


const moment = require('moment');


class ProviderCard extends React.Component {

    constructor(props) {
        super(props);

    };


    createProviderItem = () => {
        const provider = this.props.provider;

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
