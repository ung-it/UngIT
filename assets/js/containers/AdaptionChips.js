import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class AdaptionChips extends Component {

    constructor(props) {
        super(props);
        const chipIcons =  {'Rullestol':'accessible','Ekstra assistent':'accessibility','Blinde':'visibility','Døve':'hearing'};
        this.state = {
            chipIcons: chipIcons,
            selected: [],
            unselected: Object.keys(chipIcons),
        };

        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }

    render() {
        const unselected = this.state.unselected.map(item => {
            const icon= this.state.chipIcons[item];
            return (
                <span className="mdl-chip mdl-chip--contact" onClick={() => this.add(item)} key={item}>
                    <span className="mdl-chip__contact mdl-color--teal mdl-color-text--white">
                        <i className="material-icons">{icon}</i>
                    </span>
                    <span className="mdl-chip__text">{item}</span>
                </span>
            )
        });

        const selected = this.state.selected.map(item => {
            const icon= this.state.chipIcons[item];
            return (
                <span className="mdl-chip mdl-chip--contact mdl-chip--deletable" onClick={() => this.remove(item)} key={item}>
                    <span className="mdl-chip__contact mdl-color--teal mdl-color-text--white"><i className="material-icons">{icon}</i></span>
                    <span className="mdl-chip__text">{item}</span>
                    <i className="material-icons mdl-chip__action">cancel</i>
                </span>
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
        const chipName = item;
        this.setState({
            unselected: this.state.unselected.filter(item => {
                return item != chipName;
            }),
            selected: this.state.selected.concat(chipName),
        });
    }

    remove(item) {
        const chipName = item;
        this.setState({
            selected: this.state.selected.filter(item => {
                return item != chipName;
            }),
            unselected: this.state.unselected.concat(chipName),
        });
    }
}

ReactDOM.render(
    <AdaptionChips/>,
    document.getElementById('adaptions-container')
);
