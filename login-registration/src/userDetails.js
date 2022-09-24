
|import React, { Component } from "react";

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
    fetch("http://localhost:5000/userData", {
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
    fetch("http://localhost:5000/edit-details", {
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
              value = {this.state.name}
              onChange={(e) => this.setState({ name: e.target.value})}
            />
            </div>
            //declearing html elements

            const imgDiv = document.querySelector('.profile-pic-div');
            const img = document.querySelector('#photo');
            const file = document.querySelector('#file');
            const uploadBtn = document.querySelector('#uploadBtn');

           

            imgDiv.addEventListener('mouseenter', function(){
                uploadBtn.style.display = "block";
});

            

            imgDiv.addEventListener('mouseleave', function(){
                uploadBtn.style.display = "none";
});

           

            file.addEventListener('change', function(){
    
    const choosedFile = this.files[0];

            if (choosedFile) {

        const reader = new FileReader(); //FileReader is a predefined function of JS

            reader.addEventListener('load', function(){
                img.setAttribute('src', reader.result);
        });

            reader.readAsDataURL(choosedFile);

        
    }
});
  
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
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              value = {this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
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
            <label>Password</label>
            <input
              type="text"
              className="form-control"
              value = {this.state.password}
              onChange={(e) => this.setState({ password: e.target.value})}
            />
          </div>
  
  
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
          <br></br>
          <div className="d-grid">
            <button onClick={this.signOut} className="btn btn-primary">
              Sign out
            </button>
          </div>
        </form>
      );
    }
  }