import React, { Component } from "react";
import Dropdown from "./dropdown";

class CodeEditor extends Component {
  state = {
    vr: [],
    sourceCode: "",
    input: "",
    language: " ",
    link: " ",
    string: "",
  };

  clicked = () => {
    var x = document.getElementById("mytextarea").value;
    var y = document.getElementById("mytextarea2").value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      sourceCode: x,
      language: this.state.language,
      input: y,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://api.codechef.com/ide/run?access_token=" + this.getAccessToken(),
      requestOptions
    )
      .then((response) => response.json())
      .then((answer) => {
        var ans = answer;
        this.setState({ link: ans.result.data.link });
        if (typeof this.state.link === "undefined")
          alert("please select Language and enter sourceCode");
        else {
          console.log("link" + this.state.link);

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };

          fetch(
            "https://api.codechef.com/ide/status?access_token=" +
              this.getAccessToken() +
              "&link=" +
              this.state.link,
            requestOptions
          )
            .then((response) => response.json())
            .then((answer) => {
              alert(JSON.stringify(answer.result.data));
            })
            .catch((error) => console.log("error", error));
        }
      })
      .catch((error) => console.log("error", error));
  };

  getCodeField(numRows, numCols) {
    return (
      <textarea
        cols={numCols}
        rows={numRows}
        name="cc-field-596-831"
        id="mytextarea"
        data-type="textarea"
        placeholder=""
        required="1"
      ></textarea>
    );
  }

  getCodeField2(numRows, numCols) {
    return (
      <textarea
        cols={numCols}
        rows={numRows}
        name="cc-field-596-831"
        id="mytextarea2"
        data-type="textarea"
        placeholder=""
        required="1"
      ></textarea>
    );
  }

  myCallback = (x) => {
    this.setState({
      language: x,
    });
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
      "https://api.codechef.com/language?limit=100&access_token=" +
        this.getAccessToken(),
      requestOptions
    )
      .then((response) => response.json())
      .then((answer) => {
        var ans = answer;
        var names = [];
        for (var i = 0; i < ans.result.data.content.length; i++) {
          names.push(ans.result.data.content[i].shortName);
        }
        this.setState({
          vr: names,
        });
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    return (
      <div>
        <h6>Languages</h6>
        <Dropdown callbackFromParent={this.myCallback} list={this.state.vr} />
        {<div className="container"></div>}
        <h5>Code Editor</h5>
        {this.getCodeField("13", "80")}
        <br />
        <h6>Custom Input</h6>
        <div> {this.getCodeField2("4", "20")}</div>
        <button onClick={this.clicked} style={{ align: "bottom" }}>
          Run
        </button>
      </div>
    );
  }
}

export default CodeEditor;
