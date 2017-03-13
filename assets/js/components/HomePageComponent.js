import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import {Thumbnail, Glyphicon} from 'react-bootstrap';
import ActivityModal from '../ActivityModal';

import {getMonth, getDay} from '../DateFunctions';

class HomePageContainer extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }

    }


    componentWillMount() {
        this.showMap = this.showMap.bind(this);
    }



    createActivityItem(){
        let poster = null;
        if(this.props.activity.images.length > 0 && this.props.activity.images[0] != ''){
            console.log(this.props.activity.images);
            poster = '/media/'+ this.props.activity.images;
            console.log(poster);
        }
        return (
            <div key={this.props.activity.id}>
                <Thumbnail
                    className="activitySmalStyle"
                    src={poster}
                    onClick={this.openActivityModal.bind(this)}
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
                            <p>{this.props.activity.date.getDate()}. {getMonth(this.props.activity.date.getMonth())}</p>
                            <p>{this.props.activity.time_start} - {this.props.activity.time_end}</p>
                            <p>{this.props.activity.location}</p>
                        </div>
                    </div>
                    <ActivityModal id={this.props.activity.id} show={this.state.show}>test</ActivityModal>
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

    showMap() {
        window.open('https://www.google.no/maps/place/' + this.state.location, '_blank');
    }

    openActivityModal() {
       this.setState({show:true})
    }
}


// connect actually calles the functions so that their purposes are fulfilled
export default HomePageContainer;
