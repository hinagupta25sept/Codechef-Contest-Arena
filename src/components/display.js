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
    ProblemName: " "
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
    // console.log('this is the local access token' + localStorage.getItem('accessToken'));
    return localStorage.getItem("accessToken");
  }
  componentDidMount() {
    console.log("helo");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "__utmz=100380940.1584957204.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __auc=1805e31a17106cfa500c05a1912; _gcl_au=1.1.1139878441.1584957204; _ga=GA1.2.1306722242.1584957204; _fbp=fb.1.1584957204331.306479557; _hjid=58bc24f2-efe8-4be4-9f17-baaa366c6001; __utma=100380940.1306722242.1584957204.1584957204.1585237853.2; SESS93b6022d778ee317bf48f7dbffe03173=2d8514ff72dda1b7458980e8afd7e9cb; PHPSESSID=0d2bf11ee5394a3b71a4562b43339234"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
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
      .then(response => response.json())
      .then(answer => {
        var names = [];
        var n = answer.result.data.content.languagesSupported.length;
        for (let i = 0; i < n - 1; i++) {
          names.push(answer.result.data.content.languagesSupported[i] + ', ');
        }
        names.push(answer.result.data.content.languagesSupported[n - 1])
        this.setState({
          html: answer.result.data.content.body,
          Languages: names
          ,
          DateAdded: answer.result.data.content.dateAdded,
          TimeLimit: JSON.stringify(answer.result.data.content.maxTimeLimit),
          SourceLimit: answer.result.data.content.sourceSizeLimit,
          ProblemName: answer.result.data.content.problemName
        })
      }
      )
      .catch(error => console.log("error", error));
  }
  render() {
    return (
      <div className="dis">
        <h2 align="center">{this.state.ProblemName}</h2>
        <p align="right">
          <button className="btn btn-primary btn -sm" onClick={this.clicked}>All Submissions</button>
        </p>

        {ReactHtmlParser(this.state.html)}
        <h6>SourceLimit : {this.state.SourceLimit} bytes</h6>
        <h6> DateAdded : {this.state.DateAdded}</h6>
        <h6> TimeLimit : {this.state.TimeLimit} secs</h6>
        <h6 > Languages : {this.state.Languages}</h6>

        <button className="button" onClick={this.handleClick}>
          Submit
        </button>
      </div>

    );
  }
}

export default Display;
