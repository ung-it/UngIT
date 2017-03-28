import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from "react-redux";


import configureStore from "../configureStore";
const store = configureStore();

class AllProvidersContainer extends Component {

    render() {
        return (
            <h1>Sigve was here, Christina as well</h1>
        )
    }
}


ReactDOM.render(
    <Provider store={store}>
        <AllProvidersContainer />
    </Provider>,
    document.getElementById('allProviders')
);
