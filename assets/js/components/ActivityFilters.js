import React from 'react';
import ActivityPicker from './ActivityPicker';
import SuitedForPicker from './SuitedForPicker';
import WeekPicker from './WeekPicker';

class ActivityFilters extends React.Component {

    render() {
        return (
            <div>
                <h1>Finn aktiviteter</h1>
                <ActivityPicker
                    onFilterChange={this.props.onActivityFilterChange}
                    activeFilters={this.props.activityFilters}
                />
                {/* NameFilter /> */}
                <SuitedForPicker
                    onFilterChange={this.props.onSuitedForFilterChange}
                    activeFilters={this.props.suitedForFilters}
                />
                <WeekPicker
                    onFilterChange={this.props.onWeekPickerChange}
                    activeFilters={this.props.weekFilters}
                />
                {/* ADD ALL FILTERS HERE */}
            </div>
        )
    }
}

ActivityFilters.propTypes = {
    onActivityFilterChange: React.PropTypes.func.isRequired,
    activityFilters: React.PropTypes.string.isRequired,
    onSuitedForFilterChange: React.PropTypes.func.isRequired,
    suitedForFilters: React.PropTypes.string.isRequired,
    onWeekPickerChange: React.PropTypes.func.isRequired,
    weekFilters: React.PropTypes.string.isRequired,
};

export default ActivityFilters;
