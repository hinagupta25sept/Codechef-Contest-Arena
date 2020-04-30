import React, { Component } from "react";
import "./styles.scss";
import { DOMAIN, REDIRECT_URI } from "../utils/constant";
class callback extends Component {
  setData(val) {
    localStorage.setItem("accessToken", val.access_token);
    localStorage.setItem("refreshToken", val.refresh_token);
  }
  getAccessToken() {
    return localStorage.getItem("accessToken");
  }
  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }
  componentDidMount() {
    var my_code;
    const query = this.props.location.search;

    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (decodeURIComponent(pair[0]) === "?code") {
        console.log(decodeURIComponent(pair[1]));
        my_code = decodeURIComponent(pair[1]);
      }
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw =
      '{"grant_type": "authorization_code","code":"' +
      my_code +
      '","client_id":"826e992304e7df9a274d697ba5aef447","client_secret":"cfedc4fff1982ed80fb4a5d6d406fa58","redirect_uri":' +
      JSON.stringify(REDIRECT_URI) +
      "}";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.codechef.com/oauth/token", requestOptions)
      .then((response) => response.json())
      .then((res) => res.result.data)
      .then((data) => {
        this.setData(data);
        window.location.assign(DOMAIN + "/contest");
      })
      .catch((error) => console.log("error", error));
  }
  render() {
    return <div></div>;
  }
}

export default callback;
