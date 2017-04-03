import React from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


import '../../styles/activitypickerStyle.css'

export const names = ['Tilrettelegging 1', 'Tilrettelegging 2', 'Tilrettelegging 3', 'Tilrettelegging 4', 'Annet'];

class SuitedForPicker extends React.Component {


	handleChange = (event, index, values) => {
		this.props.onFilterChange(values);

	};

	menuItems(values) {
		return names.map((name) => (
			<MenuItem
				key={name}
				insetChildren={true}
				checked={values && values.includes(name)}
				value={name}
				primaryText={name}
			/>
		));
	}

	render() {
		return (
			<div className="section">
				<SelectField
					multiple={true}
					hintText="Velg type aktivitet..."
					value={this.props.activeFilters}
					onChange={this.handleChange}
					fullWidth={true}
				>
					{this.menuItems(this.props.activeFilters)}
				</SelectField>
			</div>
		);
	};

}
;

SuitedForPicker.propTypes = {
	onFilterChange: React.PropTypes.func.isRequired,
	activeFilters: React.PropTypes.array.isRequired,
};

export default SuitedForPicker;










