import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import store from './store';
import Landing from './pages/landing';
import Portfolio from './pages/portfolio';
import Portfolio2 from './pages/portfolio_2';
import Portfolio3 from './pages/portfolio_3';
import Register from './pages/registerationFinal';
import Validation from './pages/registerationValidation';
import HeaderMain from './components/headerMain';
import setAuthToken from './utility/setauthtoken';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/privateRoute';
import PublicPortfolio from './pages/publicPortfolio';
import Regenerate from './pages/regenerateOTP';
import Reset from './pages/resetPassword';
import ResetSucc from './pages/resetSucc';

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

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


const App = () => {
  // useeffect hook
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); // we want to run only once hence the empty array

  return (
    <Provider store={store}>
      <div>
        <MuiThemeProvider theme={theme}>
          <Router>
            <PrivateRoute exact path="/register" component={Register} />
            <PrivateRoute exact path="/home" component={HeaderMain} />
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/portfolio" component={Portfolio} />
            <PrivateRoute exact path="/portfolio2" component={Portfolio2} />
            <PrivateRoute exact path="/portfolio3" component={Portfolio3} />
            <Route exact path="/validate" component={Validation} />
            <Route exact path="/regenerate" component={Regenerate} />
            <Route exact path="/reset" component={Reset} />
            <Route exact path="/resetSucc" component={ResetSucc} />
            <Route exact path="/portfolio/:id" component={PublicPortfolio} />
          </Router>
        </MuiThemeProvider>
      </div>
    </Provider>
  );
};

export default App;
