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


        <tr>
          <div>
            <h1>
              Todo List
            </h1>
          </div>
        </tr>
        <tr>
          <td>
            {/* <div class='columns is-mobile is-centered'>
                <div class='column is-8'>
                  <div class='list'> */}
            {this.state.listOfProjects.map(project => {
              return (

                <div key={project._id}>

                  <Link to={`/projects/${project._id}`}>
                    <h3 class="list-item">{project.title}</h3>
                  </Link>

                </div>

              )
            })
            }
            {/*    </div>
                </div>
              </div> */}
          </td>
          <td>
            <div style={{ float: "right" }}>
              <AddProject getData={() => this.getAllProjects()} /> {/* <== !!! */}
            </div>
          </td>
        </tr>


      </table>
    )
  }
}

export default ProjectList;
