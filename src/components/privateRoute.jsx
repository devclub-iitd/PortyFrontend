import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from "prop-types";

import Loader from './loader';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {

    return (
      <Route
        {...rest}
        render={props => {
          if(loading) {
            return(
              <Loader />
            );
          }
          else if(!loading && !isAuthenticated) {
            return <Redirect to="/" />;
          }
          else return <Component {...props} />;
        }


        }
      />
    );

}
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth : state.auth
})



export default connect(mapStateToProps)(PrivateRoute);
