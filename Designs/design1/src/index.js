import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

fetch(`./Data/file.json`)
    .then((r) => r.json())
    .then((data) => {
        console.log(data);
        ReactDOM.render(
            <App appData={data} />,
            document.getElementById('root')
        );
    });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
