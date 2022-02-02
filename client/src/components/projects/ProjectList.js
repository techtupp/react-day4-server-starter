// components/projects/ProjectList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.css';

import AddProject from './AddProject'; // <== !!!

class ProjectList extends Component {
  constructor() {
    super();
    this.state = { listOfProjects: [] };
  }

  getAllProjects = () => {
    axios.get("/api/projects")
      .then(responseFromApi => {
        this.setState({
          listOfProjects: responseFromApi.data
        })
      })
  }

  componentDidMount() {
    this.getAllProjects();
  }

  render() {
    return (
      <table class="table">
        <div>

          <tr>
            <div>
              <h1>
                Todo List
              </h1>
            </div>
          </tr>
          <tr>
            <div style={{ width: '40%', float: "right" }}>
              <AddProject getData={() => this.getAllProjects()} /> {/* <== !!! */}
            </div>
          </tr>
          <tr>
            <div class='columns is-mobile is-centered'>
              <div class='column is-6'>
                <div class='list'>
                  {this.state.listOfProjects.map(project => {
                    return (
                      <td>
                        <div key={project._id}>
                          <Link to={`/projects/${project._id}`}>
                            <h3 class="list-item">{project.title}</h3>
                          </Link>
                        </div>
                      </td>
                    )
                  })
                  }
                </div>
              </div>
            </div>
          </tr>
        </div>

      </table>
    )
  }
}

export default ProjectList;
