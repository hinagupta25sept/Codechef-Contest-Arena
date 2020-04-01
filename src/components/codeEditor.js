import React, { Component } from "react";
import Dropdown from "./Dropdown";
import "./Dropdown.scss";
class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Arial",
      show: false
    };
  }

  handleChange = font => () => {
    this.setState({ value: font, show: false });
  };

  handleToggle = e => {
    e.target.focus();
    this.setState({ show: !this.state.show });
  };

  handleBlur = e => {
    if (
      e.nativeEvent.explicitOriginalTarget &&
      e.nativeEvent.explicitOriginalTarget === e.nativeEvent.originalTarget
    ) {
      return;
    }

    if (this.state.show) {
      let timer = setTimeout(() => {
        this.setState({ show: false });
      }, 200);
    }
  };

  getCodeField(numRows, numCols) {
    return (
      <textarea
        cols={numCols}
        rows={numRows}
        name="cc-field-596-831"
        id="edit-cc-field-596-831"
        data-type="textarea"
        placeholder=""
        required="1"
      ></textarea>
    );
  }
  render() {
    return (
      <div>
        {/* <div className="container">
            <Dropdown
                show={this.state.show}
                value={this.state.value}
                handleToggle={this.handleToggle}
                handleBlur={this.handleBlur}
                handleChange={this.handleChange}
            />
            </div> */}
        <h5>Code Editor</h5>
        {this.getCodeField("13", "80")}
        <br />
        <h6>Custom Input</h6>
        <div>{this.getCodeField("4", "20")}</div>
        <button style={{ align: "bottom" }}>Run</button>
      </div>
    );
  }
}

export default CodeEditor;
