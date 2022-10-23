import React, { Component } from "react";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phoneNumber: "",
      bio: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  componentDidMount() {
    fetch("http://localhost:12230/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.status == "error"){
          window.location.href = ".";
        }
        this.setState({ name: data.data.name });
        this.setState({ phoneNumber: data.data.phoneNumber });
        this.setState({ email: data.data.email });
        this.setState({ bio: data.data.bio });
        this.setState({ password: data.data.password });
      });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { name, email, password, bio, phoneNumber } = this.state;
    fetch("http://localhost:12230/edit-details", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        bio,
        phoneNumber
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Details Edited");
      });
  }
  signOut() {
    window.localStorage.removeItem('token');
    window.location.href = ".";
  }
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <h3>Profile</h3>
  
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Name"
              value = {this.state.name}
              onChange={(e) => this.setState({ name: e.target.value})}
            />
          </div>
  
          <div className="mb-3">
            <label>Bio</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter you bio"
              value = {this.state.bio}
              onChange={(e) => this.setState({ bio: e.target.value })}
            />
          </div>
  
         
          <div className="mb-3">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Phone Number"
              value = {this.state.phoneNumber}
              onChange={(e) => this.setState({ phoneNumber: e.target.value})}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your Email"
              value = {this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
  
          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
          <br></br>
          <div className="d-grid">
            <button onClick={this.signOut} className="btn btn-success">
              Sign out
            </button>
          </div>
        </form>
      );
    }
  }