import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Problem from "./problem";
import Ranklist from "./ranklist";
import "./styles.css";
import { DOMAIN } from "../utils/constant";

class Contest extends Component {
  state = {
    color: "#27CDE6",
    problemCode: [],
    an: " "
  };
  clicked = () => {
    console.log("helllooooooo" + this.state.an);
    window.location.replace(DOMAIN + "/rankings/" + this.state.an);
  };
  getCodes() {
    return this.state.problemCode.map(name => (
      <div className="text-left">
        <Link to={"/contest/" + this.state.an + "/problems/" + name}>
          {name}
        </Link>
      </div>
    ));
  }
  getAccessToken() {
    // console.log('this is the local access token' + localStorage.getItem('accessToken'));
    return localStorage.getItem("accessToken");
  }
  componentDidMount() {
    var z;
    const ans = window.location.href;
    var vars = ans.split("/");
    for (var i = 0; i < vars.length; i++) {
      if (decodeURIComponent(vars[i]) === "contest") z = vars[i + 1];
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(
      "https://api.codechef.com/contests/" +
        z +
        "?access_token=" +
        this.getAccessToken(),
      requestOptions
    )
      .then(response => response.json())
      .then(answer => {
        var ans = answer;
        var maps = [];
        var y = ans.result.data.content.problemsList;
        for (var i = 0; i < y.length; i++) {
          maps.push(y[i].problemCode);
        }

        //console.log('hello'+maps);
        this.setState({
          problemCode: maps,
          an: z
        });
      })
      .catch(error => console.log("error", error));
  }
  render() {
    return (
      <div className="primary" style={{ background: this.state.color }}>
        {" "}
        <p align="right">
          {" "}
          <button className="btn btn-primary" onClick={this.clicked}>
            Go To Contest Ranks
          </button>
        </p>
        <h4 className="text-left">Link to Problems </h4>
        {this.getCodes()}
      </div>
    );
  }
}

export default Contest;
