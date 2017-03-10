import React from 'react';
import ReactDOM from 'react-dom';
import WeekPicker from './WeekPicker';
import ActivityPicker from './ActivityPicker';
import SuitedForPicker from './SuitedForPicker';
import LoginModal from './LoginModal';
import ActivitiesContainer from './ActivitiesContainer';
import AllActivitiesContainer from './AllActivitiesContainer';
import AdaptionChips from './AdaptionChips';

if (document.getElementById('activities')) {
    ReactDOM.render(
        <ActivitiesContainer/>,
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

if (document.getElementById('loginComponent')) {
    ReactDOM.render(
        <LoginModal />,
        document.getElementById('loginComponent')
    );
}

if (document.getElementById('allActivities')) {
    ReactDOM.render(
        <AllActivitiesContainer/>,
        document.getElementById('allActivities')
    );
}

if (document.getElementById('adaptions-container')) {
    ReactDOM.render(
        <AdaptionChips/>,
        document.getElementById('adaptions-container')
    );
}
