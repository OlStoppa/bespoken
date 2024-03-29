import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

const PrivateRoute = ({
  username,
  component: Component,
  ...rest
}) => {
  return (
    <Route {...rest} component={(props) => (
      username !== null ?
        <Component {...props} />
        :
        <Redirect to="/" />


    )} />
  )
};

const mapStateToProps = (state) => ({
  username: state.user.username
});
export default connect(mapStateToProps)(PrivateRoute);

