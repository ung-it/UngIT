import React, { Component } from 'react';
import Aktivitet from './Aktivitet';

class App extends Component {
    render() {
        return (
            <div>
                <h2>Kommende Aktiviteter</h2>
                <Aktivitet/>
            </div>
        );
    }
}

export default App;