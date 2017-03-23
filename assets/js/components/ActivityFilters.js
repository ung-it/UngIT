import React from 'react';
import ActivityPicker from './ActivityPicker';
import SuitedForPicker from './SuitedForPicker';
import WeekPicker from './WeekPicker';

class ActivityFilters extends React.Component {

    render() {
        return (
             <div>
                <h3>Finn aktiviteter</h3>
                {/* ADD ALL FILTERS HERE */}
                {/* NameFilter /> */}
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
                <WeekPicker
                    onFilterChange={this.props.onWeekPickerChange}
                    activeFilters={this.props.weekFilters}
                />
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
