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
        <form class="box is-half is-offset-one-quarter" onSubmit={this.handleFormSubmit}>
          <div class="field">
            <label class="label">Username:</label>
            <div class="control is-normal">
              <input class="input" type="text" name="username" placeholder="Username" value={this.state.username} onChange={e => this.handleChange(e)} />
            </div>
          </div>
          <div class="field">
            <label class="label">Password:</label>
            <div class="control">
              <input class="input" type="password" name="password" placeholder="Password" value={this.state.password} onChange={e => this.handleChange(e)} />
            </div>
          </div>
          <div class="buttons">
            <input cass="button is-dark" type="submit" value="Login" />
          </div>
        </form>
        <div>
          Don't have account?
        </div>
        <div class="field">
          <Link class="button is-primary" to={"/signup"}> Signup</Link>
        </div>
      </div>
    )
  }
}

export default Login;