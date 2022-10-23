import React, { Component } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    fetch("http://localhost:12230/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          window.localStorage.setItem("token", data.data);
          window.location.href = "./dashboard";
        }
        else{
          alert("Login Unsuccessfull (Username/ Password is wrong.) Please try again")
        }
      });
  };

  handleSuccessfulGoogleLogin = (response) => {
    console.log(response);
    const userDetails = jwt_decode(response.credential);
    console.log(userDetails);

    fetch("http://localhost:12230/google-login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userDetails
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "UserLogin");
        if (data.status == "ok") {
          window.localStorage.setItem("token", data.data);
          window.location.href = "./dashboard";
        }
      });
  }
  render() {
    return (
      <div class="p-3 mb-2 bg-light">
      <form  onSubmit={this.handleSubmit}>
        <h3>Log In</h3>
        <center>
      <GoogleOAuthProvider clientId="826722454189-p68qja08tb1mrbd6af5ufopl8gl3s4pe.apps.googleusercontent.com">
      <GoogleLogin
          onSuccess={this.handleSuccessfulGoogleLogin}
          onError={() => {
          console.log('Google Login Failed');
          }}
        />
        </GoogleOAuthProvider></center>
       
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
            minlength="6"
            maxLength="8"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
              
            />
            <label className="custom-control-label" htmlFor="customCheck1">
             Remember me  
            </label>
          </div>
        </div>

        <div className="d-grid" >
          <button type="submit" className="btn btn-success"> 
            Login 
          </button>
        </div>
        <hr></hr>
      
        <p className="forgot-password text-right">
          <center>Don't have an account? <br></br><h3><a class="text-success" href="/sign-up">Sign Up</a></h3></center>
        </p>
      </form>
      <br></br>
      
        </div>
    );
  }
}
