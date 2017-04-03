import React from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Glyphicon } from "react-bootstrap";


import '../../styles/activitypickerStyle.css';

let names = [
	"Amerikansk idrett", "Bandy", "Basketball", "Biljard", "Boksing", "Bueskyting", "Cricket",
	"Curling", "Dans", "Fekting", "Festival", "Film/multimedia", "Fotball", "Friidrett", "Historielag",
	"Hopp", "Husflid", "Håndball", "Ishockey", "Kampsport", "Kor", "Kulturminnevern", "Kunst",
	"Kurs/opplæring", "Langrenn", "Litteratur", "Musikk/sang", "Orientering", "Scenekunst",
	"Skiskyting", "Skolekorps", "Skøytesport", "Svømming", "Sykling", "Tennis", "Turn",
	"Ungdoms/voksenkorps", "Volleyball", "Annet"
];


class ActivityPicker extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
            activityButtonClicked: true,
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
		this.props.activityButton(this.state.activityButtonClicked)
	};

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
				<button type="button" className="btn btn-warning" id="button-trash" onClick={this.handleEmptyFilter}>
					<Glyphicon glyph="glyphicon glyphicon-trash"/>
				</button>
			</div>
		);
  };
}

ActivityPicker.propTypes = {
	onFilterChange: React.PropTypes.func.isRequired,
	activeFilters: React.PropTypes.array.isRequired,
	activityButton: React.PropTypes.func.isRequired,
};

export default ActivityPicker;





