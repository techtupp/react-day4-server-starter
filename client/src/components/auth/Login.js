// auth/Login.js

import React, { Component } from 'react';
import { login } from '../../api'
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    login(username, password)
      .then(response => {
        this.setState({ username: "", password: "" });
        this.props.updateUser(response)
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div class="container">
        <form class="box" onSubmit={this.handleFormSubmit}>
          <div class="field">
            <label class="label">Username:</label>
            <div class="control is-normal">
              <input class="input" type="text" name="username" placeholder="Username" value={this.state.username} onChange={e => this.handleChange(e)} />
            </div>
          </div>
          <div class="field">
            <label class="label">Password:</label>
            <div class="control">
              <input class="input" type="text" name="password" placeholder="Password" value={this.state.password} onChange={e => this.handleChange(e)} />
            </div>
          </div>
          <input cass="button is-hovered" type="submit" value="Login" />
        </form>
        <p>Don't have account?
          <div class="field">
            <Link class="button is-primary" to={"/signup"}> Signup</Link>
          </div>
        </p>
      </div>
    )
  }
}

export default Login;