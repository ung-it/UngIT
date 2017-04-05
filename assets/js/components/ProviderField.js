import React, {Component} from 'react';

import {getUserProviders, getAllOrganisations, getUser} from '../APIFunctions';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import AutoComplete from 'material-ui/AutoComplete';
import SearchIcon from 'material-ui/svg-icons/action/search';

const styles = {
    customWidth: {
        width: 788,
    },
    autoComplete: {
        width: 808,
        paddingLeft: 24,
    }

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
            data: [],
            personal: "Meg selv",
            registered: [],
            unregistered: ["En aktør jeg ikke representerer", "En annen aktør jeg ikke representerer"],
            item: null,

            open: false,
            color: color
        }

    }

    handleChange = (event, index, value) => {
        $('#provider').val(value);
        this.setState({value, color: {color: '#3F51B5'}});
    };

    handleSelect = (chosenRequest, index) => {
        this.setState({
            value: this.state.providers[index].pk,
        });
    };

    render() {

        let choosen = false;

        console.log(this.state.value);

        let items1 = this.state.registered.map((item) => {
            const provider = this.getProvider(item);
            if (provider) {
                if (this.state.value == item) {
                    choosen = true;
                }
                const json = JSON.parse(provider.fields.aktordatabase);
                return (
                    <MenuItem key={item} primaryText={json.Navn} value={item}/>
                )
            }
            return null;

        });
        if (this.state.registered[0] === "") {
            items1 = <MenuItem disabled={true}>Ingen aktører registrert</MenuItem>;
        }

        let item = <MenuItem disabled={true}/>;
        if (!choosen) {
            const provider = this.getProvider(this.state.value);
            if (provider) {
                const json = JSON.parse(provider.fields.aktordatabase);
                item = <MenuItem key={provider.pk} primaryText={json.Navn} value={this.state.value}/>
            }
        }

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
                <AutoComplete
                    floatingLabelText={<div><SearchIcon/> Søk etter aktør</div>}
                    dataSource={this.state.data}
                    filter={AutoComplete.caseInsensitiveFilter}
                    maxSearchResults={10}
                    fullWidth={true}
                    style={styles.autoComplete}
                    onNewRequest={this.handleSelect}
                    ref="autoComplete"
                />
                {item}
            </SelectField>
        )
    }

    componentDidMount() {
        getAllOrganisations(providers => {

            const data = providers.map(provider => {
                const json = JSON.parse(provider.fields.aktordatabase);
                return json.Navn;
            });

            this.setState({providers, data});
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
