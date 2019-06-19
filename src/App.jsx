import React from 'react';

import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Register from './pages/registerationFinal'

const App = () => (
  <div>
    <Router>
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Landing} />
    </Router>
  </div>
);

export default App;
