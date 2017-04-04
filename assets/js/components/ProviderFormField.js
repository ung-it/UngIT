import React, { Component } from 'react';
import { getAllOrganisations } from '../APIFunctions';

import AutoComplete from 'material-ui/AutoComplete';
import SearchIcon from 'material-ui/svg-icons/action/search';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    customWidth: {
        width: 700,
    },
};

class ProviderField extends Component {

    constructor(props) {
        super(props);

        let selectedProviders = $('#provider').val();
        let color = {};
        if (selectedProviders !== "") {
            color = {color: '#3F51B5'};
        }

        this.state = {
            value: selectedProviders,
            providers: [],
            data: [],
            selected: [],
            color: color,
            showButton: false
        };

        this.addProvider = this.addProvider.bind(this);
    }

    handleChange = (chosenRequest, index) => {
        if (chosenRequest != "") {
            this.setState({value: chosenRequest, color: {color: '#3F51B5'}, showButton: true});
        }
    };

    render() {

        const providers = this.state.selected.map(provider => {
            return provider;
        });

        return (
            <div>
                <div className="provider-form-field">
                    <AutoComplete
                        floatingLabelText={<div><SearchIcon/> Søk etter aktør</div>}
                        dataSource={this.state.data}
                        filter={AutoComplete.caseInsensitiveFilter}
                        maxSearchResults={10}
                        fullWidth={true}
                        style={styles.customWidth}
                        onNewRequest={this.handleChange}
                    />
                    <RaisedButton
                        label="Legg til"
                        className='provider-add-button'
                        onTouchTap={this.addProvider}
                        primary={this.state.showButton}
                        disabled={!this.state.showButton}
                    />
                </div>
                {providers}
            </div>
        )
    }

    componentDidMount() {
        getAllOrganisations(organisations => {

            const data = organisations.map(provider => {
                const json = JSON.parse(provider.fields.aktordatabase);
                return json.Navn;
            });

            this.setState({providers: organisations, data});
        })
    }

    addProvider() {
        if (this.state.selected.indexOf(this.state.value) === -1) {
            const selected = this.state.selected.concat(this.state.value);
            this.setState({selected});
        }
    }

}

export default ProviderField;
