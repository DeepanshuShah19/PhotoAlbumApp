import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { name, email, password,confirmPassword } = this.state;
    console.log(name, email, password);
    fetch("http://localhost:12230/register", {
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
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "UserRegistered");
      if (data.status == "ok"&& name!=="" && email!=="" && password!=="" && password===confirmPassword) {
        alert("Register successful");
        window.localStorage.setItem("token", data.data);
        window.location.href = "./userDetails";
      }
      else if(password!==confirmPassword){
        alert("Passwords doesn't match")
      }
      else{
        alert("Field empty")
      }
    });
  }
  render() {
    return (
         
    
      <div class="p-3 mb-2 bg-light ">
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Email </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            minlength="6"
            maxlength="8"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
        </div>
        <hr></hr>
        <p className="forgot-password text-right">
        <center>Already have an account? <br></br><h3><a href="/sign-in" class="text-success">Log In</a></h3></center>
        </p>
      </form>
      </div>
     
    );
  }
}
