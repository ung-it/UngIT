let images = [];
let eventData = [];

//Adding Facebook events to select box
$(document).ready(function () {

    //Fixing css layout on date and time fields
    $('#date').on('blur', checkContent);
    $('#date_end').on('blur', checkContent);
    $('#time_start').on('blur', checkContent);
    $('#time_end').on('blur', checkContent);
    showInputData()

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
    });
});

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
        return $('#instagram-div').find("img[src='" + image + "']")[0];
    });
    for (var i in imageList) {
        imageClicked(imageList[i]);
    }
}

function showEvent() {
    $('#event-button').show();
}

function fillForm() {
    let eventSelect = $('#event-select');
    const id = $(eventSelect).val();
    let event = $.grep(eventData, function (e) {
        return e.id == id;
    })[0];

    //Filling the form with data
    updateInput($('#activityName'), event.name);
    updateInput($('#description'), event.description);
    updateInput($('#location'), event.place.location.street);
    const startDate = new Date(event.start_time);
    let day = ("0" + startDate.getDate()).slice(-2);
    let month = ("0" + (startDate.getMonth() + 1)).slice(-2);
    const date_start = startDate.getFullYear() + "-" + (month) + "-" + (day);
    updateInput($('#date'), date_start);
    let hours = ("0" + startDate.getHours()).slice(-2);
    let minutes = ("0" + startDate.getMinutes()).slice(-2);
    const startTime = hours + ":" + minutes;
    updateInput($('#time_start'), startTime);
    const endDate = new Date(event.end_time);
    day = ("0" + endDate.getDate()).slice(-2);
    month = ("0" + (endDate.getMonth() + 1)).slice(-2);
    const date_end = endDate.getFullYear() + "-" + (month) + "-" + (day);
    updateInput($('#date_end'), date_end);
    hours = ("0" + endDate.getHours()).slice(-2);
    minutes = ("0" + endDate.getMinutes()).slice(-2);
    const endTime = hours + ":" + minutes;
    updateInput($('#time_end'), endTime);
    $('#facebookID').val(event.id);

    //Showing facebook checkbox
    $('.facebook-info-box').css("cssText", "display: block !important;");
    $('#facebookInfo').attr('checked', true);
    $('#facebookInfo-label').addClass('is-checked');
}

function updateInput(input, value) {
    if (value != 'NaN-aN-aN' && value != 'aN:aN') {
        $(input).val(value);
        $(input).parent().addClass('is-dirty');
        $(input).trigger('blur');
    }
}

function showInputData() {
    $('#date').trigger('blur');
    $('#date_end').trigger('blur');
    $('#time_start').trigger('blur');
    $('#time_end').trigger('blur');
}

function closeFacebookBox() {
    $('.facebook-event-wrapper').slideUp();
}

function checkContent(event) {
    let target = $(event.target);
    if (target.val() != "") {
        target.parent().removeClass('date-time-container');
        target.parent().removeClass('is-invalid');
    }
    else {
        target.parent().addClass('date-time-container');
        target.parent().removeClass('is-invalid');
        target.parent().removeClass('is-dirty');
    }
}
