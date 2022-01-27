// components/tasks/TaskDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.css';

class TaskDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getTheTask();
  }

  getTheTask = () => {
    const { params } = this.props.match;
    axios.get(`/api/tasks/${params.taskId}`)
    .then( responseFromApi =>{
      const theTask = responseFromApi.data;
      this.setState(theTask);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  // DELETE TASK:
  deleteTask = () => {
    const { params } = this.props.match;
    axios.delete(`/api/tasks/${params.taskId}`)
    .then( () =>{
        this.props.history.push('/tasks'); // !!!         
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  render(){
    return(
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <button onClick={() => this.deleteTask()}>Delete Task</button> {/* <== !!! */}
        <br/>
        <Link to={'/api/projects/${params.id}'}>Back to tasks</Link>
      </div>
    )
  }
}

export default TaskDetails;