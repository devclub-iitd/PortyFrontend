import React from 'react';


import { BrowserRouter as Router } from 'react-router-dom';

import HeaderLogin from '../components/headerLogin';


class Land extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <HeaderLogin />
        </div>
      </Router>
    );
  }
}

export default Land;
