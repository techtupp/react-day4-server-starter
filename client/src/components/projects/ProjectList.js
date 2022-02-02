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
                      <div key={project._id}>
                        <Link to={`/projects/${project._id}`}>
                          <td>
                            <h3 class="list-item">{project.title}</h3>
                          </td>
                          <td>

                          </td>
                        </Link>
                        {/* 🥁 added so the tasks can be displayed:  🥁 */}
                        {/* <ul>
                  { project.tasks.map((task, index) => {
                    return <li key={index}>{task.title}</li>
                  }) }
                </ul>  */}
                        {/* <p style={{maxWidth: '400px'}} >{project.description} </p> */}
                      </div>
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
