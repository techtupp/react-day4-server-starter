// components/projects/AddProject.js

import React, { Component } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.css';

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "" };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    axios.post("/api/projects", { title, description })
      .then(() => {
        this.props.getData();
        this.setState({ title: "", description: "" });
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <form class="box" onSubmit={this.handleFormSubmit}>
          <div class="field">
            <label class="label">Todo:</label>
            <div class="control">
              <input class="input",type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)} />
            </div>
          </div>
          <div class="field">
            <label class="label">Beschreibung:</label>
            <div class="control">
              <textarea class="textarea is-small is-focused  " name="description" value={this.state.description} onChange={e => this.handleChange(e)} />
            </div>
          </div>
          <div class="field">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}

export default AddProject;