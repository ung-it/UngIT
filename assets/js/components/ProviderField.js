import React, {Component} from 'react';

import {getUserProviders, getAllOrganisations, getUser} from '../APIFunctions';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

const styles = {
    customWidth: {
        width: 788,
    },
};

const selectedProvider = $('#provider').val();

class ProviderField extends Component {

    constructor(props) {
        super(props);

        let color = {};
        if (selectedProvider != "") {
            color = {color: '#3F51B5'};
        }

        this.state = {
            value: selectedProvider,
            providers: [],
            personal: "Meg selv",
            registered: [],
            unregistered: ["En aktør jeg ikke representerer", "En annen aktør jeg ikke representerer"],

            open: false,
            color: color
        }

    }

    handleChange = (event, index, value) => {
        $('#provider').val(value);
        this.setState({value, color: {color: '#3F51B5'}});
    };

    render() {

        let items1 = this.state.registered.map((item) => {
            const provider = this.getProvider(item);
            if (provider) {
                const json = JSON.parse(provider.fields.aktordatabase);
                return (
                    <MenuItem key={item} primaryText={json.Navn} value={item}/>
                )
            }

        });
        let items2 = this.state.unregistered.map((item) => {
            return (
                <MenuItem key={item} primaryText={item} value={item}/>
            )
        });

        return (
            <SelectField
                floatingLabelText="Velg Arrangør"
                floatingLabelStyle={this.state.color}
                selectedMenuItemStyle={{color: '#3F51B5'}}
                value={this.state.value}
                onChange={this.handleChange}
                autoWidth={false}
                style={styles.customWidth}
            >
                <Subheader>Privatperson</Subheader>
                <MenuItem primaryText={this.state.personal} value={this.state.personal}/>
                <Subheader>Mine aktører</Subheader>
                {items1}
                <Subheader>Andre aktører</Subheader>
                {items2}
            </SelectField>
        )
    }

    componentDidMount() {
        getAllOrganisations(providers => {
            this.setState({providers});
        });
        getUser(user => {
            this.setState({
                personal: user.name,
                registered: user.providers,
            });
        })
    }

    getProvider(pk) {
        for (let i in this.state.providers) {
            const provider = this.state.providers[i];
            if (provider.pk == pk) {
                return provider;
            }
        }
    }

}

export default ProviderField;
