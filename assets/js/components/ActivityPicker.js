import React from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';

import '../../styles/activitypickerStyle.css';

const ACTIVITY_TYPES = [
	{ label: 'Amerikansk idrett', value: 'Amerikansk idrett' },
	{ label: 'Bandy', value: 'Bandy' },
	{ label: 'Basketball', value: 'Basketball' },
	{ label: 'Biljard', value: 'Biljard' },
	{ label: 'Boksing', value: 'Boksing' },
	{ label: 'Bueskyting', value: 'Bueskyting' },
	{ label: 'Cricket', value: 'Cricket' },
	{ label: 'Curling', value: 'Curling' },
	{ label: 'Dans', value: 'Dans' },
	{ label: 'Fekting', value: 'Fekting' },
	{ label: 'Festival', value: 'Festival' },
	{ label: 'Film/multimedia', value: 'Film/multimedia' },
	{ label: 'Fotball', value: 'Fotball' },
	{ label: 'Friidrett', value: 'Friidrett' },
	{ label: 'Historielag', value: 'Historielag' },
	{ label: 'Hopp', value: 'Hopp' },
	{ label: 'Husflid', value: 'Husflid' },
	{ label: 'Håndball', value: 'Håndball' },
	{ label: 'Ishockey', value: 'Ishockey' },
	{ label: 'Kampsport', value: 'Kampsport' },
	{ label: 'Kor', value: 'Kor' },
	{ label: 'Kulturminnevern', value: 'Kulturminnevern' },
	{ label: 'Kunst', value: 'Kunst' },
	{ label: 'Kurs/opplæring', value: 'Kurs/opplæring' },
	{ label: 'Langrenn', value: 'Langrenn' },
	{ label: 'Litteratur', value: 'Litteratur' },
	{ label: 'Musikk/sang', value: 'Musikk/sang' },
	{ label: 'Orientering', value: 'Orientering' },
	{ label: 'Scenekunst', value: 'Scenekunst' },
	{ label: 'Skiskyting', value: 'Skiskyting' },
	{ label: 'Skolekorps', value: 'Skolekorps' },
	{ label: 'Skøytesport', value: 'Skøytesport' },
	{ label: 'Svømming', value: 'Svømming' },
	{ label: 'Sykling', value: 'Sykling' },
	{ label: 'Tennis', value: 'Tennis' },
	{ label: 'Turn', value: 'Turn' },
	{ label: 'Ungdoms/voksenkorps', value: 'Ungdoms/voksenkorps' },
	{ label: 'Volleyball', value: 'Volleyball' },
	{ label: 'Annet', value: '0' },

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
