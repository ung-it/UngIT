import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

const styles = {
    customWidth: {
        width: 300,
    },
};

class ActivityTypeField extends Component {

    constructor(props) {
        super(props);

        let selectedProvider = $('#provider').val();

        this.state = {
            value: selectedProvider,
            personal: "Meg selv",
            registered: ["Aktør jeg representerer", "En annen aktør jeg representerer"],
            unregistered: ["En aktør jeg ikke representerer", "En annen aktør jeg ikke representerer"],

            open: false,
            color: {}
        }
    }

    handleChange = (event, index, value) => {
        $('#activityType').val(value);
        this.setState({value, color: {color: '#3F51B5'}});
    };

    render() {

        return (
            <SelectField
                floatingLabelText="Velg type aktivitet"
                floatingLabelStyle={this.state.color}
                selectedMenuItemStyle={{color: '#3F51B5'}}
                value={this.state.value}
                onChange={this.handleChange}
                autoWidth={false}
                style={styles.customWidth}
            >
                {this.state.items}
            </SelectField>
        )
    }

}

export default ActivityTypeField;
