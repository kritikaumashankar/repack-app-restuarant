import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { isAuthenticated, logout } from '../fakeAuth';


const styles = {
  active: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: 'black',
  }
}

const additionalLinks = (history) => {
  if (isAuthenticated()) {
    return (
      <span>
        <NavLink exact activeStyle={styles.active} to="/">Home</NavLink>
        {' | '}
        <NavLink activeStyle={styles.active} to="/about">About</NavLink>
        {' | '}
        <NavLink activeStyle={styles.active} to="/menus">Menu</NavLink>
        {' '}
        <a href="#" onClick={() => {
          logout()
          history.push("/login")
        }}>
          Logout
        </a>
      </span>
    )
  } else {
    return (
      <NavLink activeStyle={styles.active} to="/login">Login</NavLink>
    )
  }
}

const NavBar = ({ history }) => (
  <nav>
    
    
    {additionalLinks(history)}
    
  </nav>
)

export default withRouter(NavBar);