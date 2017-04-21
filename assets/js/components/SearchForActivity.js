import React from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';
import AutoComplete from 'material-ui/AutoComplete';
import SearchIcon from 'material-ui/svg-icons/action/search';



class SearchForActivity extends React.Component {


	handleUpdateInput = value => {
		this.props.onFilterChange(value);
	};


	render () {
		return (
			<div>
				<AutoComplete
					floatingLabelText={<div><SearchIcon/> Søk...</div>}
					searchText={this.props.searchForFilter}
					hintText={this.props.placeholderText}
					dataSource={this.props.activitiesName}
					filter={AutoComplete.fuzzyFilter}
					maxSearchResults={10}
					onUpdateInput={this.handleUpdateInput}
					fullWidth={true}
				/>
			</div>
		);
	}
}

SearchForActivity.propTypes = {
	onFilterChange: React.PropTypes.func.isRequired,
	placeholderText: React.PropTypes.string,
	activitiesName: React.PropTypes.array.isRequired,
	searchForFilter: React.PropTypes.string.isRequired,

};

export default SearchForActivity;

