import React from 'react';
import ActivityPicker from './ActivityPicker';
import SuitedForPicker from './SuitedForPicker';
import WeekPicker from './WeekPicker';

class ActivityFilters extends React.Component {

    render() {
        return (
            <div>
                <h1>Finn aktiviteter</h1>
                <div className="row">
                    <div className="col-6 col-md-6">
                        <ActivityPicker
                            onFilterChange={this.props.onActivityFilterChange}
                            activeFilters={this.props.activityFilters}
                        />
                    </div>
                    <div className="col-6 col-md-6">
                         <SuitedForPicker
                             onFilterChange={this.props.onSuitedForFilterChange}
                             activeFilters={this.props.suitedForFilters}
                         />
                    </div>
                    {/* NameFilter /> */}
                </div>
                <WeekPicker />
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
};

export default ActivityFilters;
