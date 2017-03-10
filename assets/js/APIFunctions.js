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

export function getAllActivitiesAsArrayForReducer() {
    return fetch('/api/activities/', {
        credentials: "same-origin"
    }).then(response => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json()
    });

}
