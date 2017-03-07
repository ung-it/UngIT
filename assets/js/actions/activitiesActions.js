/**
 * Created by ingrskar on 3/6/2017.
 */
import {getAllActivities} from "./../components/APIFunctions";
import {getActivityInfo} from './../components/APIFunctions';

export function fetchActivities() {
   return function(dispatch) {

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
                        timeStart: data.time_start.substring(0,data.time_start.lastIndexOf(":")),
                        timeEnd: data.time_end.substring(0,data.time_end.lastIndexOf(":")),
                        images: data.images.split(","),
                        videos: data.videos.split(",")
                    });
                    tempActivities.push({key: id, activity: oneActivity});
                    //console.log(tempActivities)
                }.bind(this));

                })
        }.bind(this));
        // console.log("second");
        // console.log(tempActivities);

        dispatch({type: "FETCH_ACTIVITIES_FULFILLED", payload: tempActivities});
}
