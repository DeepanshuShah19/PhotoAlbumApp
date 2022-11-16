import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";
import Dashboard from "./components/dashboard";
import TodoList from "./components/todolist";
import AddTask from "./components/addTask";
import PhotoAlbumApp from "./components/PhotoAlbumApp";
function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/userDetails" element={<UserDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/todolist" element={<TodoList />} />
              <Route path="/addTask" element={<AddTask />} />
              <Route path="/photoAlbumApp" element={<PhotoAlbumApp />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
