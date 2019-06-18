import React from 'react';

import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './pages/landing';


const App = () => (
  <div>
    <Router>
      <Route path="/" component={Landing} />
    </Router>
  </div>
);

export default App;
