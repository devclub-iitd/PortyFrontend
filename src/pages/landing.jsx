import React from "react";
import HeaderLogin from "../components/headerLogin";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link , Redirect } from "react-router-dom";

const Landing = ({ isAuthenticated, auth: { loading } }) => {

  if(loading) {
    return <div>loading</div>
  }

  if(!loading && isAuthenticated) {
    return <Redirect to="/home"/>
  }
  return (
    <div>
      <HeaderLogin />
    </div>
  );
};



 

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth : state.auth
});

export default connect(mapStateToProps)(Landing);
