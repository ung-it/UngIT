import React from "react"
import {connect} from "react-redux"
import {Thumbnail, Glyphicon} from 'react-bootstrap';


const moment = require('moment');


class ProviderCard extends React.Component {

    constructor(props) {
        super(props);

    };


    createProviderItem = () => {

        this.props.provider.replace("Kategori(er) ", "Kategorier");
        const provider = JSON.parse(this.props.provider);

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
                                    <p>{provider.Kategorier}</p>
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
