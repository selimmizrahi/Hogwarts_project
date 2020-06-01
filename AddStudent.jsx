import React, { Component } from "react";
import axios, * as others from "axios";
import { register } from "./Functions";
import { withRouter } from "react-router-dom";

class AddStudent extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      existing_skill: [
        "Legilimency",
        "Parseltongue",
        "Teleportation",
        "Animagus",
        "Metamorphmagi",
        "Potion",
      ],
      course_list: [
        "Alchemy",
        "Study of Ancient Runes",
        "Muggle Studies",
        "History of Magic",
        "Astronomy",
        "Herbology",
        "Care of Magical Creatures",
        "Flying",
      ],
      courses: "",
      Legilimency: 0,
      Parseltongue: 0,
      Teleportation: 0,
      Animagus: 0,
      Metamorphmagi: 0,
      Potion: 0,
      Legilimency2: 0,
      Parseltongue2: 0,
      Teleportation2: 0,
      Animagus2: 0,
      Metamorphmagi2: 0,
      Potion2: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  list_of_course(event, interested_in_courses) {
    this.setState({ error: false });
    if (event.target.checked) {
      if (this.state.courses.split(",").indexOf(interested_in_courses) == -1) {
        if (this.state.courses != "") {
          this.setState({
            courses: this.state.courses + "," + interested_in_courses,
          });
        } else {
          this.setState({
            courses: this.state.courses + interested_in_courses,
          });
        }
      }
    } else {
      let list = this.state.courses.split(",");
      list = list.filter((item) => {
        return item != interested_in_courses;
      });
      this.setState({ courses: list.join(",") });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      existing_skills: {
        Animagus: parseInt(this.state.Animagus),
        Legilimency_And_Occlumency: parseInt(this.state.Legilimency),
        Parseltongue: parseInt(this.state.Parseltongue),
        Teleportation: parseInt(this.state.Teleportation),
        Metamorphmagi: parseInt(this.state.Metamorphmagi),
        Potion: parseInt(this.state.Potion),
      },
      desired_skills: {
        Animagus: parseInt(this.state.Animagus2),
        Legilimency_And_Occlumency: parseInt(this.state.Occlumency2),
        Parseltongue: parseInt(this.state.Parseltongue2),
        Teleportation: parseInt(this.state.Teleportation2),
        Metamorphmagi: parseInt(this.state.Metamorphmagi2),
        Potion: parseInt(this.state.Potion2),
      },
      interested_in_courses: this.state.courses.split(","),
    };
    axios
      .post("http://localhost:5000/student/register", newUser)
      .then((res) => {
        this.props.history.push("");
      });
    //   .catch((err) => {
    //     alert("Retriving data");
    //   });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form
              className="title jumbotron"
              noValidate
              onSubmit={this.onSubmit}
            >
              <h1 className="h3 font-weight-normal">Add New Student</h1>
              <div className="form-group">
                <label htmlFor="first_name">First Name </label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Enter First Name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Enter Last Name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <div className="HeadingFonts">Magic Skills</div>
                <ul>
                  {this.state.existing_skill.map((skill) => {
                    return (
                      <li className="level">
                        <span>{skill}</span>
                        <select
                          className="selectors"
                          name={skill}
                          onChange={(event) => {
                            this.onChange(event);
                          }}
                        >
                          <option className="selectors">1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <div className="HeadingFonts">Desired Skills</div>

                <ul>
                  {this.state.existing_skill.map((skill) => {
                    return (
                      <li className="level">
                        <span>{skill}</span>
                        <select
                          name={skill + "2"}
                          onChange={(event) => {
                            this.onChange(event);
                          }}
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <div>
                  <p className="HeadingFonts">Courses</p>
                </div>
                <ul>
                  {this.state.course_list.map((interested_in_courses) => {
                    return (
                      <li className="level">
                        <label for={interested_in_courses}>
                          {interested_in_courses}
                        </label>
                        <input
                          type="checkbox"
                          id={interested_in_courses}
                          name={interested_in_courses}
                          onChange={(event) => {
                            this.list_of_course(event, interested_in_courses);
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
              {this.state.error && <p>{this.state.errorMessage}</p>}
              <button
                type="submit"
                className=" buttonadd btn btn-lg.btn-primary btn-block"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AddStudent;
