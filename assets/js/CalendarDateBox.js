import React, { Component } from 'react';
import {getDay, getMonth} from './DateFunctions'

import '../styles/time.css';

class CalendarDateBox extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const date = this.props.date;

        let weekday = getDay(date.getDay());
        let month = getMonth(date.getMonth());

        return(
            <time className="icon">
                <i>{weekday}</i>
                <b>{month}</b>
                <span>{date.getDate()}</span>
            </time>
        )
    }

}

export default CalendarDateBox;
