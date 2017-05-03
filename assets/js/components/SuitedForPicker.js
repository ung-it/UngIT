import React from 'react';
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
			<div className="section row">
				<div className="col-md-11">
				<SelectField
					multiple={true}
					hintText="Velg tilrettelegging..."
					value={this.props.activeFilters}
					onChange={this.handleChange}
					fullWidth={true}
				>
					{this.menuItems(this.props.activeFilters)}
				</SelectField>
					</div>
                <div className="col-md-1" id="activity-a-remove">
                    <div className="mdl-tooltip  mdl-tooltip--large" data-mdl-for="remove-s-button">
                            Tøm tilretteleggingsfilter
                        </div>
                    <Glyphicon glyph="glyphicon glyphicon-remove" id="remove-s-button" onClick={this.handleEmptyFilter}/>
                </div>
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
