import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/AdaptionChips.css'

import IconAccessible from 'material-ui/svg-icons/action/accessible';
import IconAccessibility from 'material-ui/svg-icons/action/accessibility';
import IconVisibility from 'material-ui/svg-icons/action/visibility';
import IconHearing from 'material-ui/svg-icons/av/hearing';
import IconNew from 'material-ui/svg-icons/content/add';
import {orange500} from 'material-ui/styles/colors';

import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const style = {
    postit: {
        backgroundColor: '#FFFFA5'
    },
    errorStyle: {
        color: orange500,
    },
    deleteButton: {
        height: 48
    }
};

class AdaptionChips extends Component {


    constructor(props) {
        super(props);
        const chipIcons =  {'Tilrettelegging 1':<IconAccessible/>,'Tilrettelegging 2':<IconAccessibility/>,'Tilrettelegging 3':<IconVisibility/>,'Tilrettelegging 4':<IconHearing/>};
        this.state = {
            chipIcons: chipIcons,
            selected: [],
            unselected: Object.keys(chipIcons),
            value: ""
        };

        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.addNew = this.addNew.bind(this);
        this.addNewButton = this.addNewButton.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.notExists = this.notExists.bind(this);
    }

    render() {

        $('#adaptions').val(this.state.selected);

        let selected = this.state.selected.map(name => {
            let icon = this.state.chipIcons[name];
            let deleteButton = null;
            if (Object.keys(this.state.chipIcons).indexOf(name) == -1) {
                deleteButton = <FlatButton
                    label="slett"
                    primary={true}
                    onTouchTap={this.deleteItem.bind(null, {name})}
                    style={style.deleteButton}
                />
                icon = <IconNew/>
            }
            return (
                <ListItem
                    key={name}
                    primaryText={name}
                    leftIcon={icon}
                    onTouchTap={this.remove.bind(null, {name})}
                    rightIconButton={deleteButton}
                />
            )
        });

        let unselected = this.state.unselected.map( name => {
            let icon = this.state.chipIcons[name];
            let deleteButton = null;
            if (Object.keys(this.state.chipIcons).indexOf(name) == -1) {
                deleteButton = <FlatButton
                    label="slett"
                    primary={true}
                    onTouchTap={this.deleteItem.bind(null, {name})}
                    style={style.deleteButton}
                />
                icon = <IconNew/>
            }
            return (
                <ListItem
                    key={name}
                    primaryText={name}
                    leftIcon={icon}
                    onTouchTap={this.add.bind(null, {name})}
                    rightIconButton={deleteButton}
                />
            )
        });

        let button = null;
        let errorText = null;

        if(this.state.value != "") {
            button = <RaisedButton
                label="Legg til"
                className='adaptions-add-button'
                onTouchTap={this.addNewButton}
                primary={true}/>
            if (!this.notExists(this.state.value)) {
                console.log(this.notExists(this.state.value))
                errorText = "Denne tilretteleggingen finnes allerede"
            }
        }

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
                        <Paper className="adaptions-box" zDepth={1} style={style.postit}>
                            <div className="adaptions-title">Alle tilrettelegginger</div>
                            <List className="adaptions-holder">
                                {unselected}
                            </List>
                        </Paper>
                        <Paper className="adaptions-box" zDepth={1} style={style.postit}>
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
                                ref="AdaptionInput"
                                hintText="Navn på tilrettelegging"
                                value = {this.state.value}
                                floatingLabelText="Legg til ny tilrettelegging"
                                fullWidth={true}
                                onKeyPress={this.addNew}
                                onChange={this.inputChange}
                                errorStyle={style.errorStyle}
                                errorText={errorText}
                            />
                            </form>
                        </div>
                        {button}
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

    addNew(event) {
        if (event.key == 'Enter') {
            event.preventDefault();
            this.addNewButton()
        }
        return false;
    }

    addNewButton(event) {
        let value = this.state.value;
        if (this.notExists(value) && value != "") {
            let selected = this.state.selected.concat(value);
            this.setState({selected: selected, value: ""});
        }
    }

    notExists(name) {
        return (this.state.selected.indexOf(name) == -1 && this.state.unselected.indexOf(name) == -1);
    }

    deleteItem(event) {
        let name = event.name;
        if (this.state.selected.indexOf(name) != -1) {
            this.state.selected.splice(this.state.selected.indexOf(name), 1);
            this.setState({selected: this.state.selected});
        }
        else {
            this.state.unselected.splice(this.state.unselected.indexOf(name), 1);
            this.setState({unselected: this.state.unselected});
        }
    }

    inputChange(event, newValue) {
        this.setState({value: newValue});
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
