import React from 'react';

import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Land from './pages/land';


// class App extends React.Component {
//     render() {
//         return (
//         );
//     }
// }

const App = () => (
  <div>
    <Router>
      <Route path="/" component={Land} />
    </Router>
  </div>
);

export default App;
