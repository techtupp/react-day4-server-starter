// components/navbar/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.css';
import { logout } from '../../api'

const logoutUser = (props) => {
  logout()
    .then(() => {
      props.updateUser(null);  // sets the global user object to 'null'
    })
}

const navbar = (props) => {

  if (props.userInSession) {
    return (
      <nav class="navbar is-light">
        <ul>
          <li>Welcome, {props.userInSession.username}</li>
          <li>
            <Link to='/projects' style={{ textDecoration: 'none' }}>Projects</Link>
          </li>
          <li>
            <Link to='/'>
              <button onClick={() => logoutUser(props)}>Logout</button>
            </Link>
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <div>
        <nav class="navbar">
          <div class="navbar-start">
            <div class="navbar-item">
              <div class="buttons">
                <Link class="button is-light" to='/' style={{ textDecoration: 'none' }}>Login</Link>
                <Link class="button is-dark" to='/signup' style={{ textDecoration: 'none' }}>Signup</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default navbar;