/**
 * Created by ingrskar on 3/6/2017.
 */
import {getAllActivities} from "../APIFunctions";
import {getActivityInfo} from '../APIFunctions';

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
                    console.log(oneActivity);
                }).bind(this);
                return {
                    type: 'ACTIVITY_FETCHED',
                    payload: tempActivities
                };
            })
        })};
