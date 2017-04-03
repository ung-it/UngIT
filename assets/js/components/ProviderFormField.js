import React, { Component } from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import SearchIcon from 'material-ui/svg-icons/action/search';

const styles = {
    customWidth: {
        width: 300,
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

        return (
            <div>
                <AutoComplete
                    floatingLabelText={<div><SearchIcon/> Søk etter aktør</div>}
                    dataSource={this.state.providers}
                />
            </div>
        )
    }

}

export default ProviderField;
