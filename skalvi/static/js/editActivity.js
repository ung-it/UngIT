let images = [];
let eventData = [];

function imageClicked(image) {
    const index = images.indexOf(image);
    if (index > -1) {
        $(image).removeClass("instagram-image-selected");
        images.splice(index, 1);
    }
    else {
        images.push(image);
        $(image).addClass("instagram-image-selected");
    }
    let imageText = images.map(function (image) {
        return image.src
    });
    $('#instagramImages').val(imageText);
}

function selectedImages(images) {
    let imageList = images.split(",").map(function (image) {
        image = "'" + image + "'";
        return $("img[src=" + image + "]");
    });
    for (var i in imageList) {
        imageClicked(imageList[i]);
    }
}

//Adding Facebook events to select box
$(document).ready(function () {
    let eventSelect = $('#event-select');
    eventSelect.on('change', showEvent);
    $('#event-button').on('click', fillForm);
    getFacebookEvents(function (data) {
        eventData = data;
        for (let i = 0; i < data.length; i++) {
            let value = data[i].name;
            let key = data[i].id;
            eventSelect.append($('<option>', {value: key})
                .text(value));
        }
        $(".facebook-event-wrapper").slideDown(500);
        //For dev
        // eventSelect.val(564635400412646);
        // $('#event-button').trigger('click');
        //End dev
    });



});

function showEvent() {
    $('#event-button').show();
}

function fillForm() {
    let eventSelect = $('#event-select');
    const id = $(eventSelect).val();
    let event = $.grep(eventData, function (e) {
        return e.id == id;
    })[0];
    updateInput($('#activityName'), event.name);
    updateInput($('#description'), event.description);
    updateInput($('#location'), event.place.location.street);
    const startDate = new Date(event.start_time);
    let day = ("0" + startDate.getDate()).slice(-2);
    let month = ("0" + (startDate.getMonth() + 1)).slice(-2);
    const date_start = startDate.getFullYear()+"-"+(month)+"-"+(day) ;
    updateInput($('#date'), date_start);
    let hours = ("0" + startDate.getHours()).slice(-2);
    let minutes = ("0" + startDate.getMinutes()).slice(-2);
    const startTime = hours + ":" + minutes;
    updateInput($('#time_start'), startTime);
    const endDate = new Date(event.end_time);
    day = ("0" + endDate.getDate()).slice(-2);
    month = ("0" + (endDate.getMonth() + 1)).slice(-2);
    const date_end = endDate.getFullYear()+"-"+(month)+"-"+(day) ;
    updateInput($('#date_end'), date_end);
    hours = ("0" + endDate.getHours()).slice(-2);
    minutes = ("0" + endDate.getMinutes()).slice(-2);
    const endTime = hours + ":" + minutes;
    updateInput($('#time_end'), endTime);
    $('#facebookID').val(event.id);
}

function updateInput(input, value) {
    $(input).val(value);
    $(input).parent().addClass('is-dirty');
}
