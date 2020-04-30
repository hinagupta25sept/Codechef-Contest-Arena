import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
class Ranklist extends Component {
  state = {
    entries: [],
  };

  renderTableData() {
    return this.state.entries.map((entry, index) => {
      const { rank, name, score } = entry;
      return (
        <tr key={rank}>
          <td>{rank}</td>
          <td>{name}</td>
          <td>{score}</td>
        </tr>
      );
    });
  }

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
      "https://api.codechef.com/rankings/" +
        this.props.match.params.contestCode +
        "?access_token=" +
        this.getAccessToken(),
      requestOptions
    )
      .then((response) => response.json())
      .then((answer) => {
        var ans = answer;
        var rank = [];
        var name = [];
        var score = [];
        var participants = [];
        for (var i = 0; i < ans.result.data.content.length; i++) {
          participants.push({
            rank: ans.result.data.content[i].rank,
            name: ans.result.data.content[i].username,
            score: ans.result.data.content[i].totalScore,
          });
        }

        this.setState({ entries: participants });
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    return (
      <div>
        <h1 id="title">RankList for {this.props.match.params.contestCode}</h1>
        <table id="entries">
          <tbody>
            <tr>
              <th>Ranks</th>
              <th>Usernames</th>
              <th>Score</th>
            </tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Ranklist;
