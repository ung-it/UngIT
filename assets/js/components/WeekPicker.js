import React from 'react';
import ReactDOM from 'react-dom';
import { Thumbnail, Glyphicon } from "react-bootstrap";
import DatePicker from 'material-ui/DatePicker';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import '../../styles/daterangepicker.css'


const moment = require('moment');

class WeekPicker extends React.Component {


	handleEvent = (event, date) => {
		this.props.onFilterChange(date);
	};


	render() {
		return (
			<DatePicker hintText="Søk på en dato.."  mode="landscape" onChange={this.handleEvent} fullWidth={true}/>

		);
	};
};

WeekPicker.propTypes = {
	onFilterChange: React.PropTypes.func.isRequired,
	activeFilters: React.PropTypes.string,
};

export default WeekPicker;
