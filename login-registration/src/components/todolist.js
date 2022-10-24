import React, { Component } from "react";
import addTask from "./addTask";
import { Link } from "react-router-dom";
export default class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDisplay: '',
            addTaskPopup: false,
            data: []
        };
        this.addTask = this.addTask.bind(this);
    }
    componentDidMount() {
        this.setState({
            data: [
                { id: "1", name: "AD", status: "active" },
                { id: "2", name: "DS", status: "completed" },
            ]
        })
    }

    displayAll() {
        console.log("All")
        this.setState({
            currentDisplay: 'all'
        });

    }

    displayActive() {
        console.log("Active")
        this.setState({ currentDisplay: 'active' });
    }

    displayCompleted() {
        console.log("Completed")
        this.setState({ currentDisplay: 'completed' });
    }

    removeCompleted() {
        console.log("Completed")
        this.setState({ currentDisplay: 'completed' });
    }

    search() {
        console.log("Completed")
        this.setState({ currentDisplay: 'completed' });
    }

    updateStatus = (currentState, action) => {
        console.log("CurrentStatus: ", currentState)
        console.log("action: ", action)
        //call api to make changes
        //call api that returns all task
    }

    addTask() {
        this.setState({ addTaskPopup: true })
    }

    handleClose() {
        this.setState({ addTaskPopup: false })
    }
    render() {
        return (
            <>
                {
                    this.state.addTaskPopup === true
                        ? window.location.href = "./addTask"
                        : <div>
                            <div className="mb-5 searchButtons">
                                <input
                                    type="text"
                                    className="searchField"
                                    placeholder="Enter task to search..."
                                    value={this.state.name}
                                    onChange={(e) => this.setState({ name: e.target.value })}
                                />
                                <button type="button" class="btn btn-success btn-lg button_d" onClick={this.search}>Search</button>
                                <button type="button" class="btn btn-success btn-lg button_d" onClick={this.addTask}>Add task</button>
                                <button type="button" class="btn btn-danger btn-lg button_d" onClick={this.removeCompleted}>Remove All Completed</button>
                            </div>

                            <div className="viewButtons">
                                <button type="button" class="btn btn-success btn-lg button_d" onClick={this.displayAll}>All</button>
                                <button type="button" class="btn btn-success btn-lg button_d" onClick={this.displayActive}>Active</button>
                                <button type="button" class="btn btn-success btn-lg button_d" onClick={this.displayCompleted}>Completed</button>
                            </div>

                            <table className="tableClass">
                                <tr className="tableFields">
                                    <th className="tableFields">Id</th>
                                    <th className="tableFields">Task name</th>
                                    <th className="tableFields">Status</th>
                                    <th className="tableFields">Actions</th>
                                </tr>
                                {this.state.data.map((val, key) => {
                                    return (
                                        <tr key={key} className="tableFields">
                                            <td className="tableFields">{val.id}</td>
                                            <td className="tableFields">{val.name}</td>
                                            <td className="tableFields">{val.status}</td>
                                            <td className="tableFields">{val.status === "completed"
                                                ? <>
                                                    <button type="button" class="btn btn-success btn-lg button_d" onClick={this.displayCompleted}>View</button>
                                                    <button type="button" class="btn btn-success btn-lg button_d" onClick={() => this.updateStatus(val.status, "active")}>Active</button>
                                                    <button type="button" class="btn btn-danger btn-lg button_d">Remove</button>
                                                </>
                                                : <>
                                                    <button type="button" class="btn btn-success btn-lg button_d">View</button>
                                                    <button type="button" class="btn btn-success btn-lg button_d">Complete</button>
                                                </>
                                            }</td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>

                }
            </>
        );
    }
}