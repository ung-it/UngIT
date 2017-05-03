import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    customWidth: {
        width: 300,
    },
};

class ActivityTypeField extends Component {

    constructor(props) {
        super(props);
        let selectedActivityType = $('#activityType').val();
        let color = {};
        if (selectedActivityType != "") {
            color = {color: '#3F51B5'};
        }

        let items = [
            "Amerikansk idrett", "Bandy", "Basketball", "Biljard", "Boksing", "Bueskyting", "Cricket",
            "Curling", "Dans", "Fekting", "Festival", "Film/multimedia", "Fotball", "Friidrett", "Historielag",
            "Hopp", "Husflid", "Håndball", "Ishockey", "Kampsport", "Kor", "Kulturminnevern", "Kunst",
            "Kurs/opplæring", "Langrenn", "Litteratur", "Musikk/sang", "Orientering", "Scenekunst",
            "Skiskyting", "Skolekorps", "Skøytesport", "Svømming", "Sykling", "Tennis", "Turn",
            "Ungdoms/voksenkorps", "Volleyball", "Annet"
        ].map(item => {
            return <MenuItem primaryText={item} value={item} key={item}/>
        });

        this.state = {
            value: selectedActivityType,
            items: items,

            open: false,
            color: color
        }
    }

    handleChange = (event, index, value) => {
        $('#activityType').val(value);
        this.setState({value, color: {color: '#3F51B5'}});
    };

    render() {
        return (
            <SelectField
                floatingLabelText="Velg type aktivitet"
                floatingLabelStyle={this.state.color}
                selectedMenuItemStyle={{color: '#3F51B5'}}
                value={this.state.value}
                onChange={this.handleChange}
                autoWidth={false}
                style={styles.customWidth}
            >
                {this.state.items}
            </SelectField>
        )
    }
}

export default ActivityTypeField;
