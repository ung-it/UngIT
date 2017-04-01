import React from 'react';
import ReactDOM from 'react-dom';
import { Thumbnail, Glyphicon } from "react-bootstrap";
import DatePicker from 'material-ui/DatePicker';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import '../../styles/daterangepicker.css'


const moment = require('moment');

class WeekPicker extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			startDate: new Date(),
		};
	};

	handleEvent = (event, date) => {
		this.setState ({
			startDate: date,
		});
		//const date = picker.startDate.format('YYYY-MM-DD') + "," + picker.endDate.format('YYYY-MM-DD');*/

		this.props.onFilterChange(date);
	};


	render() {
		/*let label = '';*/


		//console.log(date)

		/*if ((date[0] == null || date[0] == 'Invalid Date') && (date[1] == null || date[1] == 'Invalid Date')) {
			this.state.startDate = moment();
			this.state.endDate = moment().add(182, 'days');
			label = this.state.startDate.format('DD/MM/YYYY') + ' - ' + this.state.endDate.format('DD/MM/YYYY');
		}
		else {
			label = moment(date[0]).format('DD/MM/YYYY') + ' - ' + moment(date[1]).format('DD/MM/YYYY');
		}

		<DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate} onEvent={this.handleEvent}>
	          	<span id="time-period">{label}</span>
		    	<button type="button" className="btn btn-default"><Glyphicon glyph="glyphicon glyphicon-calendar"/></button>
			</DateRangePicker>*/
		return (
			<DatePicker hintText="Velg en dato.."  mode="landscape" onChange={this.handleEvent} fullWidth={true}/>

		);
	};
};

WeekPicker.propTypes = {
	onFilterChange: React.PropTypes.func.isRequired,
	activeFilters: React.PropTypes.string,
};

export default WeekPicker;
