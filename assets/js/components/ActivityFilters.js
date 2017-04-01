import React from 'react';
import { Glyphicon } from "react-bootstrap";
import Paper from 'material-ui/Paper';

import ActivityPicker from './ActivityPicker';
import SuitedForPicker from './SuitedForPicker';
import WeekPicker from './WeekPicker';
import SearchForActivity from './SearchForActivity';

import '../../styles/activityFilters.css'


class ActivityFilters extends React.Component {

    constructor(props) {
		super(props);

		this.state = {
            tButtonClicked: true,
		};
	};


    handleEmptyFilter = () => {
        this.props.onButtonChange(this.state.tButtonClicked);
    };

    render() {

        return (
            <Paper className="filter-container">
                <div className="row">
                    <div className="2">
                        <div className="mdl-tooltip  mdl-tooltip--large" data-mdl-for="button-trash">
                            Tøm filter
                        </div>
                        <button type="button" className="btn btn-warning" id="button-trash" onClick={this.handleEmptyFilter}>
                            <Glyphicon glyph="glyphicon glyphicon-trash"/>
                        </button>

                    </div>
                    <div className="col-md-10">
                        <h2 className="title">Finn aktiviteter</h2>
                    </div>
                </div>
                {/* ADD ALL FILTERS HERE */}
                <div className="row">
                    <div className="col-md-6">
                        <SearchForActivity
                            onFilterChange={this.props.onSearchForChange}
                            activeFilters={this.props.searchForFilters}
                            placeholderText="Søk etter en aktivitet..."
                        />
                    </div>
                    <div className="col-md-6">
                        <WeekPicker
                            onFilterChange={this.props.onWeekPickerChange}
                            activeFilters={this.props.weekFilters}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <ActivityPicker
                            onFilterChange={this.props.onActivityFilterChange}
                            activeFilters={this.props.activityFilters}
                        />
                    </div>
                    <div className="col-md-6">
                        <SuitedForPicker
                            onFilterChange={this.props.onSuitedForFilterChange}
                            activeFilters={this.props.suitedForFilters}
                        />
                    </div>
                </div>

            </Paper>
        )
    }
}

ActivityFilters.propTypes = {
    onActivityFilterChange: React.PropTypes.func.isRequired,
    activityFilters: React.PropTypes.string.isRequired,
    onSuitedForFilterChange: React.PropTypes.func.isRequired,
    suitedForFilters: React.PropTypes.string.isRequired,
    onWeekPickerChange: React.PropTypes.func.isRequired,
    weekFilters: React.PropTypes.string,
    onSearchForChange: React.PropTypes.func.isRequired,
    searchForFilters: React.PropTypes.string.isRequired,

    onButtonChange: React.PropTypes.func.isRequired,
};

export default ActivityFilters;
