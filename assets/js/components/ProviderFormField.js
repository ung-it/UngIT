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
        if (selectedProviders != "") {
            color = {color: '#3F51B5'};
        }

        this.state = {
            value: selectedProviders,
            providers: [],
            color: color,
            showButton: false
        }

    }

    handleChange = (chosenRequest, index) => {
        console.log(chosenRequest)
        this.setState({value: chosenRequest, color: {color: '#3F51B5'}});
        // $('#provider').val(value);
    };

    render() {

        const data = this.state.providers.map(provider => {
            const json = JSON.parse(provider.fields.aktordatabase);
            return json.Navn;
        });

        return (
            <div className="provider-form-field">
                <AutoComplete
                    floatingLabelText={<div><SearchIcon/> Søk etter aktør</div>}
                    dataSource={data}
                    filter={AutoComplete.caseInsensitiveFilter}
                    maxSearchResults={10}
                    fullWidth={true}
                    style={styles.customWidth}
                    onNewRequest={this.handleChange}
                />
                <RaisedButton
                    label="Legg til"
                    className='provider-add-button'
                    onTouchTap={this.addNewButton}
                    primary={this.state.showButton}
                    disabled={!this.state.showButton}
                />
            </div>
        )
    }

    componentDidMount() {
        getAllOrganisations(organisations => {
            this.setState({providers: organisations});
        })
    }

}

export default ProviderField;
