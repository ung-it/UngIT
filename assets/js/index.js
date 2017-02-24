import React from 'react';
import ReactDOM from 'react-dom';
import LoginModal from './LoginModal';
import ActivitiesContainer from './ActivitiesContainer';

if (document.getElementById('activities')) {
    ReactDOM.render(
        <ActivitiesContainer/>,
        document.getElementById('activities')
    );
}
if (document.getElementById('loginComponent')) {
    ReactDOM.render(
        <LoginModal />,
        document.getElementById('loginComponent')
    );
}
