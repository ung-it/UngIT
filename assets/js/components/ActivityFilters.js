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
        const activityName = this.props.activitiesName.map(activity => activity.fields.activityName);

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
                        <h1>Finn aktiviteter</h1>
                    </div>
                </div>
                {/* ADD ALL FILTERS HERE */}
                <div className="row">
                    <div className="col-md-6">
                        <SearchForActivity
                            onFilterChange={this.props.onSearchForChange}
                            activitiesName={activityName}
                            searchForFilter={this.props.searchForFilter}
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="row1">
                            <WeekPicker
                                onFilterChange={this.props.onWeekPickerChange}
                                activeFilters={this.props.weekFilters}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <SuitedForPicker
                            onFilterChange={this.props.onSuitedForFilterChange}
                            activeFilters={this.props.suitedForFilters}
                            suitedForButton={this.props.suitedForButton}
                        />
                    </div>
                    <div className="col-md-6">
                        <ActivityPicker
                            onFilterChange={this.props.onActivityFilterChange}
                            activeFilters={this.props.activityFilters}
                            activityButton={this.props.activityButton}

                        />
                    </div>
                </div>

            </Paper>
        )
    }
}

ActivityFilters.propTypes = {
    onActivityFilterChange: React.PropTypes.func.isRequired,
    activityFilters: React.PropTypes.array.isRequired,
    activityButton: React.PropTypes.func.isRequired,

    onSuitedForFilterChange: React.PropTypes.func.isRequired,
    suitedForFilters: React.PropTypes.array.isRequired,
    suitedForButton: React.PropTypes.func.isRequired,

    onWeekPickerChange: React.PropTypes.func.isRequired,
    weekFilters: React.PropTypes.string,

    onSearchForChange: React.PropTypes.func.isRequired,
    activitiesName: React.PropTypes.array.isRequired,
    searchForFilter: React.PropTypes.string.isRequired,

    onButtonChange: React.PropTypes.func.isRequired,
};

export default ActivityFilters;
