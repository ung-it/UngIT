import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/AdaptionChips.css'

import IconAccessible from 'material-ui/svg-icons/action/accessible';
import IconAccessibility from 'material-ui/svg-icons/action/accessibility';
import IconVisibility from 'material-ui/svg-icons/action/visibility';
import IconHearing from 'material-ui/svg-icons/av/hearing';

import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class AdaptionChips extends Component {

    constructor(props) {
        super(props);
        const chipIcons =  {'Rullestol':<IconAccessible/>,'Ekstra assistent':<IconAccessibility/>,'Blinde':<IconVisibility/>,'Døve':<IconHearing/>};
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
                   onTouchTap={this.remove}
               >
                   <Avatar>{icon}</Avatar>
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
                    onTouchTap={this.add}
                >
                    <Avatar icon={icon}></Avatar>
                    {name}
                </Chip>
            )
        });

        return (
            <div>
                <div>Tilpasninger</div>
                <div className="adaptions-box">{unselected}</div>
                <div className="adaptions-box">{selected}</div>
            </div>
        )
    }

    add(item) {

    }

    remove(item) {

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
