import React from 'react';

import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Landing from './pages/landing';
import Register from './pages/registerationFinal';
import Validation from './pages/registerationValidation';
import HeaderMain from './components/headerMain';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(255,255,255,1)',
    },
    secondary: {
      main: '#3d40d8',
    },
  },
});
// import Portfolio from './components/portfolio';

const App = () => (
  <div>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={HeaderMain} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/validate" component={Validation} />
      </Router>
    </MuiThemeProvider>
  </div>
);

export default App;
