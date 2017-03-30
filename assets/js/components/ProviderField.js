import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const styles = {
    customWidth: {
        width: 300,
    },
};

class ProviderField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            personal: "Meg selv",
            registered: ["Aktør jeg representerer", "En annen aktør jeg representerer"],
            unregistered: ["En aktør jeg ikke representerer", "En annen aktør jeg ikke representerer"],

            open: false,
        }
    }

    handleChange = (event, index, value) => this.setState({value});

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    handleNestedListToggle = (item) => {
        this.setState({
            open: item.state.open,
        });
    };

    render() {

        let items1 = this.state.registered.map((item, i) => {
           return (
               <MenuItem key={item} primaryText={item} value={i+1}/>
           )
        });
        let items2 = this.state.unregistered.map((item, i) => {
            return (
                <MenuItem key={item} primaryText={item} value={i+1+this.state.registered.length}/>
            )
        });

        return (
            <SelectField
                floatingLabelText="Velg Arrangør"
                value={this.state.value}
                onChange={this.handleChange}
                autoWidth={false}
                style={styles.customWidth}
            >
                <MenuItem primaryText={this.state.personal} value={0}/>
                <Subheader>Mine aktører</Subheader>
                {items1}
                <Subheader>Andre aktører</Subheader>
                {items2}
            </SelectField>
        )
    }

}

export default ProviderField;
