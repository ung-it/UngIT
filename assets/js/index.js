import React from 'react';
import ReactDOM from 'react-dom';
import LoginModal from './LoginModal';
import ActivitiesContainer from './ActivitiesContainer';

ReactDOM.render(
    <ActivitiesContainer/>,
    document.getElementById('activities')
);
ReactDOM.render(
    <LoginModal />,
    document.getElementById('loginComponent')
);