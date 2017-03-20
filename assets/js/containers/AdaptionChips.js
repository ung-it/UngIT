import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/AdaptionChips.css'

import IconAccessible from 'material-ui/svg-icons/action/accessible';
import IconAccessibility from 'material-ui/svg-icons/action/accessibility';
import IconVisibility from 'material-ui/svg-icons/action/visibility';
import IconHearing from 'material-ui/svg-icons/av/hearing';

import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class AdaptionChips extends Component {

    constructor(props) {
        super(props);
        const chipIcons =  {'Tilpassning 1':<IconAccessible/>,'Tilpassning 2':<IconAccessibility/>,'Tilpassning 3':<IconVisibility/>,'Tilpassning 4':<IconHearing/>};
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
               <Chip
                   className='chip'
                   key = {name}
                   onRequestDelete={this.remove.bind(null, {name})}
                   onTouchTap={this.remove.bind(null, {name})}
               >
                   <Avatar icon={icon}></Avatar>
                   {name}
               </Chip>
            )
        });

        let unselected = this.state.unselected.map( name => {
            let icon = this.state.chipIcons[name];
            return (
                <Chip
                    className='chip'
                    key = {name}
                    onTouchTap={this.add.bind(null, {name})}
                >
                    <Avatar icon={icon}></Avatar>
                    {name}
                </Chip>
            )
        });

        return (
            <div>
                <span>Tilpasninger</span>
                <div className="adaptions-container">
                    <Paper className="adaptions-box" zDepth={1}>
                        <div className="adaptions-title">Alle tilpassninger</div>
                        <div className="adaptions-holder">
                            {unselected}
                        </div>
                    </Paper>
                    <Paper className="adaptions-box" zDepth={1}>
                        <div className="adaptions-title">Valgte tilpassninger</div>
                        <div className="adaptions-holder">
                            {selected}
                        </div>
                    </Paper>
                </div>
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
}

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
    <MuiThemeProvider>
        <AdaptionChips />
    </MuiThemeProvider>
);

ReactDOM.render(
    <App/>,
    document.getElementById('adaptions-container')
);
