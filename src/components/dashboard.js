import queryString from "querystring";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./styles.scss";
import React, { Component } from "react";
import Autocomplete from "./Autocomplete";
import { DOMAIN } from "../utils/constant";
import { fetcher } from "./funct";
class Dashboard extends Component {
  state = {
    color: "#27CDE6",
    contestLists: [],
    contestMap: {}
  };

  clicked = () => {
    console.log(localStorage.getItem("refreshToken"));
    // alert(localStorage.getItem("refreshToken"));
    // window.location.replace(
    //   DOMAIN
    // );
  };
  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  getAccessToken() {
    // console.log('this is the local access token' + localStorage.getItem('accessToken'));
    return localStorage.getItem("accessToken");
  }
  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    var endpoint = "https://api.codechef.com/contests/?access_token=";
    fetcher(endpoint, requestOptions).then(
      answer => {
        var ans = answer;
        var names = [];
        var maps = {};
        var codes = [];
        for (var i = 0; i < ans.result.data.content.contestList.length; i++) {
          names.push(
            ans.result.data.content.contestList[i].name
          );
          names.push(
            ans.result.data.content.contestList[i].code
          );
          maps[ans.result.data.content.contestList[i].name] =
            ans.result.data.content.contestList[i].code;
        }
        this.setState({
          contestLists: names,
          contestMap: maps
        });
      })
      .catch(error => console.log("error", error));
  }

  render() {
    return (
      <div className="primary" style={{ background: this.state.color }}>
        <p align="center">
          <button className="btn btn-primary btn -sm" onClick={this.clicked}>Log Out</button>
        </p>
        <h3>Search ContestNames or contestCodes</h3>
        <Autocomplete
          suggestions={this.state.contestLists}
          sugg={this.state.contestMap}
        />
      </div>
    );
  }
}
export default Dashboard;
