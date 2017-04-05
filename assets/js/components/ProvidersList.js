import React from 'react';
import ProviderCard from './ProviderCard';
import {Button} from "react-bootstrap";
import  {getFollowingProviders, getUserState} from "../APIFunctions";

class ProvidersList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            offset: 10,
            following: [],
            providers: []
        };
        this.doEverything();
    };



    loadMore() {
        this.setState({
            offset: this.state.offset += 50
        });

    }

    doEverything = () => {
        getUserState(val => {
            const prov = this.props.providers.slice(0, this.state.offset);

            if (val) {
                console.log("logget inn");
                getFollowingProviders(response => {
                    this.state.following = response.map(p => p.pk);

                    console.log("HEI", this.state.following);
                    // Slice the reducer data that is provided to match the offset.
                    const parsedProviders = this.props.providers.map(p => (JSON.parse(p.fields.aktordatabase)));
                    this.state.providers = prov.map((provider, k) => {
                        if ($.inArray(provider.pk, this.state.following) != -1) {
                            return <ProviderCard key={parsedProviders[k].Id} provider={parsedProviders[k]} id={parsedProviders[k].Id} pk={provider.pk} following={true}/>
                        } else {
                            return <ProviderCard key={parsedProviders[k].Id} provider={parsedProviders[k]} id={parsedProviders[k].Id} pk={provider.pk} following={false}/>
                        }
                    });
                });

            } else {
                console.log("not logged in");
                // Slice the reducer data that is provided to match the offset.
                const parsedProviders = this.props.providers.map(p => (JSON.parse(p.fields.aktordatabase)));
                this.state.providers = prov.map((provider, k) => {
                    return <ProviderCard key={parsedProviders[k].Id} provider={parsedProviders[k]} id={parsedProviders[k].Id} pk={provider.pk} following={null}/>
            });
            }
        });
};

    render() {
        const styles = {
            activitiesStyle: {
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-around",
                width: '100%',
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
        console.log(this.state.providers);
        return <div>
            <div style={styles.activitiesStyle}>
                {this.state.providers}
                <Button style={styles.loadButtonStyle} className="btn-info" onClick={ () => this.loadMore() }>Last
                    flere</Button>
            </div>
        </div>;
    }
}

export default ProvidersList;
