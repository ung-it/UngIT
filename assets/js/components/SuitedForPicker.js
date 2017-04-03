import React from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Glyphicon } from "react-bootstrap";


import '../../styles/activitypickerStyle.css'

export const names = ['Tilrettelegging 1', 'Tilrettelegging 2', 'Tilrettelegging 3', 'Tilrettelegging 4', 'Annet'];

class SuitedForPicker extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
            suitedForButtonClicked: true,
		};
	};

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
	};

	handleEmptyFilter = () => {
		this.props.suitedForButton(this.state.suitedForButtonClicked)
	};

	render() {
		return (
			<div className="section">
				<SelectField
					multiple={true}
					hintText="Velg tilrettelegging..."
					value={this.props.activeFilters}
					onChange={this.handleChange}
					fullWidth={true}
				>
					{this.menuItems(this.props.activeFilters)}
				</SelectField>
				<button type="button" className="btn btn-warning" id="button-trash" onClick={this.handleEmptyFilter}>
					<Glyphicon glyph="glyphicon glyphicon-trash"/>
				</button>
			</div>
		);
	};

}

SuitedForPicker.propTypes = {
	onFilterChange: React.PropTypes.func.isRequired,
	activeFilters: React.PropTypes.array.isRequired,
	suitedForButton: React.PropTypes.func.isRequired
};

export default SuitedForPicker;










