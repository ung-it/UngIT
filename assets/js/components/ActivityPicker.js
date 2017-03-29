import React from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';

import '../../styles/activitypickerStyle.css';

const ACTIVITY_TYPES = [
	{ label: 'Ukjent', value: '0' },
	{ label: 'Kor', value: 'Kor' },
	{ label: 'Festival', value: 'Festival' },
	{ label: 'Historielag', value: 'Historielag' },
	{ label: 'Film/multimedia', value: 'Film/multimedia' },
	{ label: 'Skolekorps', value: 'Skolekorps' },
	{ label: 'Ungdoms/voksenkorps', value: 'Ungdoms/voksenkorps' },
	{ label: 'Scenekunst', value: 'Scenekunst' },
	{ label: 'Musikk/sang', value: 'Musikk/sang' },
	{ label: 'Kunst', value: 'Kunst' },
	{ label: 'Husflid', value: 'Husflid' },
	{ label: 'Litteratur', value: 'Litteratur' },
	{ label: 'Kurs/opplæring', value: 'Kurs/opplæring' },
	{ label: 'Kulturminnevern', value: 'Kulturminnevern' },
	{ label: 'Dans', value: 'Dans' },
	{ label: 'Håndball', value: 'Håndball' },
	{ label: 'Fotball', value: 'Fotball' },
	{ label: 'Kampsport', value: 'Kampsport' },
	{ label: 'Turn', value: 'Turn' },
	{ label: 'Boksing', value: 'Boksing' },
	{ label: 'Langrenn', value: 'Langrenn' },
	{ label: 'Basketball', value: 'Basketball' },
	{ label: 'Volleyball', value: 'Volleyball' },
	{ label: 'Orientering', value: 'Orientering' },
	{ label: 'Hopp', value: 'Hopp' },
	{ label: 'Skøytesport', value: 'Skøytesport' },
	{ label: 'Friidrett', value: 'Friidrett' },
	{ label: 'Bandy', value: 'Bandy' },
	{ label: 'Sykling', value: 'Sykling' },
	{ label: 'Bueskyting', value: 'Bueskyting' },
	{ label: 'Ishockey', value: 'Ishockey' },
	{ label: 'Fekting', value: 'Fekting' },
	{ label: 'Amerikansk idrett', value: 'Amerikansk idrett' },
	{ label: 'Biljard', value: 'Biljard' },
	{ label: 'Skiskyting', value: 'Skiskyting' },
	{ label: 'Tennis', value: 'Tennis' },
	{ label: 'Svømming', value: 'Svømming' },
	{ label: 'Cricket', value: 'Cricket' },
	{ label: 'Curling', value: 'Curling' },
]



class ActivityPicker extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			options: ACTIVITY_TYPES
		};
	};

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
