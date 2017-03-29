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
            <div key={provider.Id}>
                <div
                    className="activityBigStyle"
                >
                    <div className="row">
                        <div className="col-sm-9">
                            <h3 className="big-info-header">{provider.Navn}</h3>
                            <div className="row">
                                <div classID="big-info-container" className="col-md-3">
                                    <div className="big-icon-container-div"><Glyphicon
                                        glyph="glyphicon glyphicon-map-marker"/>{provider.Adresse}</div>
                                </div>
                                <div className="col-md-10">
                                    <div className="row">
                                        <div className="col-sm-10">
                                        <p>Kategorier: {provider["Kategori(er) "]}</p>
                                        <p>Type aktiviteter: {provider["Type aktivitet "]}</p>
                                        <p>Bydel: {provider.Bydel}</p>
                                        <p>Telefon: {provider.Telefon}</p>
                                        <p>Internettadresse: <a href={provider.Internettadresse}
                                                                target="_blank">{provider.Internettadresse}</a>
                                        </p>
                                        <p>Medlemmer: {provider.Medlemmer}</p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p>Aktiviteter</p>
                                            <ul>
                                                <li>Ingen registrert</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
