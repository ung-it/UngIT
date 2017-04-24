
import React from 'react';
import ActivityCard from './ActivityCard';

class ActivitiesList extends React.Component {

    render() {

        // If no activities found
        if (this.props.activities.length < 1) {
            return <h1>Ingen aktiviteter funnet</h1>;
        }

        const activities = this.props.activities.map(activity =>
            <div className="col-md-6" key={activity.pk}>
                <ActivityCard  activity={activity.fields} id={activity.pk}/>
            </div>
        );
        return <div className="row">
            {activities}
        </div>
    }
}

export default ActivitiesList;
