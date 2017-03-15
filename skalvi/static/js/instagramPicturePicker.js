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
    getFacebookEvents(function (data) {
        eventData = data;
        for (let i = 0; i < data.length; i++) {
            let value = data[i].name;
            let key = data[i].id;
            eventSelect.append($('<option>', {value: key})
                .text(value));
        }
        $(".facebook-event-wrapper").slideDown(500);
    });
    eventSelect.on('change', showEvent);
    $('#event-button').on('click', fillForm);

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
    $('#activityName').val(event.name);
    $('#activityName').parent().addClass('is-dirty');
}
