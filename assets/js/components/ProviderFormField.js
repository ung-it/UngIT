import React, { Component } from 'react';
import { getAllOrganisations } from '../APIFunctions';

import AutoComplete from 'material-ui/AutoComplete';
import SearchIcon from 'material-ui/svg-icons/action/search';

const styles = {
    customWidth: {
        width: 788,
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
            color: color
        }

    }

    handleChange = (event, index, value) => {
        $('#provider').val(value);
        this.setState({value, color: {color: '#3F51B5'}});
    };

    render() {

        const data = this.state.providers.map(provider => {
            const json = JSON.parse(provider.fields.aktordatabase);
            return json.Navn;
        });

        return (
            <div>
                <AutoComplete
                    floatingLabelText={<div><SearchIcon/> Søk etter aktør</div>}
                    dataSource={data}
                    filter={AutoComplete.caseInsensitiveFilter}
                    fullWidth={true}
                    style={styles.customWidth}
                    maxSearchResults={10}
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
