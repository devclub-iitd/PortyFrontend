import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

import logo from './logo.svg';
import './App.css';
import Header from './components/header.js'
import Portfolio from './components/pfolio.js'

import Land from './pages/land.js'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {HashRouter} from "react-router-dom";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#3d40d8',
        }
    }
})

// class App extends React.Component {
//     render() {
//         return (
//         );
//     }
// }

const App = () => (
  <div>
    <Router>
      <Route path = "/" component={Land}/>
    </Router>
  </div>
);

export default App;
