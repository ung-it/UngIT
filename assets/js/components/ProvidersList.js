import React from 'react';
import ProviderCard from './ProviderCard';

class ProvidersList extends React.Component {

    render() {
        // If no activities found
        if (this.props.providers.length < 1) {
            return <h1>Ingen arrangører funnet</h1>;
        }

        const providers = this.props.providers.map(provider =>
            <ProviderCard key={provider.pk} provider={provider.fields.aktordatabase} id={provider.pk}/>
        );

        return <div>
            {providers}
        </div>
    }
}

export default ProvidersList;
