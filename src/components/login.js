import React, { Component } from "react";
import "./style.css";
import { REDIRECT_URI } from "../utils/constant";
class login extends Component {
  clicked = () => {
    window.location.assign(
      "https://api.codechef.com/oauth/authorize?response_type=code&client_id=826e992304e7df9a274d697ba5aef447&state=xyz&redirect_uri=" +
        REDIRECT_URI
    );
  };
  render() {
    return (
      <div className="hero-image">
        <div className="hero-text">
          <h1>Codechef Contest Arena</h1>
          <h5>Sign in to continue</h5>
          <button className="button" onClick={this.clicked}>
            <span>Sign In </span>
          </button>
        </div>
      </div>
    );
  }
}

export default login;
