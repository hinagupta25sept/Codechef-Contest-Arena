import React, { Component } from "react";
import { REDIRECT_URI } from "../utils/constant";
class login extends Component {
  clicked = () => {
    //e.preventDefault();
    window.location.replace(
      "https://api.codechef.com/oauth/authorize?response_type=code&client_id=826e992304e7df9a274d697ba5aef447&state=xyz&redirect_uri=" +
        REDIRECT_URI
    );
  };
  render() {
    return (
      <div>
        <button className="btn btn-primary btn -sm" onClick={this.clicked}>
          Signin
        </button>
      </div>
    );
  }
}

export default login;
