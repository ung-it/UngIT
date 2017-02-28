/**
 * Created by ingrskar on 2/24/2017.
 */
import React from 'react';
import Select from 'react-select';
import styles from '../styles/activitypickerStyle.css'

const FILTERTYPES = [
	{ label: 'Rullestol', value: 'rullestol' },
	{ label: 'Ekstra assistent', value: 'ekstraAssistent' },
	{ label: 'Blinde', value: 'blinde' },
	{ label: 'Døve', value: 'dove' },
];

var SuitedForPicker = React.createClass({
	displayName: 'SuitedForPicker',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			options: FILTERTYPES,
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
				<Select multi simpleValue value={this.state.value} placeholder="Aktiviter tilpasset for.." options={this.state.options} onChange={this.handleSelectChange} />
			</div>
		);
	}
});
module.exports = SuitedForPicker;