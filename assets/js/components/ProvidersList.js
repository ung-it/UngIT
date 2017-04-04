import React from 'react';
import ProviderCard from './ProviderCard';

import { Button } from "react-bootstrap";

class ProvidersList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            offset: 50,
        };

    };


    loadMore(){
        this.setState({
          offset: this.state.offset +=50
        });

    }

    render() {
        const styles = {
            activitiesStyle: {
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-around",
                width: '100%',
            },

        };


        // If no providers found
        if (this.props.providers.length < 1) {
            return <h1>Ingen arrangører funnet</h1>;
        }




        const prov = this.props.providers.slice(0, this.state.offset);




        const providers = prov.map(provider =>
            <ProviderCard key={provider.Id} provider={provider} id={provider.Id}/>
        );

        return <div style={styles.activitiesStyle}>
            {providers}
            <Button   className="btn-success" onClick={() => this.loadMore()}>Last flere</Button>
        </div>
    }
}

export default ProvidersList;
