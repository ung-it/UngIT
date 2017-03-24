function getAccessToken(callback) {
    asyncFacebook(function () {
        FB.getLoginStatus(function (response) {
            callback(response.authResponse.accessToken);
        })
    })
}

function asyncFacebook(callback) {
    if (typeof(FB) != 'undefined' && FB != null ) {
        callback();
        return;
    }
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1658650714438155',
            cookie     : true,  // enable cookies to allow the server to access
            // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.8' // use version 2.1
        });
        callback();
    };
}

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/nb_NO/sdk.js#xfbml=1&version=v2.8&appId=1658650714438155";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function logIn() {
    asyncFacebook(function () {
        FB.login(function(response){
            console.log(response)
            fetchInfo();
        }, {scope: 'user_events'});
    })
}

function getFacebookEvents(callback) {
    asyncFacebook(function () {
        FB.getLoginStatus(function (response) {
            $.get('https://graph.facebook.com'.concat("/me/events?limit=25&since=".concat(String(Date.now() / 1000).split(".")[0]).concat('&access_token=').concat(response.authResponse.accessToken)), function (response) {
                if (response && !response.error) {
                    callback(response.data);
                }
            });
        });
    });
}

// function getFacebookEventData(eventID, callback) {
//     asyncFacebook(function () {
//         FB.getLoginStatus(function (response) {
//             $.get('https://graph.facebook.com/v2.8/'.concat(eventID).concat("?fields=admins,attending,photos{images},picture,roles,videos").concat('&access_token=').concat(response.authResponse.accessToken), function (response) {
//                 if (response && !response.error) {
//                     callback(response);
//                 }
//             });
//         });
//     });
// }

function fetchInfo() {
    FB.api('/me', 'GET', {fields: 'id, age_range, first_name, last_name, email, picture'}, function(response) {
        $('#id_Fusername').val(response.id);
        $('#id_agerange').val(response.age_range.min);
        $('#id_firstname').val(response.first_name);
        $('#id_lastname').val(response.last_name);
        $('#id_email').val(response.email);
        $('#faceForm').submit();
    });
}
