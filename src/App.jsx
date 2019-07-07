import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import store from './store';
import Landing from './pages/landing';
import Register from './pages/registerationFinal';
import Validation from './pages/registerationValidation';
import HeaderMain from './components/headerMain';
import setAuthToken from './utility/setauthtoken';
import { loadUser } from './actions/auth';

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
            <Route exact path="/register" component={Register} />
            <Route exact path="/home" component={HeaderMain} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/validate" component={Validation} />
          </Router>
        </MuiThemeProvider>
      </div>
    </Provider>
  );
};

export default App;
