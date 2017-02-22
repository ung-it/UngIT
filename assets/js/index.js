import React from 'react';
import ReactDOM from 'react-dom';
import Activities from './Activities';
import LoginModal from './LoginModal';

ReactDOM.render(
    <Activities />,
    document.getElementById('activities')
);
ReactDOM.render(
    <LoginModal />,
    document.getElementById('loginComponent')
);