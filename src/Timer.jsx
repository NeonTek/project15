//Some of this code is AI generated
import { Component } from 'react';
import accurateInterval from 'accurate-interval';

navigator.vibrate = navigator.vibrate || navigator.webkitVibrate ||
  navigator.mozVibrate || navigator.msVibrate;

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25 * 60, // timeLeft in seconds
      isSession: true,
      situation: 'Session',
      isPlaying: false,
      type: 'Start',
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleReduce = this.handleReduce.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  play(audio) {
    audio.play();
  }

  resetAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  updateUI(type) {
    this.setState((prevState) => {
      if (type === "add") {
        return { timeLeft: prevState.timeLeft + 60 };
      }
      if (type === "reduce") {
        return { timeLeft: prevState.timeLeft - 60 };
      }
    });
  }

  handleTimer() {
    let alarm = document.getElementById('beep');

    if (!this.state.isPlaying) {
      this.setState({ isPlaying: true, type: "Stop" });
      this.timer = accurateInterval(() => {
        this.setState((prevState) => {
          if (prevState.timeLeft > 0) {
            return { timeLeft: prevState.timeLeft - 1 };
          } else {
            this.play(alarm);
            if (prevState.isSession) {
              return {
                timeLeft: prevState.breakLength * 60,
                isSession: false,
                situation: 'Break',
              };
            } else {
              return {
                timeLeft: prevState.sessionLength * 60,
                isSession: true,
                situation: 'Session',
              };
            }
          }
        });
      }, 1000);
    } else {
      this.setState({ isPlaying: false, type: "Start" });
      this.timer.clear();
    }
  }

  handleAdd(e) {
    let type = e.target.id;
    let breakLengthValue = this.state.breakLength;
    let sessionLengthValue = this.state.sessionLength;

    if (sessionLengthValue === 60) {
      this.setState(() => ({ sessionLength: 60 }));
    } else if (type === 'session-increment') {
      this.updateUI("add");
      this.setState((prevState) => ({ sessionLength: prevState.sessionLength + 1 }));
    }
    if (breakLengthValue === 60) {
      this.setState(() => ({ breakLength: 60 }));
    } else if (type === 'break-increment') {
      this.setState((prevState) => ({ breakLength: prevState.breakLength + 1 }));
    }
  }

  handleReduce(e) {
    let type = e.target.id;
    let breakLengthValue = this.state.breakLength;
    let sessionLengthValue = this.state.sessionLength;

    if (sessionLengthValue === 1) {
      this.setState(() => ({ sessionLength: 1 }));
    } else if (type === 'session-decrement') {
      this.updateUI("reduce");
      this.setState((prevState) => ({ sessionLength: prevState.sessionLength - 1 }));
    }
    if (breakLengthValue === 1) {
      this.setState(() => ({ breakLength: 1 }));
    } else if (type === 'break-decrement') {
      this.setState((prevState) => ({ breakLength: prevState.breakLength - 1 }));
    }
  }

  handleReset() {
    let alarm = document.getElementById('beep');
    this.resetAudio(alarm);
    if (this.timer) {
      this.timer.clear();
    }
    this.setState(() => ({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25 * 60,
      isSession: true,
      situation: 'Session',
      isPlaying: false,
      type: 'Start',
    }));
  }

  componentWillUnmount() {
    if (this.timer) {
      this.timer.clear();
    }
  }

  formatTimeLeft(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  render() {
    return (
      <>
        <audio id='beep' src='./src/assets/beep.mp3'></audio>
        <div id="setup" className="d-flex flex-row justify-content-center align-items-center">
          <div id="break" className="container d-flex flex-column">
            <h3 id="break-label" className="label white">Break</h3>
            <div className="setup-controls d-flex flex-row justify-content-center">
              <div className="btn">
                <i id="break-increment" onClick={this.handleAdd} className="fa-solid fa-arrow-up white"></i>
              </div>
              <span id="break-length" className="white text">
                {this.state.breakLength}
              </span>
              <div className="btn">
                <i id="break-decrement" onClick={this.handleReduce} className="fa-solid fa-arrow-down white"></i>
              </div>
            </div>
          </div>
          <div id="session" className="container d-flex flex-column">
            <h3 id="session-label" className="label white">Session</h3>
            <div className="setup-controls d-flex flex-row justify-content-center">
              <div className="btn">
                <i id="session-increment" onClick={this.handleAdd} className="fa-solid fa-arrow-up white"></i>
              </div>
              <span id="session-length" className="text white">
                {this.state.sessionLength}
              </span>
              <div className="btn">
                <i id="session-decrement" onClick={this.handleReduce} className="fa-solid fa-arrow-down white"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="timer-label white">
          <h1 id="timer-label">{this.state.situation}</h1>
          <h2 id="time-left">{this.formatTimeLeft(this.state.timeLeft)}</h2>
        </div>
        <div className="controls">
          <button id="start_stop" className="button" onClick={this.handleTimer}>
            {this.state.type}
          </button>
          <button id="reset" className="button" onClick={this.handleReset}>
            Reset
          </button>
        </div>
      </>
    );
  }
}

export default Timer;
