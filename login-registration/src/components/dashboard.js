import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
  
  render() {
    return (
      <div class="p-3 mb-2 bg-light">
         <p class="dashb"> Welcome to Dashboard</p>
         <Link to="/userDetails"><button type="button" class="btn btn-success btn-lg button_d">View Details</button></Link>
         <Link to="/userDetails"><button type="button" class="btn btn-success btn-lg button_d">Edit Details</button></Link>
        </div>
    );
  }
}
