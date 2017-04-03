
import React from 'react';
import ActivityCard from './ActivityCard';

class ActivitiesList extends React.Component {

    render() {

        const styles = {
            activitiesStyle: {
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-around",
                width: '100%',
            }
        };

        // If no activities found
        if (this.props.activities.length < 1) {
            return <h1>Ingen aktiviteter funnet</h1>;
        }

        const activities = this.props.activities.map(activity =>
            <ActivityCard key={activity.pk} activity={activity.fields} id={activity.pk}/>
        );
        return <div style={styles.activitiesStyle}>
            {activities}
        </div>
    }
}

export default ActivitiesList;
