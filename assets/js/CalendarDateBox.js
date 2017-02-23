import React, { Component } from 'react';

import '../styles/time.css';

class CalendarDateBox extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <time className="icon">
                <i>{this.props.weekday}</i>
                <b>{this.props.month}</b>
                <span>{this.props.day}</span>
            </time>
        )
    }
}

export default CalendarDateBox;