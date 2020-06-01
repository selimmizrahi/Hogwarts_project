import React from "react";
// import Dashboard from "./components/dashboard";
import ListStudents from "./components/ListOfStudents";
import Register from "./components/Register";
import AddStudent from "./components/AddStudent";
import Login from "./components/Login";
import Student from "./components/student";
// import AddStudent from "./components/addStudent";
import "./App.css";
// import Student from "./components/Student";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div className="navbar">
            <Link className="navbar-item" to="/">
              Home
            </Link>
            <Link className="navbar-item" to="/students">
              Student List
            </Link>
            <Link className="navbar-item" to="/addstudent">
              Add A Student
            </Link>
            <Link className="navbar-item" to="/register">
              Register
            </Link>
            <Link className="navbar-item" to="/login">
              Login
            </Link>
            <Link className="navbar-item" to="/dashboard"></Link>
          </div>
          <Switch>
            <Route path="/addstudent">
              <AddStudent></AddStudent>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/student/:id">
              <Student></Student>
            </Route>
            <Route path="/students">
              <ListStudents></ListStudents>
            </Route>
            <Route path="/">
              <h1> Welcome to Hogwarts Magic University!</h1>
            </Route>
            {/* <Route path="/student/:id">
              <Student></Student>
            </Route>
            <Route path="/add/student">
              <AddStudent></AddStudent>
            </Route>
            <Route path="/dashboard">
              <Dashboard></Dashboard> */}
            {/* </Route> */}
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
