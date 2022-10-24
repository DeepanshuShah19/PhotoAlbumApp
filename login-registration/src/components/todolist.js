import React, { Component } from "react";
import addTask from "./addTask";
import { Link } from "react-router-dom";
import { setActive, getAllTasks, setCompleted, removeTask, deleteAllCompleted } from "../utils/utils";
export default class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDisplay: '',
            addTaskPopup: false,
            data: []
        };
        this.addTask = this.addTask.bind(this);
        this.displayAll = this.displayAll.bind(this)
        this.displayActive = this.displayActive.bind(this)
        this.displayCompleted = this.displayCompleted.bind(this)
        // this.removeCompleted = this.removeCompleted.bind(this)
        this.removeAllCompleted = this.removeAllCompleted.bind(this)
        this.search = this.search.bind(this)
        this.updateStatus = this.updateStatus.bind(this)
    }
    async componentDidMount() {
        let data = await getAllTasks()

        console.log("printing data\n", data.allTasks)

        this.setState({
            data: data.allTasks
        })


    }



    async displayAll() {
        console.log("Getting all tasks")

        let responseData = await getAllTasks()

        console.log("printing data\n", responseData.allTasks)

        this.setState({
            data: responseData.allTasks
        })

    }

    async displayActive() {
        console.log("Active")
        // this.setState({ currentDisplay: 'active' });
        let responseData = await getAllTasks()

        console.log("printing data from display \n", responseData.allTasks)

        this.setState({
            data: responseData.activeTasks
        })
    }

    async displayCompleted() {
        console.log("Completed")
        // this.setState({ currentDisplay: 'completed' });

        let responseData = await getAllTasks()

        console.log("printing data\n", responseData.completedTasks)

        this.setState({
            data: responseData.completedTasks
        })
    }

    async removeAllCompleted() {
        console.log("Removing all completed")
        await deleteAllCompleted()
        this.displayAll()
    }

    async updateStatus(task, action) {
        console.log("CurrentStatus: ", task.task_status)
        console.log("action: ", action)

        if (action == "complete") {
            await setCompleted(task.task_id)
        }
        else if (action == "active") {
            await setActive(task.task_id)
        }
        else if (action == "remove") {
            await removeTask(task.task_id)
        }
        this.displayAll()

        //call api to make changes
        //call api that returns all task
    }

    async displayCompleted() {
        console.log("Completed")
        // this.setState({ currentDisplay: 'completed' });

        let responseData = await getAllTasks()

        console.log("printing data\n", responseData.completedTasks)

        this.setState({
            data: responseData.completedTasks
        })
    }

    async removeAllCompleted() {
        console.log("Removing all completed")
        let responseData = await deleteAllCompleted()
        this.displayAll()
    }

    async updateStatus(task, action) {
        console.log("CurrentStatus: ", task.task_status)
        console.log("action: ", action)

        if (action == "complete") {
            let response = await setCompleted(task.task_id)
        }
        else if (action == "active") {
            let response = await setActive(task.task_id)
        }
        else if (action == "remove") {
            let response = await removeTask(task.task_id)
        }
        this.displayAll()

        //call api to make changes
        //call api that returns all task
    }


    search() {
        console.log("Completed")
        this.setState({ currentDisplay: 'completed' });
    }



    addTask() {
        this.setState({ addTaskPopup: true })
        // window.location.href = "./addTask"
    }

    // handleClose() {
    //     this.setState({ addTaskPopup: false })
    // }
    render() {

        // debugger;
        return (
            <>
                {
                    this.state.addTaskPopup === true
                        ? window.location.href = "./addTask"
                        :
                        <div>
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
                                <button type="button" class="btn btn-danger btn-lg button_d" onClick={this.removeAllCompleted}>Remove All Completed</button>
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
                                    <th className="tableFields">Stroy Points</th>
                                    <th className="tableFields">Actions</th>
                                </tr>
                                {this.state.data.map((val, key) => {
                                    return (
                                        <tr key={key} className="tableFields">
                                            <td className="tableFields">{val.task_id}</td>
                                            <td className="tableFields">{val.task_name}</td>
                                            <td className="tableFields">{val.task_status}</td>
                                            <td className="tableFields">{val.story_points}</td>
                                            <td className="tableFields">{val.task_status === "Complete"
                                                ? <>
                                                    <button type="button" class="btn btn-success btn-lg button_d" onClick={this.displayCompleted}>View</button>
                                                    <button type="button" class="btn btn-success btn-lg button_d" onClick={() => this.updateStatus(val, "active")}>Active</button>
                                                    <button type="button" class="btn btn-danger btn-lg button_d" onClick={() => this.updateStatus(val, "remove")}>Remove</button>
                                                </>
                                                : <>
                                                    <button type="button" class="btn btn-success btn-lg button_d">View</button>
                                                    <button type="button" class="btn btn-success btn-lg button_d" onClick={() => this.updateStatus(val, "complete")}>Complete</button>
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