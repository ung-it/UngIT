export function getActivityInfo(id, callback) {
    fetchFromServer('/api/activity/' + id).then(data => {
        callback(data[0].fields);
    });

}

export function getUpcomingActivities(callback) {
    fetchFromServer('/api/activities/').then(data => {
        const ids = data.map(activity => {
            return activity.pk;
        });
        callback(ids);
    });
}

export function getAllActivitiesAsArrayForReducer(callback) {

    fetchFromServer('/api/activities/').then(data => {
        callback(data);
    });
}

//Use only this method when doing GET-requests to server for JSON-data, don't make your own
function fetchFromServer(query) {
    return fetch(query, {
        credentials: "same-origin"
    }).then(response => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(result) {
        if(result.error || result.length == 0) {
            console.log("This query gave an empty result or threw an error:\n" + query);
            return [];
        }
        else {
            return result;
        }
    });
}

