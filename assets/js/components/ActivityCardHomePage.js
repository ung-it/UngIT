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
        let poster = null;

        if(this.props.activity.images.length > 0){
            poster = this.props.activity.images;
        }

        return (
            <div key={this.props.activity.id}>
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
                            <p>{getMonth(this.props.activity.date)}</p>
                            <p>{this.props.activity.time_start} - {this.props.activity.time_end}</p>
                            <p>{this.props.activity.location}</p>
                        </div>
                    </div>
                    <ActivityModal id={this.props.id} activity={this.props.activity} show={this.state.show} />
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

export default ActivityCardHomePage;
