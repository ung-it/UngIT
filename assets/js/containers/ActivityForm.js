import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../../styles/ActivityForm.css'
import ActivityTypeField from "../components/ActivityTypeField";
import AdaptionsField from '../components/AdaptionsField';
import ProviderField from '../components/ProviderField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#3F51B5',
    },
});

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <ActivityTypeField/>
    </MuiThemeProvider>,
    document.getElementById('activityType-container')
);

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <AdaptionsField/>
    </MuiThemeProvider>,
    document.getElementById('adaptions-container')
);

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <ProviderField/>
    </MuiThemeProvider>,
    document.getElementById('provider-container')
);

