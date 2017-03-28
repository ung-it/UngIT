import React from "react"
import { connect } from "react-redux"
import { Thumbnail, Glyphicon } from 'react-bootstrap';





const moment = require('moment');


class ProviderCard extends React.Component {

    constructor(props) {
        super(props);
        
    };


     createProviderItem = () =>{
         const provider = JSON.parse(this.props.provider);
         return provider.Navn

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
