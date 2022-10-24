import React, { Component } from "react";

//  let data = [
//     // { name: "Anom", age: 19, gender: "Male" },
//     // { name: "Megha", age: 19, gender: "Female" },
//     // { name: "Subham", age: 25, gender: "Male"},
//   ]
export default class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDisplay: '',
            addTaskPopup: false,
            data: []
        };

    }
    componentDidMount() {
        this.setState({
            data: [
                { id: "1", name: "AD", status: "active" },
                { id: "2", name: "DS", status: "completed" },
            ]
        })

        // fetch("http://localhost:12230/userData", {
        //   method: "POST",
        //   crossDomain: true,
        //   headers: {
        //     "Content-Type": "application/json",
        //     Accept: "application/json",
        //     "Access-Control-Allow-Origin": "*",
        //   },
        //   body: JSON.stringify({
        //     token: window.localStorage.getItem("token"),
        //   }),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     if(data.status == "error"){
        //       window.location.href = ".";
        //     }
        //     this.setState({ name: data.data.name });
        //     this.setState({ phoneNumber: data.data.phoneNumber });
        //     this.setState({ email: data.data.email });
        //     this.setState({ bio: data.data.bio });
        //     this.setState({ password: data.data.password });
        //   });
    }
    //   handleSubmit(e) {
    //     e.preventDefault();
    //     const { name, email, password, bio, phoneNumber } = this.state;
    //     fetch("http://localhost:12230/edit-details", {
    //       method: "POST",
    //       crossDomain: true,
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //       },
    //       body: JSON.stringify({
    //         name,
    //         email,
    //         password,
    //         bio,
    //         phoneNumber
    //       }),
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log(data, "Details Edited");
    //       });
    //   }

    displayAll() {
        console.log("All")
        this.setState({
            currentDisplay: 'all',
            addTaskPopup: true
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

    updateStatus = (currentState,action) => {
        console.log("CurrentStatus: ",currentState)
        console.log("action: ",action)
        //call api to make changes
        //call api that returns all task
    }
    render() {

        // debugger;
        return (
            <div>
                <div className="mb-5 searchButtons">
                    {/* <form onSubmit={this.handleSubmit}> */}
                    <input
                        type="text"
                        className="searchField"
                        placeholder="Enter task to search..."
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />
                    <button type="button" class="btn btn-success btn-lg button_d" onClick={this.search}>Search</button>
                    <button type="button" class="btn btn-success btn-lg button_d" onClick={this.displayAll}>Add task</button>
                    <button type="button" class="btn btn-danger btn-lg button_d" onClick={this.removeCompleted}>Remove All Completed</button>
                    {/* </form> */}
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
                                        <button type="button" class="btn btn-success btn-lg button_d" onClick={() => this.updateStatus(val.status,"active")}>Active</button>
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
        );
    }
}