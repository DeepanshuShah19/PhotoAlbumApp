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
            data:[]
        };

    }
    componentDidMount() {
        this.setState({
            data : [
                { name: "Anom", age: 19, gender: "Male" },
        { name: "Megha", age: 19, gender: "Female" },
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
    
    render() {

    //     data = [
    //         { name: "Anom", age: 19, gender: "Male" },
    // { name: "Megha", age: 19, gender: "Female" },
    //     ]
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <div className="mb-5">
                        <input
                            type="text"
                            className="searchField"
                            placeholder="Enter task to search..."
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />
                        <button type="button" class="btn btn-success btn-lg button_d" onClick={this.displayAll}>Search</button>
                        <button type="button" class="btn btn-success btn-lg button_d" onClick={this.displayAll}>Add task</button>
                    </div>
                    <div>
                        <button type="button" class="btn btn-success btn-lg button_d" onClick={this.displayAll}>All</button>
                        <button type="button" class="btn btn-success btn-lg button_d" onClick={this.displayActive}>Active</button>
                        <button type="button" class="btn btn-success btn-lg button_d" onClick={this.displayCompleted}>Completed</button>
                    </div>
                </form>

                {/* <table>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Current Status</th>
                        <th>Actions</th>
                    </tr>
                    <tr>
                        <td>Anom</td>
                        <td>19</td>
                        <td>Male</td>
                    </tr>
                    <tr>
                        <td>Megha</td>
                        <td>19</td>
                        <td>Female</td>
                    </tr>
                    <tr>
                        <td>Subham</td>
                        <td>25</td>
                        <td>Male</td>
                    </tr>
                </table> */}
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                    </tr>
                    {this.state.data.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.name}</td>
                                <td>{val.age}</td>
                                <td>{val.gender}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        );
    }
}