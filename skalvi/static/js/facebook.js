window.fbAsyncInit = function() {
    FB.init({
        appId      : '1658650714438155',
        cookie     : true,  // enable cookies to allow the server to access
        // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use version 2.1
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/nb_NO/sdk.js#xfbml=1&version=v2.8";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function logIn() {
    FB.login(function(response){
        console.log(response)
        fetchInfo();
    }, {scope: 'user_events'});
}

function getFacebookEvents() {
     FB.login(function(response){
        FB.api("/me/events?limit=25&since=".concat(String(Date.now()/1000).split(".")[0]),function (response) {
            if (response && !response.error) {
                console.log(response.data)
                $(response.data).each(function(index, obj) {
                    $("#faceEvents ul").append('<li>'+'Navn: '+obj.name+'</li>')
                        .append('<p>'+'Dato: '+obj.start_time.split('T')[0]+'</p>')
                        .append('<p>'+'Beskrivelse: '+obj.description+'</p>')
                        .append('<br/>')
                });
            }
        });
    }, {scope: 'user_events'});
}

function fetchInfo() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', 'GET', {fields: 'id, age_range, first_name, last_name, email, picture'}, function(response) {
        $('#id_Fusername').val(response.id);
        $('#id_agerange').val(response.age_range.min);
        $('#id_firstname').val(response.first_name);
        $('#id_lastname').val(response.last_name);
        $('#id_email').val(response.email);
        $('#faceForm').submit();
    });
}
