import React from "react"
import {connect} from "react-redux"
import {Thumbnail, Glyphicon} from 'react-bootstrap';


const moment = require('moment');


class ProviderCard extends React.Component {

    constructor(props) {
        super(props);

    };


    createProviderItem = () => {
        const provider = JSON.parse(this.props.provider
            .replace("Kategori(er) ", "Kategorier")
            .replace("Type aktivitet ", "TypeAktivitet")
        );

        console.log(provider);

        if(!provider.Navn){
            return null;
        }


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
                                <div className="col-md-8">
                                    <p>Kategorier: {provider.Kategorier}</p>
                                    <p>{provider.TypeAktivitet}</p>
                                    <p>Bydel: {provider.Bydel}</p>
                                    <p>Telefon: {provider.Telefon}</p>
                                    <p>Internettadresse: {provider.Internettadresse}</p>
                                    <p>Medlemmer: {provider.Medlemmer}</p>
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
