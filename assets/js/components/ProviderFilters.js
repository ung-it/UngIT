import React from 'react';
import Paper from 'material-ui/Paper';
import { Glyphicon } from "react-bootstrap";

import SearchForProvider from './SearchForActivity';
import ActivityPicker from './ActivityPicker';
import SuitedForPicker from './SuitedForPicker';

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
                        <button type="button" className="btn btn-warning" id="button-trash"
                                onClick={this.handleEmptyFilter}>
                            <Glyphicon glyph="glyphicon glyphicon-trash"/>
                        </button>

                    </div>
                    <div className="col-md-10">
                        <h2 className="title">Finn arrangører</h2>
                    </div>
                </div>

                <SearchForProvider
                    onFilterChange={this.props.onSearchForChange}
                    activitiesName={providerName}
                    placeholderText="Søk på arrangør..."
                    searchForFilter={this.props.searchForFilter}
                />

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
    };
}
;

ProviderFilters.propTypes = {
    onSearchForChange: React.PropTypes.func.isRequired,
    providersForSearch: React.PropTypes.array.isRequired,
    searchForFilter: React.PropTypes.string.isRequired,

    onSuitedForFilterChange: React.PropTypes.func.isRequired,
    suitedForFilters: React.PropTypes.array.isRequired,
    suitedForButton: React.PropTypes.func.isRequired,

    onActivityFilterChange: React.PropTypes.func.isRequired,
    activityFilters: React.PropTypes.array.isRequired,
    activityButton: React.PropTypes.func.isRequired,


    onButtonChange: React.PropTypes.func.isRequired,
};

export default ProviderFilters;
