import React from "react";
import axios, * as others from "axios";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class List extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
    };
  }
  componentDidMount = () => {
    this.getstudents();
  };

  getstudents = () => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        const studentdata = response.data;
        console.log(studentdata);
        this.setState({ data: studentdata.data });
        console.log(this.state.data);
        return response.json;
      })
      .catch(() => {
        alert("Retriving data");
      });
  };

  render() {
    return (
      <div>
        {this.state.data && (
          <div className="list_students">
            {this.state.data.map((student) => {
              return (
                <div className="student">
                  <h2>
                    <Link to={`/student/${student._id}`}>
                      Name: {student.first_name} {student.last_name}
                    </Link>
                  </h2>
                  <p> Created On: {student.creation_time}</p>
                  <p> StudentID: {student._id}</p>
                  <p> Desired_Skills: {student.user_skills}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default List;
