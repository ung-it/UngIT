import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/AdaptionChips.css'

import IconAccessible from 'material-ui/svg-icons/action/accessible';
import IconAccessibility from 'material-ui/svg-icons/action/accessibility';
import IconVisibility from 'material-ui/svg-icons/action/visibility';
import IconHearing from 'material-ui/svg-icons/av/hearing';

import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const style = {
    backgroundColor: '#FFFFA5'
};

class AdaptionChips extends Component {


    constructor(props) {
        super(props);
        const chipIcons =  {'Tilrettelegging 1':<IconAccessible/>,'Tilrettelegging 2':<IconAccessibility/>,'Tilrettelegging 3':<IconVisibility/>,'Tilrettelegging 4':<IconHearing/>};
        this.state = {
            chipIcons: chipIcons,
            selected: [],
            unselected: Object.keys(chipIcons),
        };

        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }

    render() {

        let selected = this.state.selected.map(name => {
            let icon = this.state.chipIcons[name];
            return (
                <ListItem
                    key={name}
                    primaryText={name}
                    leftIcon={icon}
                    onTouchTap={this.remove.bind(null, {name})}
                />
            )
        });

        let unselected = this.state.unselected.map( name => {
            let icon = this.state.chipIcons[name];
            return (
                <ListItem key={name} primaryText={name} leftIcon={icon} onTouchTap={this.add.bind(null, {name})} />
            )
        });

        return (
            <div>
                <div className="adaptions-header">Tilrettelegginger</div>
                <Paper zDepth={1}>
                    <div className="adaptions-info-container">
                        <i id="adaptions-i" className="material-icons adaptions-info" >help</i>
                        <div className="mdl-tooltip  mdl-tooltip--large" data-mdl-for="adaptions-i">
                            Klikk på en tilrettelegging for å flytte den over til den andre listen
                        </div>
                    </div>
                    <div className="adaptions-container">
                        <Paper className="adaptions-box" zDepth={1} style={style}>
                            <div className="adaptions-title">Alle tilrettelegginger</div>
                            <List className="adaptions-holder">
                                {unselected}
                            </List>
                        </Paper>
                        <Paper className="adaptions-box" zDepth={1} style={style}>
                            <div className="adaptions-title">Valgte tilrettelegginger</div>
                            <div className="adaptions-holder">
                                {selected}
                            </div>
                        </Paper>
                    </div>
                    <div className="adaptions-add">
                        <div className="adaptions-add-input">
                            <form onSubmit={this.addNew}>
                            <TextField
                                hintText="Navn på tilrettelegging"
                                floatingLabelText="Legg til ny tilrettelegging"
                                fullWidth={true}
                            />
                            </form>
                        </div>
                        <RaisedButton
                            label="Legg til"
                            className='adaptions-add-button'
                            onTouchTap={this.addNew}
                            primary={true}/>
                    </div>
                </Paper>
            </div>
        )
    }

    add(item) {
        let selected = this.state.selected.concat(item.name);
        this.state.unselected.splice(this.state.unselected.indexOf(item.name), 1);
        this.setState({selected: selected, unselected: this.state.unselected});
    }

    remove(item) {
        let unselected = this.state.unselected.concat(item.name);
        this.state.selected.splice(this.state.selected.indexOf(item.name), 1);
        this.setState({selected: this.state.selected, unselected: unselected});
    }

    addNew(item) {
        console.log(item);
    }
}

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#3F51B5',
    },
});

const App = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <AdaptionChips />
    </MuiThemeProvider>
);

ReactDOM.render(
    <App/>,
    document.getElementById('adaptions-container')
);
