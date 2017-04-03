import React from 'react';
import ProviderCard from './ProviderCard';

class ProvidersList extends React.Component {

    render() {
        const styles = {
            activitiesStyle: {
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-around",
                width: '100%',
            }
        };

        // If no providers found
        if (this.props.providers.length < 1) {
            return <h1 className="title">Ingen arrangører funnet</h1>;
        }

        const providers = this.props.providers.map(provider =>
            <ProviderCard key={provider.Id} provider={provider} id={provider.Id}/>
        );

        return <div style={styles.activitiesStyle}>
            {providers}
        </div>
    }
}

export default ProvidersList;
