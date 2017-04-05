import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../../styles/ProviderForm.css'
import ProviderFormField from "../components/ProviderFormField";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#3F51B5',
    },
});

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <ProviderFormField/>
    </MuiThemeProvider>,
    document.getElementById('provider-container')
);
