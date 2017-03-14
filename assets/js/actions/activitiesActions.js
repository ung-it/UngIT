import {getAllActivities} from "../APIFunctions";
import {getActivityInfo} from '../APIFunctions';


/*
* Action creator and action are two separate things, the action creator is the actual action-function
*
* the action is actually the part that gets returned, and consist only of two things, type and payload.
* type: just a string that explains what action happend, EVERY reducer gets notified with this type when an action
* occurs.
*
* payload: any informasion or extra / new  data needed to perform the action
*
* Action creator and action is just a function that is something you can do on your application,
* like submitting a form, clicking a button, adding a user, etc.
* If that action is to change some state or database or reducer ( something in the store ) we need actions because
* they are used to change the application state
*
* To use an Action, you need to import it in the file where you want to use it, then hook it up, through a onClick, etc.
* But to hook it up, you cant just use it like a import function, then you buypass Redux, NOT cool. So -->
* we need to connect the Action to the containar / component through the connect function and another function called
*   matchDispatchToProps(dispatch) <-- Pass in the action as a prop (this.prop)
*   connect(matchDispatchToProps)(className) <-- Make the pass to the class/container/component
*
* Dispatch means/is just a fancy way of saying 'call a function'
*
* */

export const fetchActivities = () => {

       let tempActivities = [];

        getAllActivities(function (activityID) {
            activityID.map(id => {
                getActivityInfo(id, function (data) {
                    const oneActivity = ({
                        id: id,
                        title: data.activityName,
                        provider: data.provider,
                        adaptions: data.adaptions,
                        age: data.age,
                        location: data.location,
                        description: data.description,
                        price: data.price,
                        date: new Date(data.date),
                        timeStart: data.time_start.substring(0, data.time_start.lastIndexOf(":")),
                        timeEnd: data.time_end.substring(0, data.time_end.lastIndexOf(":")),
                        images: data.images.split(","),
                        videos: data.videos.split(",")
                    }).bind(this);

                    tempActivities.push({activity: oneActivity});
                    console.log('OneActivity activitiesActions'  + oneActivity);

                    return {
                    type: 'ACTIVITY_FETCHED',
                    payload: oneActivity
                };
                }).bind(this);

            })
        })
};
