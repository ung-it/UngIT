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
			//date: moment().format('DD/MM/YYYY') + ' - ' + moment().add(29, 'days').format('DD/MM/YYYY')
		};
	};

	handleEvent = (event, picker) => {
		this.setState ({
			startDate: picker.startDate,
			endDate: picker.endDate,
			//date: picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'),
		});
		let date = picker.startDate.format('YYYY-MM-DD') + "," + picker.endDate.format('YYYY-MM-DD');
		//const
		this.props.onFilterChange(date);
		//this.state.date = picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY');

	};

	componentWillReceiveProps(props) {
		console.log(props);
		//const date = this.props.activeFilters.split(',').map(a => new Date(a));
		//this.setState ({
		//		startDate: moment(date[0]).format('DD/MM/YYYY'),
		//		endDate: moment(date[1]).format('DD/MM/YYYY'),
		//	})
		//this.forceUpdate()

	}



	render() {
		//const start = this.state.startDate.format('DD/MM/YYYY');
		//const end = this.state.endDate.format('DD/MM/YYYY');
		//let label = moment(this.state.startDate).format('DD/MM/YYYY') + ' - ' + moment(this.state.endDate).format('DD/MM/YYYY');
		//if (start === end) {
		////	label = start;
		//};

		let label = ''

		const date = this.props.activeFilters.split(',').map(a => new Date(a));
		//const startD = date[0];
		//const label = startD + ' - ' + date[1];

		console.log(this.props.activeFilters);

		if (date[0] == null || date[0] == 'Invalid Date' && date[1] == null || date[1] == 'Invalid Date') {
			label = moment(this.state.startDate).format('DD/MM/YYYY') + ' - ' + moment(this.state.endDate).format('DD/MM/YYYY');
		}
		else {
			// not a date
			const startD = moment(date[0]).format('DD/MM/YYYY');
			const endD = moment(date[1]).format('DD/MM/YYYY');

			//console.log(startD + ' - ' + endD);
			label = startD + ' - ' + endD;
			//date[0].format('DD/MM/YYYY')
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
