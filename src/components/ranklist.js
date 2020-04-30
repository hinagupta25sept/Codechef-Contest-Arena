import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
class Ranklist extends Component {
  state = {
    entries: []
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
    console.log(this.props.match.params.contestCode);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append(
    //   "Cookie",
    //   "__utmz=100380940.1584957204.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __auc=1805e31a17106cfa500c05a1912; _gcl_au=1.1.1139878441.1584957204; _ga=GA1.2.1306722242.1584957204; _fbp=fb.1.1584957204331.306479557; _hjid=58bc24f2-efe8-4be4-9f17-baaa366c6001; __utma=100380940.1306722242.1584957204.1584957204.1585237853.2; SESS93b6022d778ee317bf48f7dbffe03173=2d8514ff72dda1b7458980e8afd7e9cb; PHPSESSID=0d2bf11ee5394a3b71a4562b43339234"
    // );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(
      "https://api.codechef.com/rankings/" +
      this.props.match.params.contestCode +
      "?access_token=" +
      this.getAccessToken(),
      requestOptions
    )
      .then(response => response.json())
      .then(answer => {
        var ans = answer;
        var rank = [];
        var name = [];
        var score = [];
        var participants = [];
        for (var i = 0; i < ans.result.data.content.length; i++) {
          participants.push({
            rank: ans.result.data.content[i].rank,
            name: ans.result.data.content[i].username,
            score: ans.result.data.content[i].totalScore
          });
        }
        console.log(participants);
        this.setState({ entries: participants });
      })
      .catch(error => console.log("error", error));
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
