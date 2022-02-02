// auth/Signup.js

import React, { Component } from 'react';
import { signup } from '../../api.js';
import 'bulma/css/bulma.css';

import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    signup(username, password)
      .then(response => {
        this.setState({
          username: "",
          password: "",
        });
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
      <div class="container" style={{ width: '25%' }}>
        <form class="box is-half is-offset-one-quarter" onSubmit={this.handleFormSubmit}>
          <div class="field">
            <label class="label">Username:</label>
            <div class="control is-normal">
              <input class="input is-focused" type="text" name="username" placeholder="username" value={this.state.username} onChange={e => this.handleChange(e)} />
            </div>
          </div>
          <div class="field">
            <label class="label">Password:</label>
            <div class="control is-normal">
              <input class="input is-focused" type="password" name="password" placeholder="password" value={this.state.password} onChange={e => this.handleChange(e)} />
            </div>
          </div>
          <div class="buttons">
            <input class="button is-primary" type="submit" value="Signup" />
          </div>
        </form>
        <div class="field">
          <div>
            Already have account?
            <Link class="button is-dark" to={"/"}> Login</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;