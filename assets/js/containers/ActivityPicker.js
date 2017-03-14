import React, { Component }  from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select from 'react-select';
import ReactDOM from 'react-dom';
import '../../styles/activitypickerStyle.css';

import {setActivityPickerFilter} from "../actions/filterActions";

const ACTIVITYTYPES = [
	{ label: 'Fotball', value: 'fotball' },
	{ label: 'Ski', value: 'ski' },
	{ label: 'Klatring', value: 'klatring' },
	{ label: 'Volleyball', value: 'volleyball' }
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

		}

		this.handleSelectChange = this.handleSelectChange.bind(this);
	}

	/*getInitialState () {
		return {
			options: ACTIVITYTYPES,
			value: []
		};
	}*/

	handleSelectChange (value) {
		this.setState({
			value: value
		});
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

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({setActivityPickerFilter: setActivityPickerFilter}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(ActivityPicker);



ReactDOM.render(
	<ActivityPicker/>,
	document.getElementById('activityfilter')
);
