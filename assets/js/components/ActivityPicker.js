import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Glyphicon} from "react-bootstrap";
import '../../styles/activitypickerStyle.css';

let names = [
    "Amerikansk idrett", "Bandy", "Basketball", "Biljard", "Boksing", "Bueskyting", "Cricket",
    "Curling", "Dans", "Fekting", "Festival", "Film/multimedia", "Fotball", "Friidrett", "Historielag",
    "Hopp", "Husflid", "Håndball", "Ishockey", "Kampsport", "Kor", "Kulturminnevern", "Kunst",
    "Kurs/opplæring", "Langrenn", "Litteratur", "Musikk/sang", "Orientering", "Scenekunst",
    "Skiskyting", "Skolekorps", "Skøytesport", "Svømming", "Sykling", "Tennis", "Turn",
    "Ungdoms/voksenkorps", "Volleyball", "Annet"
];

class ActivityPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activityButtonClicked: true,
        };
    };

    handleChange = (event, index, values) => {
        this.props.onFilterChange(values);
    };

    menuItems(values) {
        return names.map((name) => (
            <MenuItem
                key={name}
                insetChildren={true}
                checked={values && values.includes(name)}
                value={name}
                primaryText={name}
            />
        ));
    };

    handleEmptyFilter = () => {
        this.props.activityButton(this.state.activityButtonClicked)
    };

    render() {
        return (
            <div className="section row">
                <div className="col-md-11">
                    <SelectField
                        multiple={true}
                        hintText="Velg type aktivitet..."
                        value={this.props.activeFilters}
                        onChange={this.handleChange}
                        fullWidth={true}
                    >
                        {this.menuItems(this.props.activeFilters)}
                    </SelectField>
                </div>
                <div className="col-md-1" id="activity-a-remove">
                    <div className="mdl-tooltip  mdl-tooltip--large" data-mdl-for="remove-a-button">
                        Tøm aktivitetsfilter
                    </div>
                    <Glyphicon glyph="glyphicon glyphicon-remove" id="remove-a-button"
                               onClick={this.handleEmptyFilter}/>
                </div>
            </div>
        );
    };
}

ActivityPicker.propTypes = {
    onFilterChange: React.PropTypes.func.isRequired,
    activeFilters: React.PropTypes.array.isRequired,
    activityButton: React.PropTypes.func.isRequired,
};

export default ActivityPicker;





