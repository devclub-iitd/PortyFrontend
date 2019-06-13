import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

import HeaderLogin from '../components/headerLogin.js'

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

class Land extends React.Component {
    render() {
        return (
          <Router>
          <div>
            <HeaderLogin/>
          </div>
          </Router>
        );
    }
}

export default Land;
