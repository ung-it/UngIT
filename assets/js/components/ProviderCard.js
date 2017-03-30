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
                    className="demo-card-wide mdl-card mdl-shadow--2dp"
                >
                    <h3 className="big-info-header-provider">{provider.Navn}</h3>

                    <div classID="big-info-container">
                        <div className="big-icon-container-div"><Glyphicon
                            glyph="glyphicon glyphicon-map-marker"/>{provider.Adresse}</div>
                    </div>
                    <div className="provider-info">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-md-3">
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
                                <p className="provider-card-bold-info">Aktiviteter</p>
                                <ul>
                                    <li>Ingen registrert</li>
                                </ul>
                            </div>
                            {/*<div className="col-sm-4">*/}
                            {/*<p className="provider-card-bold-info">Aktiviteter</p>*/}
                            {/*<ul>*/}
                            {/*<li>Ingen registrert</li>*/}
                            {/*</ul>*/}
                            {/*</div>*/}
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
