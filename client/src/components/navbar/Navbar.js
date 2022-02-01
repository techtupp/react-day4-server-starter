// components/navbar/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.css';
import { logout } from '../../api'

const logoutUser = (props) =>{
  logout()
  .then(() => {
    props.updateUser(null);  // sets the global user object to 'null'
  })
}

const navbar = (props) => {

  if (props.userInSession) {
    return (
      <nav class="navbar">
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
          <ul>
            <li><Link to='/' style={{ textDecoration: 'none' }}>Login</Link></li>
            <li><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default navbar;