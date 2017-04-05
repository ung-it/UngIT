import React from 'react';
import ProviderCard from './ProviderCard';

import {Button} from "react-bootstrap";

class ProvidersList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            offset: 10,
        };

    };


    loadMore() {
        this.setState({
            offset: this.state.offset += 50
        });

    }

    render() {
        const styles = {
            activitiesStyle: {
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-between"
            },
            loadButtonStyle: {
                margin: "50px",
                width: '100%',
                height: "100px",

            }

        };


        // If no providers found
        if (this.props.providers.length < 1) {
            return <h1>Ingen arrangører funnet</h1>;
        }


        // Slice the reducer data that is provided to match the offset.
        const prov = this.props.providers.slice(0, this.state.offset);


        const providers = prov.map(provider =>
            <ProviderCard key={provider.Id} provider={provider} id={provider.Id}/>
        );

        return <div>
            <div style={styles.activitiesStyle}>
                {providers}
                <Button style={styles.loadButtonStyle} className="btn-info" onClick={ () => this.loadMore() }>Last flere</Button>
            </div>


        </div>
    }
}

export default ProvidersList;
