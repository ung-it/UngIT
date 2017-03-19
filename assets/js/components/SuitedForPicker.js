import React from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';

import '../../styles/activitypickerStyle.css'

const SUITED_FOR_TYPES = [
	{ label: 'Ukjent', value: '0' },
	{ label: 'Tilpasset 1', value: '1' },
	{ label: 'Tilpasset 2', value: '2' },
	{ label: 'Tilpasset 3', value: '3' },
	{ label: 'Tilpasset 4', value: '4' },
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
	}
}

SuitedForPicker.propTypes = {
	onFilterChange: React.PropTypes.func.isRequired,
	activeFilters: React.PropTypes.string.isRequired,
};
//
//var SuitedForPicker = React.createClass({
//	displayName: 'SuitedForPicker',
//	propTypes: {
//		label: React.PropTypes.string,
//	},
//	getInitialState () {
//		return {
//			options: FILTERTYPES,
//			value: [],
//		};
//	},
//	handleSelectChange (value) {
//		this.setState({ value });
//	},
//	render () {
//		return (
//			<div className="section">
//				<h3 className="section-heading">{this.props.label}</h3>
//				<Select multi simpleValue value={this.state.value} placeholder="Aktiviter tilpasset for.." options={this.state.options} onChange={this.handleSelectChange} />
//			</div>
//		);
//	}
//});


export default SuitedForPicker;

