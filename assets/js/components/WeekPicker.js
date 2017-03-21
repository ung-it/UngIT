import React from 'react';
import ReactDOM from 'react-dom';
import { Thumbnail, Glyphicon } from "react-bootstrap";

import '../../styles/daterangepicker.css'

var moment = require('moment');
var DateRangePicker = require('react-bootstrap-daterangepicker');

class WeekPicker extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			startDate: moment(),
			endDate: moment().add(29, 'days'),

		};
	};

	handleEvent = (event, picker) => {
		this.setState ({
			startDate: picker.startDate,
			endDate: picker.endDate,
		});
		const date = picker.startDate.format('DD.MM.YYYY') + "," + picker.endDate.format('DD.MM.YYYY');
		console.log(date)
		this.props.onFilterChange(date);
	};


	render() {
		const start = this.state.startDate.format('DD.MM.YYYY');
		const end = this.state.endDate.format('DD.MM.YYYY');
		let label = start + ' - ' + end;
		if (start === end) {
			label = start;
		};

		return (
			<DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate} onEvent={this.handleEvent}>
	          	<span id="time-period">{label}</span>
		    	<button type="button" className="btn btn-default"><Glyphicon glyph="glyphicon glyphicon-calendar"/></button>
			</DateRangePicker>
		);
	};
};

WeekPicker.propTypes = {
	onFilterChange: React.PropTypes.func.isRequired,
	activeFilters: React.PropTypes.string.isRequired,
};

export default WeekPicker;
