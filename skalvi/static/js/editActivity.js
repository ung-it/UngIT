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

    //Fixing css layout on date and time fields
    $('#date').on('blur', checkContent);
    $('#date_end').on('blur', checkContent);
    $('#time_start').on('blur', checkContent);
    $('#time_end').on('blur', checkContent);

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

function closeFacebookBox() {
    $('.facebook-event-wrapper').slideUp();
}

function checkContent(event) {
    let target = $(event.target);
    if (target.val() != "") {
        target.parent().removeClass('date-time-container');
    }
    else {
        target.parent().addClass('date-time-container');
    }
}

//This function fixes texfields showing 'is-required-error" when form loads
(function() {
    'use strict';

    MaterialTextfield = window['MaterialTextfield'];

    /**
     * Handle lost focus.
     *
     * @private
     */
    MaterialTextfield.prototype.onBlur_ = function() {
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
        this.checkValidity();
    };
    /**
     * Handle change.
     *
     * @private
     */
    MaterialTextfield.prototype.onChange_ = function() {
        this.checkValidity();
    };

    /**
     * Handle class updates.
     *
     * @private
     */
    MaterialTextfield.prototype.updateClasses_ = function() {
        this.checkDisabled();
        this.checkDirty();
        var dirty = this.element_.classList.contains(this.CssClasses_.IS_DIRTY);
        var required = this.input_.required;
        if (!required || required && dirty) {
            this.checkValidity();
        }
        this.checkFocus();
    };
    /**
     * Enable text field.
     *
     * @public
     */
    MaterialTextfield.prototype.enable = function() {
        this.input_.disabled = false;
        this.updateClasses_();
        this.checkValidity();
    };
    MaterialTextfield.prototype['enable'] = MaterialTextfield.prototype.enable;

    /**
     * Initialize element.
     */
    MaterialTextfield.prototype.init = function() {
        if (this.element_) {
            this.label_ = this.element_.querySelector('.' + this.CssClasses_.LABEL);
            this.input_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);
            if (this.input_) {
                if (this.input_.hasAttribute(
                        /** @type {string} */
                        (this.Constant_.MAX_ROWS_ATTRIBUTE))) {
                    this.maxRows = parseInt(this.input_.getAttribute(
                        /** @type {string} */
                        (this.Constant_.MAX_ROWS_ATTRIBUTE)), 10);
                    if (isNaN(this.maxRows)) {
                        this.maxRows = this.Constant_.NO_MAX_ROWS;
                    }
                }
                if (this.input_.hasAttribute('placeholder')) {
                    this.element_.classList.add(this.CssClasses_.HAS_PLACEHOLDER);
                }
                this.boundUpdateClassesHandler = this.updateClasses_.bind(this);
                this.boundFocusHandler = this.onFocus_.bind(this);
                this.boundBlurHandler = this.onBlur_.bind(this);
                this.boundResetHandler = this.onReset_.bind(this);
                this.boundChangeHandler = this.onChange_.bind(this);
                this.input_.addEventListener('input', this.boundUpdateClassesHandler);
                this.input_.addEventListener('focus', this.boundFocusHandler);
                this.input_.addEventListener('blur', this.boundBlurHandler);
                this.input_.addEventListener('reset', this.boundResetHandler);
                this.input_.addEventListener('change', this.boundChangeHandler);
                if (this.maxRows !== this.Constant_.NO_MAX_ROWS) {
                    // TODO: This should handle pasting multi line text.
                    // Currently doesn't.
                    this.boundKeyDownHandler = this.onKeyDown_.bind(this);
                    this.input_.addEventListener('keydown', this.boundKeyDownHandler);
                }
                var invalid = this.element_.classList.contains(this.CssClasses_.IS_INVALID);
                this.updateClasses_();
                this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
                if (invalid) {
                    this.element_.classList.add(this.CssClasses_.IS_INVALID);
                }
                if (this.input_.hasAttribute('autofocus')) {
                    this.element_.focus();
                    this.checkFocus();
                }
            }
        }
    };
    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.registerUpgradedCallback(MaterialTextfield, function(textfield){});
})();
