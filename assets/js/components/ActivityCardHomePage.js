import React from "react"
import { connect } from "react-redux"
import {Thumbnail, Glyphicon} from 'react-bootstrap';

import ActivityModal from './ActivityModal';
import {getMonth, getDay} from '../DateFunctions';

class ActivityCardHomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    };

    openActivityModal = () =>  {
       this.setState({
           show:true
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

        let poster = null;
        if(images.length > 0){
            poster = images[0];
        }

        let facebookIcon = null;
        if (activity.facebookID != null) {

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

        let dato = new Date(this.props.activity.date);
        dato = dato.getDate() + ". "+ getMonth(dato.getMonth());

        return (
            <div key={this.props.activity.id}>
                {facebookIcon}
                <Thumbnail
                    className="activitySmalStyle"
                    src={poster}
                    onClick={this.openActivityModal}
                    title="Klikk på aktiviteten for mer informasjon"
                >
                    <h3>{this.props.activity.activityName}</h3>
                    <div className="info-box-wrapper">
                        <div className="icon-container">
                            <p><Glyphicon glyph="glyphicon glyphicon-calendar"/></p>
                            <p><Glyphicon glyph="glyphicon glyphicon-time"/></p>
                            <p><Glyphicon glyph="glyphicon glyphicon-map-marker"/></p>
                        </div>
                        <div className="info-container">
                            <p>{dato}</p>
                            <p>{this.props.activity.time_start} - {this.props.activity.time_end}</p>
                            <p>{this.props.activity.location}</p>
                        </div>
                    </div>
                    <ActivityModal id={this.props.id} activity={this.props.activity} images={images} show={this.state.show} />
                </Thumbnail>
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

// connect actually calles the functions so that their purposes are fulfilled
export default ActivityCardHomePage;
