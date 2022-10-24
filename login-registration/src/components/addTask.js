import React, { Component } from "react";

import { addTask } from "../utils/utils";
export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      storyPoints: "",
      taskAdded: false
    };
    this.addNewtask = this.addNewtask.bind(this);

  }
  componentDidMount() {
    console.log("in add task")
  }
  async addNewtask() {
    //api call here
    console.log(this.state.name, this.state.desc, this.state.storyPoints)
    await addTask(this.state.name, this.state.desc, this.state.storyPoints)
    this.setState({ taskAdded: true })
  }
  render() {
    return (
      <>
        {this.state.taskAdded === true
          ? window.location.href = "./todolist"
          : <>
            <h3>Add task</h3>

            <div className="mb-3">
              <label>Task Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Task Name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Task Description"
                value={this.state.bio}
                onChange={(e) => this.setState({ desc: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Story Points</label>
              <input
                type="text"
                className="form-control"
                placeholder="Story Points"
                value={this.state.phoneNumber}
                onChange={(e) => this.setState({ storyPoints: e.target.value })}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success" onClick={this.addNewtask}>
                Add task
              </button>
            </div>
            <br></br>
          </>
        }
      </>
    );
  }
}