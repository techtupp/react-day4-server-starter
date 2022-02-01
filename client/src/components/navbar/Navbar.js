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
      <nav class="navbar is-light is-centered">
        
          <div class="navbar-item">
            <div class="navbar-brand">
              Welcome, {props.userInSession.username}
            </div>
            <div class="buttons">
              <Link class="button is-dark" to='/projects' style={{ textDecoration: 'none' }}>Projects</Link>
              <Link class="button is-light" to='/'> 
                <button onClick={() => logoutUser(props)}>Logout</button>
              </Link>
            </div>
          </div>
        
      </nav >
    )
  } else {
    return (
      <div>
        <nav class="navbar is-light is-centered">
          
            <div class="navbar-item">
              <div class="buttons">
                <Link class="button is-light" to='/' style={{ textDecoration: 'none' }}>Login</Link>
                <Link class="button is-dark" to='/signup' style={{ textDecoration: 'none' }}>Signup</Link>
              </div>
            </div>
      
        </nav>
      </div>
    )
  }
}

export default navbar;