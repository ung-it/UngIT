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
    return fetchFromServer('/api/activities/');
}

export function getAllAttendingActivities() {
    const profileName = window.location.href.split("/")[4];
    return fetchFromServer('/api/attendingActivities/'+profileName);
}
export function getAllHostingActivities() {
    const profileName = window.location.href.split("/")[4];
    return fetchFromServer('/api/hostingActivities/'+profileName);
}

export function signupActivity(id) {
    let data = {
        id: id
    };
    postToServer('http://localhost:8000/signupActivity/', data);
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
        console.log(response);
        if(response.status == 204){
            this.setState({
                attending: true
            });
        }
        return response.status;
    })
}
