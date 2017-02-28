/**
 * Created by ingrskar on 2/24/2017.
 */
import React from 'react';
import Select from 'react-select';
import styles from '../styles/activitypickerStyle.css'

const ACTIVITYTYPES = [
	{ label: 'Fotball', value: 'fotball' },
	{ label: 'Ski', value: 'ski' },
	{ label: 'Klatring', value: 'klatring' },
	{ label: 'Volleyball', value: 'volleyball' },
];

var ActivityPicker = React.createClass({
	displayName: 'ActivityPicker',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			options: ACTIVITYTYPES,
			value: [],
		};
	},
	handleSelectChange (value) {
		this.setState({ value });
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi simpleValue value={this.state.value} placeholder="Velg type aktivitet.." options={this.state.options} onChange={this.handleSelectChange} />
			</div>
		);
	}
});
module.exports = ActivityPicker;