import 'whatwg-fetch';

const Promise = require("promise-polyfill");
const setAsap = require("setasap");
Promise._immediateFn = setAsap;

if(!window.Promise){
    window.Promise = Promise;
}


export function getUserState(callback) {
    return fetchFromServer('/checkIfLogedIn/').then(response => {
        callback(response.active);
    });
}

export function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export function getUser(callback) {
    return fetchFromServer('/api/user/').then(response => {
        callback(response);
    });
}

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

export function getAllOrganisations(callback) {
    return fetchFromServer('/api/providers/').then(response => {
        callback(response);
    });
}

export function getUserProviders(callback) {
    return fetchFromServer('/api/userproviders/').then(response => {
        callback(response);
    })
}

export function getAllProviders() {
    return fetchFromServer('/api/providers/')
}

export function getProvider(id, callback) {
    fetchFromServer('/api/provider/' + id).then(response => {
        callback(response);
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
            return {method:"GET", relative_url: id + "?fields=admins,attending_count,maybe_count,photos{images},picture,roles,videos"};
        });
        if (batch.length == 0) {
            return activities;
        }
        let data = {
            access_token: token,
            include_headers: false,
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

export function getComments(id, callback) {
    fetchFromServer('/comments/'+id).then(comments => {
        callback(comments);
    });
}

export function getAllAttendingActivities() {
    const profileName = window.location.href.split("/")[4];
    return fetchFromServer('/api/attendingActivities/'+profileName);
}

export function getAllHostingActivities() {
    const profileName = window.location.href.split("/")[4];
    return fetchFromServer('/api/hostingActivities/'+profileName);
}

export function getHost(id, callback) {
    fetchFromServer('/api/getHost/' + id).then(result => {
        callback(result);
    });
}


export function signupActivity(data, callback) {
    postToServer('/signupActivity/', data).then (response => {
        callback(response);
    });
}

export function signoffActivity(data, callback) {
    postToServer('/signOfEvent/', data).then(response => {
        callback(response);
    });
}

export function checkIfSignedUp(data, callback) {
    postToServer('/checkIfSignedUp/', data).then(response => {
        callback(response);
    });
}

export function follow(data, callback) {
    postToServer('/follow/', data).then (response => {
        callback(response);
    });
}

export function unfollow(data, callback) {
    postToServer('/unfollow/', data).then(response => {
        callback(response);
    });
}

export function checkIfFollowing(data, callback) {
    postToServer('/checkIfFollowing/', data).then(response => {
        callback(response);
    });
}

export function getFollowingProviders(callback) {
    return fetchFromServer('/getFollowingProviders/').then (response => {
        callback(response);
    });
}

export function postNewRating(object) {
    return postToServer('/rateActivity/', object);
}

export function postNewComment(object, callback) {
    return postToServer('/postComment/', object).then(comments => {
        callback(comments);
    });
}

//Use only this method when doing GET-requests to server for JSON-data, don't make your own
function fetchFromServer(query) {
    return fetch(query, {
        credentials: "same-origin"
    }).then(response => {
        if (response.status >= 400) {
            throw new Error("GET-request: Bad response from server");
        }
        return response.json();
    }).then(function(result) {
        if (result.error) {
            console.log("The GET-request threw an error:\n" + query);
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
        if (response.status >= 400) {
            throw new Error("POST-request: Bad response from server");
        }
        return response.json();
    }).then(function (result) {
        if (result.error || result.length == 0) {
            console.log("The POST-request threw an error:\n" + query);
            return Promise.reject(result.error);
        } else {
            return result;
        }
    })
}

