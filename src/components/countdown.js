import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
class CountDown extends Component {
  static propTypes = {
    startDate: PropTypes.instanceOf(String),
    startTime: PropTypes.instanceOf(String),
    targetDate: PropTypes.instanceOf(String),
    targetTime: PropTypes.instanceOf(String),
  };

  constructor(props) {
    super(props);
  }

  state = {
    remaining: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    isExpired: false,
    displayString: " ",
  };

  timer;
  distance;
  componentDidMount() {
    this.setDate();
    this.counter();
  }

  setDate = () => {
    const { targetDate, targetTime, startDate, startTime } = this.props,
      now = new Date().getTime(),
      countDownDate = new Date(targetDate + " " + targetTime).getTime();

    var comeUpDate = new Date(startDate + " " + startTime).getTime();
    this.distance = now - countDownDate;
    if (this.distance > 0) {
      clearInterval(this.timer);
      this.setState({ isExpired: true });
    } else {
      var dispString = "Contest Starts In";
      if (now - comeUpDate < 0) {
        this.distance = comeUpDate - now;
      } else if (countDownDate - now > 0) {
        dispString = "Contest Ends In";
        this.distance = countDownDate - now;
      }
      this.setState({
        remaining: {
          days: Math.floor(this.distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((this.distance % (1000 * 60)) / 1000),
        },
        isExpired: false,
        displayString: dispString,
      });
    }
  };

  counter = () => {
    this.timer = setInterval(() => {
      this.setDate();
    }, 1000);
  };

  render() {
    const { remaining, isExpired } = this.state,
      { targetDate, targetTime, startDate, startTime } = this.props;

    return (
      <Fragment>
        {!isExpired && targetDate && targetTime ? (
          <div className="counter">
            {Object.entries(remaining).map((el, i) => (
              <div key={i} className="entry">
                <div key={el[1]} className="entry-value">
                  <span className="count top curr flipTop">{el[1] + 1}</span>
                  <span className="count top next">{el[1]}</span>
                  <span className="count bottom next flipBottom">{el[1]}</span>
                  <span className="count bottom curr">{el[1] + 1}</span>
                </div>
                <div className="entry-title">{el[0].toUpperCase()}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="alert-danger">Contest Ended </p>
        )}
      </Fragment>
    );
  }
}
export default CountDown;
