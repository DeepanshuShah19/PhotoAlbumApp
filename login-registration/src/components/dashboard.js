import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
        constructor(props) {
          super(props);
          if(window.localStorage.getItem("token") == null){
            window.location.href = ".";
          }
        }
  
  render() {
    return (
      <div class="p-3 mb-2 bg-light">
         <p class="dashb"> Welcome to the Dashboard</p>
         <center>
            <Link to="/userDetails"><button type="button" class="btn btn-success btn-lg button_d">View Profile</button></Link>
            <Link to="/todolist"><button type="button" class="btn btn-success btn-lg button_d">View To-Do List</button></Link>
         </center>
        </div>
    );
  }
}
