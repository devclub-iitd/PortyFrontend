import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import store from './store';
import Landing from './pages/landing';
import Portfolio from './pages/portfolio';
import Portfolio2 from './pages/portfolio_2';
import Portfolio3 from './pages/portfolio_3';
import Portfolio4 from './pages/portfolio_4';
import Portfolio5 from './pages/portfolio_5';
import Register from './pages/registerationFinal';
import Validation from './pages/registerationValidation';
import Reset from './pages/resetPassword';
import ResetSucc from './pages/resetSucc';

import setAuthToken from './utility/setauthtoken';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/privateRoute';
import HeaderMain from './components/headerMain';
// import PublicPortfolio from './pages/publicPortfolio';
// import Regenerate from './pages/regenerateOTP';

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
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/register"
                                component={Register}
                            />
                            <PrivateRoute
                                exact
                                path="/home"
                                component={HeaderMain}
                            />
                            <PrivateRoute
                                exact
                                path="/portfolio"
                                component={Portfolio}
                            />
                            <PrivateRoute
                                exact
                                path="/portfolio2"
                                component={Portfolio2}
                            />
                            <PrivateRoute
                                exact
                                path="/portfolio3"
                                component={Portfolio3}
                            />
                            <PrivateRoute
                                exact
                                path="/portfolio4"
                                component={Portfolio4}
                            />
                            <PrivateRoute
                                exact
                                path="/portfolio5"
                                component={Portfolio5}
                            />
                            <Route
                                exact
                                path="/validate"
                                component={Validation}
                            />
                            <Route exact path="/reset" component={Reset} />
                            <Route
                                exact
                                path="/resetSucc"
                                component={ResetSucc}
                            />
                            {/* TODO: ADD SUPPORT FOR PUBLIC PORTFOLIO LATER ON  */}
                            {/* <Route
                                exact
                                path="/portfolio/:id"
                                component={PublicPortfolio}
                            /> */}
                            <Route exact path="/" component={Landing} />
                            <Route
                                path="*"
                                render={() => (
                                    <Redirect to={{ pathname: '/home' }} />
                                )}
                            />
                        </Switch>
                    </Router>
                </MuiThemeProvider>
            </div>
        </Provider>
    );
};

export default App;
