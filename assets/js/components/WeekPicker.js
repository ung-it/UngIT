import React from 'react';
import ReactDOM from 'react-dom';
import { Thumbnail, Glyphicon } from "react-bootstrap";

import '../../styles/daterangepicker.css'

let moment = require('moment');
let DateRangePicker = require('react-bootstrap-daterangepicker');

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
		const date = picker.startDate.format('YYYY-MM-DD') + "," + picker.endDate.format('YYYY-MM-DD');
		this.props.onFilterChange(date);
	};


	render() {
		let label = '';

		const date = this.props.activeFilters.split(',').map(a => new Date(a));

		if ((date[0] == null || date[0] == 'Invalid Date') && (date[1] == null || date[1] == 'Invalid Date')) {
			this.state.startDate = moment();
			this.state.endDate = moment().add(29, 'days');
			label = this.state.startDate.format('DD/MM/YYYY') + ' - ' + this.state.endDate.format('DD/MM/YYYY');
		}
		else {
			label = moment(date[0]).format('DD/MM/YYYY') + ' - ' + moment(date[1]).format('DD/MM/YYYY');
		}

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
