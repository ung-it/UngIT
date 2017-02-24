import React, { Component } from 'react';
var moment = require('moment');
var DateRangePicker = require('react-bootstrap-daterangepicker');
import {Thumbnail, Glyphicon} from "react-bootstrap";
import styles from '../styles/daterangepicker.css'

var WeekPicker = React.createClass({
    getInitialState: function () {
        return {
            startDate: moment(),
			endDate: moment().add(29, 'days')
        };
    },

    handleEvent: function (event, picker) {
		this.setState({
			startDate: picker.startDate,
			endDate: picker.endDate
		});
	},

    render: function () {
		var start = this.state.startDate.format('DD-MM-YYYY');
		var end = this.state.endDate.format('DD-MM-YYYY');
		var label = start + '   -   ' + end;
		if (start === end) {
			label = start;
		}
		return (
		    <DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate} onEvent={this.handleEvent}>
            <button type="button" className="btn btn-default"><Glyphicon glyph="glyphicon glyphicon-calendar"/></button> {label}
            </DateRangePicker>
        );

}});

export default WeekPicker;