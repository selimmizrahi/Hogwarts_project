import React from "react";
import axios, * as others from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/student/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          data: Object.values(response.data),
        });
      })
      .catch((er) => {
        console.log(er);
      });
  }

  render() {
    return (
      <div>
        {this.state.data && (
          <div className="list_students">
            {this.state.data.map((student) => {
              return (
                <div className="student">
                  <p> First Name: {student.first_name} </p>
                  <p> Last Name: {student.last_name}</p>
                  <p> Created On: {student.creation_time}</p>
                  <p> StudentID: {student._id}</p>
                  <div>
                    {this.state.data.map((desired) => {
                      return (
                        <div>
                          <p>
                            Courses interested in:
                            {desired.interested_in_courses}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Student);
