import React, { Fragment } from 'react';
import { login } from '../fakeAuth';

const Login = ({ history }) => (
  <Fragment>
    <h3>Login</h3>
    <button onClick={ () => {
        login()
        history.push('/')
    }}>
        Login
    </button>
  </Fragment>
)

export default Login;