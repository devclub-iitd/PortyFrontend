import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if(loading) {
        return <div>loading</div>
      }
      else if(!loading && !isAuthenticated) {
        return <Redirect to="/" />;
      }
      else return <Component {...props} />;
    }

      
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth : state.auth
})



export default connect(mapStateToProps)(PrivateRoute);