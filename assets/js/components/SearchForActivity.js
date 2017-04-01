import React from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';
import { FormGroup, FormControl } from 'react-bootstrap';
import AutoComplete from 'material-ui/AutoComplete';



class SearchForActivity extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
            searchText: '',
			dataSource: [],
		};
	};

	handleUpdateInput = (value) => {
		this.setState({
			dataSource: [
				value,
				value + value,
				value + value + value,
			],
		});
	};

	handleChange = event => {
        this.setState ({
            searchText: event.target.value
        });
        const searchText = event.target.value;
		this.props.onFilterChange(searchText);
	};

	render () {
		return (
			<div>
				<FormControl
					type="text"
					placeholder={this.props.placeholderText}
					onChange={this.handleChange}
					value={this.props.activeFilters}
				/>

				<AutoComplete
					hintText={this.props.placeholderText}
					dataSource={this.state.dataSource}
					onUpdateInput={this.handleUpdateInput}
					fullWidth={true}
				/>
			</div>
		);
	}
}

SearchForActivity.propTypes = {
	onFilterChange: React.PropTypes.func.isRequired,
	activeFilters: React.PropTypes.string.isRequired,
	placeholderText: React.PropTypes.string
};

export default SearchForActivity;

