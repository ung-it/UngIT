import React, { Component } from 'react';
import {Thumbnail, Glyphicon, Modal, Button} from 'react-bootstrap';
import {getActivityInfo} from './APIFunctions';
import {getMonth} from './DateFunctions';
import ActivityModal from './ActivityModal';
import CalendarDateBox from './CalendarDateBox';

//Imports for Modal
import '../styles/activityBox.css';

class AllActivitiesBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,

            title: "",
            provider: "",
            adaptions: "",
            age: "",
            location: "",
            description: "",
            price: "",
            date: new Date(),
            timeStart: "",
            timeEnd: "",
            images: [],
            videos: []
        };

        getActivityInfo(this.props.id, function (data) {
            let images = data.images.split(",").filter(image => {
                return image != "";
            }).map(image => {
                return "/media/" + image;
            });
            images = images.concat(data.instagram.split(",").filter(image => {
                return image != "";
            }));
            this.setState({
                title: data.activityName,
                provider: data.provider,
                adaptions: data.adaptions,
                age: data.age,
                location: data.location,
                description: data.description,
                price: data.price,
                date: new Date(data.date),
                timeStart: data.time_start.substring(0,data.time_start.lastIndexOf(":")),
                timeEnd: data.time_end.substring(0,data.time_end.lastIndexOf(":")),
                images: images,
                videos: data.videos.split(",")
            });
        }.bind(this));

        this.showMap = this.showMap.bind(this);
    }

    render() {

        let poster = null;
        if (this.state.images.length > 0 && this.state.images[0] != "") {
            poster = this.state.images[0];
        }
        return (
            <div tabIndex={this.props.tabIndex}>
                <Thumbnail
                    className="activityBigStyle"
                    src={poster}
                    onClick={this.openActivityModal.bind(this)}
                    title="Klikk på aktiviteten for mer informasjon">
                    <h3>{this.state.title}</h3>
                    <div className="info-box-wrapper">
                        <div className="icon-container">
                            <p><Glyphicon glyph="glyphicon glyphicon-calendar"/></p>
                            <p><Glyphicon glyph="glyphicon glyphicon-time"/></p>
                            <p><Glyphicon glyph="glyphicon glyphicon-map-marker"/></p>
                        </div>
                        <div className="info-container">
                            <p>{this.state.date.getDate()}. {getMonth(this.state.date.getMonth())}</p>
                            <p>{this.state.timeStart} - {this.state.timeEnd}</p>
                            <p>{this.state.location}</p>
                        </div>
                        <div className="about-container">
                            <p>{this.state.description}</p>
                        </div>
                    </div>
                </Thumbnail>
                <ActivityModal id={this.props.id} show={this.state.show}></ActivityModal>
            </div>
        );
    }

    showMap() {
        window.open('https://www.google.no/maps/place/' + this.state.location,'_blank');
    }

    openActivityModal() {
        this.setState({show: true})
    }
}

export default AllActivitiesBox;
