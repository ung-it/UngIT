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
            providers: this.props.providers,
        };
    };

    componentWillReceiveProps() {
        this.doEverything();
    }

    loadMore() {
        this.setState({
            offset: this.state.offset += 50
        });
        this.doEverything();
    }

    doEverything = () => {
        getUserState(val => {
            if (val) {
                getFollowingProviders(response => {
                    this.state.following = response.map(p => p.pk);

                    const prov = this.props.providers.slice(0, this.state.offset);
                    const parsedProviders = prov.map(p => (JSON.parse(p.fields.aktordatabase)));
                    this.setState({
                        providers: prov.map((provider, k) => {

                            if ($.inArray(provider.pk, this.state.following) != -1) {
                                return <div className="col-md-6" key={parsedProviders[k].Id}>
                                    <ProviderCard provider={parsedProviders[k]}
                                                  id={parsedProviders[k].Id} pk={provider.pk} following={true}/>
                                </div>
                            } else {
                                return <div className="col-md-6" key={parsedProviders[k].Id}>
                                    <ProviderCard provider={parsedProviders[k]}
                                                  id={parsedProviders[k].Id} pk={provider.pk} following={false}/>
                                </div>
                            }
                        }),
                    });
                });
            }
            else {
                const prov = this.props.providers.slice(0, this.state.offset);
                const parsedProviders = this.props.providers.map(p => (JSON.parse(p.fields.aktordatabase)));
                this.setState({
                    providers: this.state.providers = prov.map((provider, k) => {
                        return <div className="col-md-6" key={parsedProviders[k].Id}>
                            <ProviderCard provider={parsedProviders[k]}
                                          id={parsedProviders[k].Id} pk={provider.pk} following={null}/>
                        </div>
                    }),
                });
            }
        });
    };

    render() {
        const styles = {
            loadButtonStyle: {
                marginTop: "2%",
                marginBottom: "2%",
                width: '100%',
                height: "100px",

            }
        };
        if (this.props.providers.length < 1) {
            return <h1>Ingen arrangører funnet</h1>;
        }

        return <div>
            <div className="row">
                {this.state.providers}
                <Button style={styles.loadButtonStyle} className="btn-info" onClick={ () => this.loadMore() }>Last
                    flere</Button>
            </div>
        </div>;
    }
}

export default ProvidersList;
