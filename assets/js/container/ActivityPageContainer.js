/**
 * Created by ingrskar on 3/8/2017.
 */
import React from "react"
import { connect } from "react-redux"
import {bindActionCreators} from 'redux';
import { fetchActivities } from "../actions/activitiesActions"

class ActivityPageContainer extends React.Component {

    componentWillMount() {
        this.showMap = this.showMap.bind(this);
        console.log('mount from ActivityPageContainer');
    }

    createActivityItem(){
        return this.props.activities.map((activity) => {
            return (
                <div tabIndex={activity.tabIndex}>
                <Thumbnail
                    className="activityBigStyle"
                    src={poster}
                    onClick={this.openActivityModal.bind(this)}
                    title="Klikk på aktiviteten for mer informasjon">
                    <h3>{activity.title}</h3>
                    <div className="info-box-wrapper">
                        <div className="icon-container">
                            <p><Glyphicon glyph="glyphicon glyphicon-calendar"/></p>
                            <p><Glyphicon glyph="glyphicon glyphicon-time"/></p>
                            <p><Glyphicon glyph="glyphicon glyphicon-map-marker"/></p>
                        </div>
                        <div className="info-container">
                            <p>{activity.date.getDate()}. {getMonth(activity.date.getMonth())}</p>
                            <p>{activity.timeStart} - {activity.timeEnd}</p>
                            <p>{activity.location}</p>
                        </div>
                        <div className="about-container">
                            <p>{activity.description}</p>
                        </div>
                    </div>
                </Thumbnail>
                <ActivityModal id={activity.id} show={activity.show}></ActivityModal>
            </div>
            );
        })
    }

    render() {
        console.log(' su render me from ActivitiesPage Container ');
        let poster = null;
        // if (this.state.images.length > 0 && this.state.images[0] != "") {
        //     poster = "/media/" + this.state.images[0];
        // }
        return (
            <div>{this.createActivityItem()};</div>
        );
    }

    showMap() {
        window.open('https://www.google.no/maps/place/' + this.state.location, '_blank');
    }

    openActivityModal() {
        this.setState({show: true})
    }
}

function mapStateToProps(state) {
    return {
        activities: state.activities
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({fetchActivities: fetchActivities }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ActivityPageContainer);
