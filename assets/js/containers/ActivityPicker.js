import React, { Component }  from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select from 'react-select';
import ReactDOM from 'react-dom';
import '../../styles/activitypickerStyle.css';

import { setActivityPickerFilter } from "../actions/filterActions";

const ACTIVITYTYPES = [
	{ label: 'Fotball', value: 'fotball' },
	{ label: 'Ski', value: 'ski' },
	{ label: 'Klatring', value: 'klatring' },
	{ label: 'Volleyball', value: 'volleyball' },
	{ label: 'Skating', value: 'skate' },
	{ label: 'Klubb', value: 'klubb' },
	{ label: 'Grupper', value: 'gruppe' }
];

class ActivityPicker extends Component {
	/*displayName: 'ActivityPicker',
	propTypes: {
		label: React.PropTypes.string
	},*/

	constructor(props) {
		super(props);
		this.state = {
			options: ACTIVITYTYPES,
			value: []

		};
		// this.props.dispatch(
		// 	setActivityPickerFilter(this.state.value)
		// );
		this.handleSelectChange = this.handleSelectChange.bind(this);
	}

	/*getInitialState () {
		return {
			options: ACTIVITYTYPES,
			value: []
		};
	}*/

	componentDidMount() {
		this.props.dispatch(
			setActivityPickerFilter(this.state.value)
		);
	}

	handleSelectChange (value) {
		this.setState({
			value: value
		});
		console.log("Handling change activity picker");
		setActivityPickerFilter(this.state.value);

	}

	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi simpleValue value={this.state.value} placeholder="Velg type aktivitet.." options={this.state.options} onChange={this.handleSelectChange} />
			</div>
		);
	}
};

function mapStateToProps(state) {
    return {
        value: state.value
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({setActivityPickerFilter: setActivityPickerFilter}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ActivityPicker);



ReactDOM.render(
	<ActivityPicker/>,
	document.getElementById('activityfilter')
);
