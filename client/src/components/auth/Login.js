// auth/Login.js

import React, { Component } from 'react';
import { login } from '../../api'
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    login(username, password)
    .then( response => {
        this.setState({ username: "", password: "" });
        this.props.updateUser(response)
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    return(
      <div>
        <form class="box" onSubmit={this.handleFormSubmit}>
        <div class="field">
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          </div>
          <div class="field">
          <label>Password:</label>
          <textarea name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          </div>
          <input type="submit" value="Login" />
        </form>
        <p>Don't have account? 
            <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    )
  }
}

export default Login;