import React from 'react';
import ReactDOM from 'react-dom';
import WeekPicker from './WeekPicker';
import ActivityPicker from './ActivityPicker';
import SuitedForPicker from './SuitedForPicker';
import ActivitiesContainer from './ActivitiesContainer';
import AllActivitiesContainer from './containers/AllActivitiesContainer';

//redux import
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
    console.log("Hello from index");
    ReactDOM.render(
        <Provider store={store}>
            <AllActivitiesContainer />
        </Provider>, document.getElementById('allActivities')
    )
    console.log("bye from index");
}

