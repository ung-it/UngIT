/**
 * Created by ingrskar on 3/8/2017.
 */
import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import { fetchActivities } from "../actions/activitiesActions";
import {Thumbnail, Glyphicon} from 'react-bootstrap';
import ActivityModal from '../ActivityModal';

class ActivityPageContainer extends React.Component {

    componentWillMount() {
        this.showMap = this.showMap.bind(this);
        //console.log('mount from ActivityPageContainer');
    }



    // <ActivityModal id={activity.id} show={activity.show}>test</ActivityModal> <-- add between </div< and </Thumbnail>

    createActivityItem(){
        console.log(this.props);
        //console.log('^ came from createActivityItem in APC' );
        let poster = null;
        return this.props.activities.activities.map((activity) => {
            return (
                <div
                    key={activity.id}
                >
                    <Thumbnail
                        className="activityBigStyle"
                        src={poster}
                        onClick={this.openActivityModal.bind(this)}
                        title="Klikk på aktiviteten for mer informasjon"
                    >
                        <h3>{activity.title}</h3>
                        <div className="info-box-wrapper">
                            <div className="icon-container">
                                <p><Glyphicon glyph="glyphicon glyphicon-calendar"/></p>
                                <p><Glyphicon glyph="glyphicon glyphicon-time"/></p>
                                <p><Glyphicon glyph="glyphicon glyphicon-map-marker"/></p>
                            </div>
                            <div className="info-container">
                                <p>{activity.date.getDate()}. {activity.date.getMonth()}</p>
                                <p>{activity.timeStart.toDateString()} - {activity.timeEnd.toDateString()}</p>
                                <p>{activity.location}</p>
                            </div>
                            <div className="about-container">
                                <p>{activity.description}</p>
                            </div>
                        </div>

                    </Thumbnail>
                </div>
            );
        })
    }

    createActivityItemTest(){
        let poster = null;
        return (
                <div
                    key={this.props.activity.id}
                >
                    <Thumbnail
                        className="activityBigStyle"
                        src={poster}
                        onClick={this.openActivityModal.bind(this)}
                        title="Klikk på aktiviteten for mer informasjon"
                    >
                        <h3>{this.props.activity.title}</h3>
                        <div className="info-box-wrapper">
                            <div className="icon-container">
                                <p><Glyphicon glyph="glyphicon glyphicon-calendar"/></p>
                                <p><Glyphicon glyph="glyphicon glyphicon-time"/></p>
                                <p><Glyphicon glyph="glyphicon glyphicon-map-marker"/></p>
                            </div>
                            <div className="info-container">
                                <p>{this.props.activity.date.getDate()}. {this.props.activity.date.getMonth()}</p>
                                <p>{this.props.activity.timeStart.toDateString()} - {this.props.activity.timeEnd.toDateString()}</p>
                                <p>{this.props.activity.location}</p>
                            </div>
                            <div className="about-container">
                                <p>{this.props.activity.description}</p>
                            </div>
                        </div>

                    </Thumbnail>
                </div>
            );
        };



    render() {
        console.log(' su render me from ActivitiesPage Container ');

        // if (this.state.images.length > 0 && this.state.images[0] != "") {
        //     poster = "/media/" + this.state.images[0];
        // }
        return (
            <div>
                {this.createActivityItemTest()}
            </div>
        );
    }

    showMap() {
        window.open('https://www.google.no/maps/place/' + this.state.location, '_blank');
    }

    openActivityModal() {
        this.setState({show: true})
    }
}

// Takes the provider store that is given when called, and gives this container the this.props.whatWeCallIt
// function mapStateToProps(state) {
//     //console.log(state.activity);
//     //console.log("^ is from mapStateToProps in APC");
//     return {
//         activities: state.activity
//     };
// }

// function matchDispatchToProps(dispatch){
//     return bindActionCreators({fetchActivities: fetchActivities }, dispatch);
// }

// connect actually calles the functions so that their purposes are fulfilled
export default ActivityPageContainer;
