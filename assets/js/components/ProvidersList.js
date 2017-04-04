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
            return <h1>Ingen arrangører funnet</h1>;
        }
        const parsedProviders = this.props.providers.map(p => (JSON.parse(p.fields.aktordatabase)));
        const providers = this.props.providers.map((provider, k) =>
            <ProviderCard key={parsedProviders[k].Id} provider={parsedProviders[k]} id={parsedProviders[k].Id} pk={provider.pk} />,

        );

        return <div style={styles.activitiesStyle}>
            {providers}
        </div>
    }
}

export default ProvidersList;
