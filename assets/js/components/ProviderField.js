import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class ProviderField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            providers: ["Meg selv", "En registrert arrangør", "En annen arrangør"]
        }
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {

        let items = this.state.providers.map((item, i) => {
           return (
               <MenuItem key={i} primaryText={item} value={i}/>
           )
        });

        return (
            <SelectField
                floatingLabelText="Velg Arrangør"
                value={this.state.value}
                onChange={this.handleChange}
            >
                {items}
            </SelectField>
        )
    }

}

export default ProviderField;
