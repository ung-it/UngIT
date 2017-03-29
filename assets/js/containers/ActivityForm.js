import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../../styles/ActivityForm.css'
import AdaptionsField from '../components/AdaptionsField';
import ProviderField from '../components/ProviderField';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#3F51B5',
    },
});

const App = () => (
    <div>
        <MuiThemeProvider muiTheme={muiTheme}>
            <AdaptionsField/>
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={muiTheme}>
            <ProviderField/>
        </MuiThemeProvider>
    </div>
);

ReactDOM.render(
    <App/>,
    document.getElementById('adaptions-container')
);
