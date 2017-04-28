import React from "react"
import { connect } from "react-redux"
import { Thumbnail, Glyphicon } from 'react-bootstrap';
import { getMonth } from '../DateFunctions'
import ActivityModal from './ActivityModal';

const moment = require('moment');

class ActivityCardHomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    };

    openActivityModal = () => {
        this.setState({
            show: true
        });
    };

    createActivityItem = () => {

        let activity = this.props.activity;

        let localImages = new Array(activity.images).filter(image => {
            return image != "";
        }).map(image => {
            return '/media/' + image;
        });
        let instaImages = activity.instagram.split(",").filter(image => {
            return image != "";
        });

        let images = localImages.concat(instaImages);

        let facebookIcon = null;
        if (activity.facebook != null) {

            let fImages = activity.facebook.photos.data.map(image => {
                return image.images[0].source;
            });

            images = images.concat(fImages);

            let link = 'https://www.facebook.com/events/' + activity.facebookID;

            facebookIcon = (
                <div className="facebook-icon-wrapper">
                    <div className="facebook-icon-container">
                        <a href={link} target="__blank">
                            <img src="/static/images/facebook-icon.svg" id="facebookIcon"/>
                        </a>
                        <div className="mdl-tooltip  mdl-tooltip--large" data-mdl-for="facebookIcon">
                            Dette arrangementet er linket til et Facebook arrangement<br/><br/>
                            Klikk på ikonet for å se arrangementet på Facebook
                        </div>
                    </div>
                </div>
            )
        }

        let poster = null;
        if (images.length > 0) {
            poster = images[0];
        } else {
            poster = "/static/images/activityPic.jpg"
        }

        let dato = new Date(this.props.activity.date);
        let datoEnd = new Date(this.props.activity.date_end);

        let date = dato.getDate() + ". " + getMonth(dato.getMonth())+ " - " + datoEnd.getDate() + ". " + getMonth(datoEnd.getMonth());

        const divStyle = {
            backgroundImage: 'url(' + poster + ')',
            width: '22em',
            height: '22em',
            backgroundSize: '25em 25em',
            borderRadius: '3px',
            backgroundRepeat: 'no-repeat',
            display: 'flex'
        };

        return (
            <div key={this.props.activity.id}
                 className="activitySmallStyle">
                {facebookIcon}
                <div className="demo-card-square mdl-card mdl-shadow--2dp">
                    <div
                        onClick={this.openActivityModal}
                        title="Klikk på aktiviteten for mer informasjon"
                        style={divStyle}>
                        <div className="info-box-wrapper">
                            <h3 className="info-header">{this.props.activity.activityName}</h3>
                            <div className="icon-container">
                                <div className="row">
                                    <p className="col-md-7"><Glyphicon glyph="glyphicon glyphicon-calendar"/> {date}</p>
                                    <p className="col-md-5"><Glyphicon
                                        glyph="glyphicon glyphicon-time"/> {this.props.activity.time_start.slice(0, 5)} - {this.props.activity.time_end.slice(0, 5)}</p>
                                </div>
                                <p><Glyphicon glyph="glyphicon glyphicon-map-marker"/> {this.props.activity.location}
                                </p>
                            </div>
                        </div>
                        <ActivityModal id={this.props.id} activity={this.props.activity} images={images}
                                       show={this.state.show}/>
                    </div>
                </div>

            </div>
        );
    };

    render() {
        return (
            <div>
                {this.createActivityItem()}
            </div>
        );
    }
}

export default ActivityCardHomePage;
