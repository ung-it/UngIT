import React from 'react';
import {Thumbnail, Glyphicon} from "react-bootstrap";
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../../styles/daterangepicker.css'

injectTapEventPlugin();

const moment = require('moment');
let DateTimeFormat;

if (areIntlLocalesSupported(['nb-NO'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
}
else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/nb-NO');
}

class WeekPicker extends React.Component {

    handleEvent = (event, date) => {
        this.props.onFilterChange(date);
    };

    formatDate = (date) => {
        return date.getDate() + " / " + (date.getMonth() + 1) + " / " + date.getFullYear();
    };

    render() {
        let date = {};
        if (new Date(this.props.activeFilters) == 'Invalid Date') {
            date = {};
        } else {
            date = new Date(this.props.activeFilters);
        }

        return (
            <DatePicker
                DateTimeFormat={DateTimeFormat}
                locale="nb-NO"
                hintText="Søk på en dato.."
                cancelLabel="Lukk"
                mode="landscape"
                value={date}
                onChange={this.handleEvent}
                fullWidth={true}
                formatDate={this.formatDate}
                className="filterItem"
            />
        );
    };
};

WeekPicker.propTypes = {
    onFilterChange: React.PropTypes.func.isRequired,
    activeFilters: React.PropTypes.string,
};

export default WeekPicker;
