import React, { Component } from "react";
import Dropdown from "./dropdown";

class CodeEditor extends Component {
  state = {
    vr: [], sourceCode: " ", input: " ", language: " ", link: " "
  };

  clicked = () => {
    var x = document.getElementById("mytextarea").value;
    var y = document.getElementById("mytextarea2").value;

    this.setState({
      sourceCode: JSON.stringify(x),
      input: JSON.stringify(y)
    })

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Content-Type", "application/json");
    //myHeaders.append("Cookie", "PHPSESSID=f2656d79561dc2931c64330c9678f00e");

    var raw = JSON.stringify({ "sourceCode": this.state.sourceCode, "language": this.state.language, "input": this.state.input });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://api.codechef.com/ide/run?access_token=" + this.getAccessToken(), requestOptions)
      .then(response => response.json())
      .then(answer => {
        var ans = answer;
        this.setState({ link: ans.result.data.link });

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        //myHeaders.append("Cookie", "PHPSESSID=f2656d79561dc2931c64330c9678f00e");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch("https://api.codechef.com/ide/status?access_token=" + this.getAccessToken() + "&link=" + this.state.link, requestOptions)
          .then(response => response.json())
          .then(answer => console.log(answer.result.data))
          .catch(error => console.log('error', error));





      })
      .catch(error => console.log('error', error));

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
      language: x
    })

  }
  getAccessToken() {
    return localStorage.getItem("accessToken");
  }
  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Cookie", "PHPSESSID=5039410918aaf1ac8426a4794a4af891");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    //var descript = document.getElementById('texta').textContent;
    fetch("https://api.codechef.com/language?limit=100&access_token=" + this.getAccessToken(), requestOptions)
      .then(response => response.json())
      .then(answer => {
        var ans = answer;
        var names = [];
        for (var i = 0; i < ans.result.data.content.length; i++) {
          names.push(
            ans.result.data.content[i].shortName
          );
        }
        this.setState({
          vr: names
        });
        console.log(this.state.vr);

      })
      .catch(error => console.log('error', error));


  }



  render() {
    return (
      <div>
        <h6>Languages</h6>
        <Dropdown
          callbackFromParent={this.myCallback}
          list={this.state.vr} />
        {<div className="container">
        </div>}
        <h5>Code Editor</h5>
        {this.getCodeField("13", "80")}
        <br />
        <h6>Custom Input</h6>
        <div> {this.getCodeField2("4", "20")}</div>
        <button onClick={this.clicked} style={{ align: "bottom" }}>Run</button>
      </div>
    );
  }
}

export default CodeEditor;
