import React from 'react';

import SearchForProvider from './SearchForActivity';
import ActivityPicker from './ActivityPicker';

class ProviderFilters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tButtonClicked: true,
        };
    };

    /*handleEmptyFilter = () => {
        this.props.onButtonChange(this.state.tButtonClicked);
     };*/

    render() {
        return (
            <div>
                <SearchForProvider
                    onFilterChange={this.props.onSearchForChange}
                    activeFilters={this.props.searchForFilters}
                    placeholderText="Søk på arrangør..."
                />
                <ActivityPicker
                    onFilterChange={this.props.onActivityFilterChange}
                    activeFilters={this.props.activityFilters}
                />
            </div>
    )
    };
};

ProviderFilters.propTypes = {
    onSearchForChange: React.PropTypes.func.isRequired,
    searchForFilters: React.PropTypes.string.isRequired,
    onActivityFilterChange: React.PropTypes.func.isRequired,
    activityFilters: React.PropTypes.string.isRequired,
};

export default ProviderFilters;
