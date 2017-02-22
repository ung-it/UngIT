export function getActivityInfo(id, callback) {
    fetchFromServer().then(data => {
        callback(data);
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
            return JSON.parse(result);
        }
    });
}