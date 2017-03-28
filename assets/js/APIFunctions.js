import 'whatwg-fetch';

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

export function getAllActivities() {
    return fetchFromServer('/api/activities/').then(response => {
        return response;
    });
}

export function getFacebookEventData(activities) {

    let eventIDs = activities
        .filter(activity => {return activity.fields.facebookID})
        .map(activity => {return activity.fields.facebookID});

    return new Promise(function (resolve) {
        getAccessToken(resolve);
    }).then(token => {

        let batch = eventIDs.map(id => {
            return {method:"GET", relative_url: id + "?fields=admins,attending,photos{images},picture,roles,videos"};
        });
        let data = {
            access_token: token,
            batch: batch
        };
        return postToServer('https://graph.facebook.com/v2.8/', data).then(data => {
            for (let i = 0; i < data.length; i++) {
                let jsonObject = JSON.parse(data[0].body);
                for (let j in activities) {
                    if (activities[j].fields.facebookID == jsonObject.id) {
                        activities[j].fields.facebook = jsonObject;
                    }
                }
            }
            return activities;
        });
    });

}

function mapActivityToId() {

}

export function getComments(id) {
    return fetchFromServer('/comments/'+id);
}


export function getAllAttendingActivities() {
    const profileName = window.location.href.split("/")[4];
    return fetchFromServer('/api/attendingActivities/'+profileName);
}
export function getAllHostingActivities() {
    const profileName = window.location.href.split("/")[4];
    return fetchFromServer('/api/hostingActivities/'+profileName);
}

export function signupActivity(data) {
    return postToServer('/signupActivity/', data);
}

export function signoffActivity(data) {
    return postToServer('/signOfEvent/', data);
}

export function checkIfSignedUp(data) {
    return postToServer('/checkIfSignedUp/', data);
}

export function postNewRating(object) {
    return postToServer('/rateActivity/', object);
}

export function postNewComment(object) {
    return postToServer('/postComment/', object);
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
        if (result.error || result.length == 0) {
            console.log("This query gave an empty result or threw an error:\n" + query);
            return Promise.reject(result.error);
        } else {
            return result;
        }
    });
}

function postToServer(query, data) {
    return fetch(query, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "same-origin",
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json();
    }).then(function (result) {
        return result;
    })
}
