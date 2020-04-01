import React, { Component } from "react";
import PropTypes from "prop-types";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Problem extends Component {
  static propTypes = {
    list: PropTypes.instanceOf(Array)
    //cont:PropTypes.instanceOf(String)
  };

  static defaultProps = {
    list: []
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("ilu" + this.props.list);
  }
  render() {
    return <div></div>;
  }
}

export default Problem;
