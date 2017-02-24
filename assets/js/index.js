import React from 'react';
import ReactDOM from 'react-dom';
import Activities from './Activities';
import WeekPicker from './WeekPicker';
import ActivityPicker from './ActivityPicker';
import SuitedForPicker from './SuitedForPicker';

if (document.getElementById('activities')) {
    ReactDOM.render(
    <Activities />,
    document.getElementById('activities')
    );
}

if (document.getElementById('week')) {
    ReactDOM.render(
        <WeekPicker/>,
        document.getElementById('week')
    );
}

if (document.getElementById('activityfilter')) {
    ReactDOM.render(
        <ActivityPicker/>,
        document.getElementById('activityfilter')
    );
}

if (document.getElementById('suitedfor')) {
    ReactDOM.render(
    <SuitedForPicker />,
    document.getElementById('suitedfor')
    );
}
