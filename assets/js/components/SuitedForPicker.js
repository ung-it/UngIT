import React from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';

import '../../styles/activitypickerStyle.css'

export const SUITED_FOR_TYPES = [
	{ label: 'Tilrettelegging 1', value: 'Tilrettelegging 1' },
	{ label: 'Tilrettelegging 2', value: 'Tilrettelegging 2' },
	{ label: 'Tilrettelegging 3', value: 'Tilrettelegging 3' },
	{ label: 'Tilrettelegging 4', value: 'Tilrettelegging 4' },
	{ label: 'Ukjent', value: '0' },
];

class SuitedForPicker extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			options: SUITED_FOR_TYPES
		};
	};

	handleSelectChange = filter => {
		this.props.onFilterChange(filter);
	};

	render() {
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
	};
};

SuitedForPicker.propTypes = {
	onFilterChange: React.PropTypes.func.isRequired,
	activeFilters: React.PropTypes.string.isRequired,
};

export default SuitedForPicker;

