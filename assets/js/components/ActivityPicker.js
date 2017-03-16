import React, { Component }  from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';

import '../../styles/activitypickerStyle.css';

const ACTIVITY_TYPES = [
	{ label: 'Ukjent', value: '0' },
	{ label: 'Skating', value: '1' },
	{ label: 'Klatring', value: '2' },
	{ label: 'Ski', value: '3' },
	{ label: 'Svømming', value: '4' },
];


class ActivityPicker extends Component {

	constructor(props) {
		super(props);

		this.state = {
			options: ACTIVITY_TYPES
		}
	}

	handleSelectChange = filter => {
		this.props.onFilterChange(filter);
	};

	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
					multi
					simpleValue
					value={this.props.activeFilters}
					placeholder="Velg type aktivitet..."
					options={this.state.options}
					onChange={this.handleSelectChange}
				/>
			</div>
		);
	}
}

ActivityPicker.propTypes = {
	onFilterChange: React.PropTypes.func.isRequired,
	activeFilters: React.PropTypes.string.isRequired,
};

export default ActivityPicker;
