import React, { Component } from 'react';
import { getAllOrganisations } from '../APIFunctions';

import AutoComplete from 'material-ui/AutoComplete';
import SearchIcon from 'material-ui/svg-icons/action/search';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';

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
            this.setState({value: index, color: {color: '#3F51B5'}, showButton: true});
        }
    };

    render() {

        const providers = this.state.selected.map(provider => {
            const json = JSON.parse(provider.fields.aktordatabase);
            console.log(json);
            return (
                <TableRow key={provider}>
                    <TableRowColumn>{json.Id}</TableRowColumn>
                    <TableRowColumn>{json.Navn}</TableRowColumn>
                    <TableRowColumn>{json.Organisasjonsnummer}</TableRowColumn>
                </TableRow>
            );
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
                <Table
                    height={'500px'}
                >
                    <TableHeader
                        displaySelectAll={false}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="ID tilhørende aktørdatabasen">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Navn på aktør">Navn</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Organisasjonsnummer">Organisasjonsnummer</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {providers}
                    </TableBody>
                </Table>
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
        const provider = this.state.providers[this.state.value];
        if (this.state.selected.indexOf(provider) === -1) {
            const selected = this.state.selected.concat(provider);
            this.setState({selected});
        }
    }

}

export default ProviderField;
