import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ProviderFormField from "../components/ProviderFormField";


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
