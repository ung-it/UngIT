import React from "react"
import {connect} from "react-redux"
import {Thumbnail, Glyphicon} from 'react-bootstrap';

import ActivityModal from './ActivityModal';
import {getMonth, getDay} from '../DateFunctions';

const moment = require('moment');


class ActivityCard extends React.Component {

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

        let poster = null;
        if (images.length > 0) {
            poster = images[0];
        } else {
            poster = "/static/images/activityPic.jpeg"
        }


        const date = moment(this.props.activity.date).format('DD/MM/YYYY') + ' - ' + moment(this.props.activity.date_end).format('DD/MM/YYYY');
        const divStyle = {
            backgroundImage: 'url(' + poster + ')',
            width: '25em',
            height: '15em',
            backgroundSize: '25em 25em',
            borderRadius: '3px',
            backgroundRepeat: 'no-repeat',
        };

        return (
            <div key={this.props.activity.id}
                 className="activityBigStyle"
                 onClick={this.openActivityModal}
                 title="Klikk på aktiviteten for mer informasjon">

                <div className="activity-card-image-container" style={divStyle}/>

                <div className="activity-card-info-container">
                    <div className="activity-card-header-container">
                        <h3 className="big-info-header"> {this.props.activity.activityName}</h3>
                        <div className="activity-card-row-info">
                            <div className="row">
                                <div classID="big-icon-container-div" className="col-md-4"><Glyphicon
                                    glyph="glyphicon glyphicon-calendar"/>{date}</div>
                                <div classID="big-icon-container-div" className="col-md-4"><Glyphicon
                                    glyph="glyphicon glyphicon-time"/> {this.props.activity.time_start}
                                    - {this.props.activity.time_end}</div>
                                <div classID="big-icon-container-div" className="col-md-4"><Glyphicon
                                    glyph="glyphicon glyphicon-map-marker"/> {this.props.activity.location}</div>
                            </div>
                        </div>
                    </div>
                    <div className="activity-card-description">
                        <p>{this.props.activity.description}</p>
                    </div>
                </div>


                < ActivityModal
                    id={this.props.id}
                    activity={this.props.activity}
                    images={images}
                    show={this.state.show}/>
            </div >
        )
            ;
    };

    render() {
        return (
            <div>
                {this.createActivityItem()}
            </div>
        );
    }
}

export default ActivityCard;
