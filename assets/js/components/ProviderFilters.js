import React from 'react';

import SearchForProvider from './SearchForActivity';

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
            <SearchForActivity
                onFilterChange={this.props.onSearchForChange}
                activeFilters={this.props.searchForFilters}
                placeholderText="Søk på arrangør..."
            />
        )
    };
};

ProviderFilters.propTypes = {
    onSearchForChange: React.PropTypes.func.isRequired,
    searchForFilters: React.PropTypes.string.isRequired,
};

export default ProviderFilters;
