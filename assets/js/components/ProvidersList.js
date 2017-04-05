import React from 'react';
import ProviderCard from './ProviderCard';
import {Button} from "react-bootstrap";
import  {getFollowingProviders, getUserState} from "../APIFunctions";

class ProvidersList extends React.Component {

    constructor(props) {
        super(props);
        console.log('PL: ', this.props.providers);
        this.state = {
            offset: 10,
            following: [],
            providers: this.props.providers,

        };
    };


    componentWillReceiveProps() {
        console.log('CHANGED MAH MAFAKKING PROPS YALL');
        this.doEverything();
    }


    loadMore() {
        this.setState({
            offset: this.state.offset += 50
        });
        this.doEverything();

    }

    contains = (a, obj) => {
        for (let i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    };


    doEverything = () => {
        getUserState(val => {
            if (val) {
                console.log("logget inn");
                getFollowingProviders(response => {
                    this.state.following = response.map(p => p.pk);

                    console.log("HEI", this.state.following);
                    // Slice the reducer data that is provided to match the offset.
                    const prov = this.props.providers.slice(0, this.state.offset);
                    const parsedProviders = this.props.providers.map(p => (JSON.parse(p.fields.aktordatabase)));
                    this.setState({
                        providers: prov.map((provider, k) => {

                            if ($.inArray(provider.pk, this.state.following) != -1) {
                                return <ProviderCard key={parsedProviders[k].Id} provider={parsedProviders[k]}
                                                     id={parsedProviders[k].Id} pk={provider.pk} following={true}/>
                            } else {
                                return <ProviderCard key={parsedProviders[k].Id} provider={parsedProviders[k]}
                                                     id={parsedProviders[k].Id} pk={provider.pk} following={false}/>
                            }
                        }),


                    });

                });

            } else {
                console.log("not logged in");
                // Slice the reducer data that is provided to match the offset.
                const prov = this.props.providers.slice(0, this.state.offset);
                const parsedProviders = this.props.providers.map(p => (JSON.parse(p.fields.aktordatabase)));
                this.setState({
                    providers: this.state.providers = prov.map((provider, k) => {
                        return <ProviderCard key={parsedProviders[k].Id} provider={parsedProviders[k]}
                                             id={parsedProviders[k].Id} pk={provider.pk} following={null}/>
                    }),

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

        console.log('render props: ', this.props.providers);
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
