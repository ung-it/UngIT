import React, { Component } from 'react';
import { getDay, getMonth } from '../DateFunctions'
import '../../styles/time.css';

class CalendarDateBox extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const date = this.props.date;

        let weekday = getDay(date.getDay());
        let month = getMonth(date.getMonth());
        let year = date.getFullYear();

        let diff = date.getTime() - new Date().getTime();
        let titleInfo = null;
        if (diff < 0) {
            titleInfo = "For " + Math.abs(Math.ceil(diff / (1000 * 3600 * 24))) + " dager siden";
        }
        else {
            titleInfo = "Om " + Math.ceil(diff / (1000 * 3600 * 24)) + " dager";
        }

        return(
            <time className="icon" title={titleInfo}>
                <i>{weekday}</i>
                <b>{month} {year}</b>
                <span>{date.getDate()}</span>
            </time>
        )
    }
}

export default CalendarDateBox;
