import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Problem from "./problem";
import Ranklist from "./ranklist";
import "./styles.scss";
import { DOMAIN } from "../utils/constant";
import CountDown from "./countdown";

class Contest extends Component {
  state = {
    color: "#27CDE6",
    problemCode: [],
    an: " ",
    startdate: "",
    starttime: "",
    enddate: "", endtime: ""
  };
  clicked = () => {
    window.location.assign(DOMAIN + "/rankings/" + this.state.an);
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
        var vr = ans.result.data.content.startDate;
        var s = "";
        var s2 = "";
        var j;
        for (var i = 0; i < vr.length; i++) {
          if (vr[i] != ' ')
            s = s + vr[i];
          else {
            j = i;
            break;
          }
        }
        for (var i = j; i < vr.length; i++) {
          if (vr[i] != ' ')
            s2 = s2 + vr[i];
        }
        var vre = ans.result.data.content.endDate;
        var s3 = "";
        var s4 = "";
        var k;
        for (var i = 0; i < vre.length; i++) {
          if (vre[i] != ' ')
            s3 = s3 + vre[i];
          else {
            k = i;
            break;
          }
        }
        for (var i = k; i < vre.length; i++) {
          if (vre[i] != ' ')
            s4 = s4 + vre[i];
        }
        var y = ans.result.data.content.problemsList;
        for (var i = 0; i < y.length; i++) {
          maps.push(y[i].problemCode);
        }
        this.setState({
          startdate: s,
          starttime: s2,
          enddate: s3,
          endtime: s4,
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

          <button className="button" onClick={this.clicked}>
            <span>Go To Contest Ranks </span>
          </button>
        </p>
        <h4 className="text-left">Link to Problems </h4>
        {this.getCodes()}
        <CountDown
          targetDate={this.state.enddate}
          targetTime={this.state.endtime}
        />
      </div>
    );
  }
}

export default Contest;
