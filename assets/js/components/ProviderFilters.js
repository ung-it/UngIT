import React from 'react';
import Paper from 'material-ui/Paper';
import { Glyphicon } from "react-bootstrap";

import SearchForProvider from './SearchForActivity';
import ActivityPicker from './ActivityPicker';

import '../../styles/activityFilters.css'

class ProviderFilters extends React.Component {

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

        const providerName = this.props.providersForSearch.map(provider => provider.Navn);

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
                        <h1>Finn arrangører</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <SearchForProvider
                            onFilterChange={this.props.onSearchForChange}
                            activitiesName={providerName}
                            placeholderText="Søk på arrangør..."
                            searchForFilter={this.props.searchForFilter}
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
    };
}
;

ProviderFilters.propTypes = {
    onSearchForChange: React.PropTypes.func.isRequired,
    providersForSearch: React.PropTypes.array.isRequired,
    onActivityFilterChange: React.PropTypes.func.isRequired,
    activityFilters: React.PropTypes.array.isRequired,
    searchForFilter: React.PropTypes.string.isRequired,
    activityButton: React.PropTypes.func.isRequired,


    onButtonChange: React.PropTypes.func.isRequired,
};

export default ProviderFilters;
