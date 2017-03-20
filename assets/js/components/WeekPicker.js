import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Thumbnail, Glyphicon } from "react-bootstrap";
import styles from '../../styles/activitypickerStyle.css'

var moment = require('moment');
var DateRangePicker = require('react-bootstrap-daterangepicker');

class WeekPicker extends React.Component {
	render() {
		return <p>week</p>
	}
}

//
//var WeekPicker = React.createClass({
//    getInitialState: function () {
//        return {
//            startDate: moment(),
//			endDate: moment().add(29, 'days')
//        };
//    },
//
//    handleEvent: function (event, picker) {
//		this.setState({
//			startDate: picker.startDate,
//			endDate: picker.endDate
//		});
//	},
//
//    render: function () {
//		var start = this.state.startDate.format('DD.MM.YYYY');
//		var end = this.state.endDate.format('DD.MM.YYYY');
//		var label = start + ' - ' + end;
//		if (start === end) {
//			label = start;
//		}
//		return (
//		    <DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate} onEvent={this.handleEvent}>
//            <span id="time-period">{label}</span>
//		    <button type="button" className="btn btn-default"><Glyphicon glyph="glyphicon glyphicon-calendar"/></button>
//            </DateRangePicker>
//        );
//
//}});

export default WeekPicker;
