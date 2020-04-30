import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import { DOMAIN } from "../utils/constant";
import "./style.css";
class Display extends Component {
  state = {
    html: [],
    Languages: [],
    DateAdded: " ",
    TimeLimit: " ",
    SourceLimit: "",
    ProblemName: " ",
  };

  handleClick = () => {
    window.location.assign(DOMAIN + "/run/");
  };

  clicked = () => {
    window.location.assign(
      DOMAIN +
        "/submissions/" +
        this.props.match.params.contestCode +
        "/" +
        this.props.match.params.problemCode
    );
  };

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
      "https://api.codechef.com/contests/" +
        this.props.match.params.contestCode +
        "/problems/" +
        this.props.match.params.problemCode +
        "?access_token=" +
        this.getAccessToken(),
      requestOptions
    )
      .then((response) => response.json())
      .then((answer) => {
        var names = [];
        var n = answer.result.data.content.languagesSupported.length;
        for (let i = 0; i < n - 1; i++) {
          names.push(answer.result.data.content.languagesSupported[i] + ", ");
        }
        names.push(answer.result.data.content.languagesSupported[n - 1]);
        this.setState({
          html: answer.result.data.content.body,
          Languages: names,
          DateAdded: answer.result.data.content.dateAdded,
          TimeLimit: JSON.stringify(answer.result.data.content.maxTimeLimit),
          SourceLimit: answer.result.data.content.sourceSizeLimit,
          ProblemName: answer.result.data.content.problemName,
        });
      })
      .catch((error) => console.log("error", error));
  }
  render() {
    return (
      <div className="dis">
        <h2 align="center">{this.state.ProblemName}</h2>
        <p align="right">
          <button className="btn btn-primary btn -sm" onClick={this.clicked}>
            All Submissions
          </button>
        </p>

        {ReactHtmlParser(this.state.html)}
        <h6>SourceLimit : {this.state.SourceLimit} bytes</h6>
        <h6> DateAdded : {this.state.DateAdded}</h6>
        <h6> TimeLimit : {this.state.TimeLimit} secs</h6>
        <h6> Languages : {this.state.Languages}</h6>

        <button className="button" onClick={this.handleClick}>
          Submit
        </button>
      </div>
    );
  }
}

export default Display;
