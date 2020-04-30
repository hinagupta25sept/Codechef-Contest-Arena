import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Submission extends Component {
  state = {
    entries: [],
  };
  renderTableData() {
    return this.state.entries.map((entry, index) => {
      const { Id, Language, Username, Result, Score, Time, Memory } = entry;
      return (
        <tr key={Id}>
          <td>{Id}</td>
          <td>{Language}</td>
          <td> {Username}</td>
          <td>{Result}</td>
          <td>{Score}</td>
          <td>{Time}</td>
          <td>{Memory}</td>
        </tr>
      );
    });
  }

  getAccessToken() {
    return localStorage.getItem("accessToken");
  }
  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://api.codechef.com/submissions/?problemCode=" +
        this.props.match.params.problemCode +
        "&contestCode=" +
        this.props.match.params.contestCode +
        "&access_token=" +
        this.getAccessToken(),
      requestOptions
    )
      .then((response) => response.json())
      .then((answer) => {
        var ans = answer;
        var participants = [];
        for (var i = 0; i < ans.result.data.content.length; i++) {
          participants.push({
            Id: ans.result.data.content[i].id,
            Language: ans.result.data.content[i].language,
            Username: ans.result.data.content[i].username,
            Result: ans.result.data.content[i].result,
            Score: ans.result.data.content[i].score,
            Time: ans.result.data.content[i].time,
            Memory: ans.result.data.content[i].memory,
          });
        }

        this.setState({ entries: participants });
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    return (
      <div>
        <h1 id="title">
          Submissions for {this.props.match.params.problemCode}
        </h1>
        <table id="entries">
          <tbody>
            <tr>
              <th>Id</th>
              <th>Language</th>
              <th>Username</th>
              <th>Result</th>
              <th>Score</th>
              <th>Time</th>
              <th>Memory</th>
            </tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Submission;
