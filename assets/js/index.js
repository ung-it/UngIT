import React from 'react';
import ReactDOM from 'react-dom';
import WeekPicker from './WeekPicker';
import ActivityPicker from './ActivityPicker';
import SuitedForPicker from './SuitedForPicker';
import ActivitiesContainer from './ActivitiesContainer';
import AdaptionChips from './AdaptionChips';
import AllActivitiesContainer from './containers/AllActivitiesContainer';
import { Provider } from "react-redux";
import store from "./store";

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
        <Provider store={store}>
            <AllActivitiesContainer />
        </Provider>, document.getElementById('allActivities')
    )
}

if (document.getElementById('adaptions-container')) {
    ReactDOM.render(
        <AdaptionChips/>,
        document.getElementById('adaptions-container')
    );
}
