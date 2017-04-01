import React from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
			values: [],
		};
	};

	handleChange = (event, index, values) => {
		this.setState({values});
		console.log(values);
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
					value={this.state.values}
					onChange={this.handleChange}
					fullWidth={true}
				>
					{this.menuItems(this.state.values)}
				</SelectField>
			</div>
		);
  }
}

ActivityPicker.propTypes = {
	onFilterChange: React.PropTypes.func.isRequired,
	activeFilters: React.PropTypes.array.isRequired,
};

export default ActivityPicker;





