import React from 'react';
import ReactDOM from 'react-dom';
import ActivitiesContainer from './ActivitiesContainer';

if (document.getElementById('activities')) {
    ReactDOM.render(
        <ActivitiesContainer/>,
        document.getElementById('activities')
    );
}
