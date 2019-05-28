import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import { connect } from 'react-redux';
import { postUserchallenge } from '../store/userchallenge';

class _IndividualChallenge extends Component {
  constructor() {
    super();
    this.state = {
      html: '',
      css: '',
      js: '',
    };
    this.updateCodeHTML = this.updateCodeHTML.bind(this);
    this.updateCodeCSS = this.updateCodeCSS.bind(this);
    this.updateCodeJS = this.updateCodeJS.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.postValue = this.postValue.bind(this);
  }

  updateCodeHTML(newCode) {
    this.setState({
      html: newCode,
    });
  }

  updateCodeCSS(newCode) {
    this.setState({
      css: newCode,
    });
  }

  updateCodeJS(newCode) {
    this.setState({
      js: newCode,
    });
  }

  changeValue() {
    // TODO: axios post call to the backend
    console.log(this.state);
  }

  postValue() {
    const userAnswer = { ...this.state, submitted: true, challengeId: this.props.id };
    this.props
      .postValue(userAnswer, this.props.id)
      .then(userchallenge => console.log(userchallenge))
      .catch(ex => console.log(ex));
  }

  render() {
    const challenge = { name: 'challenge1', description: 'draw a circle', difficulty: 1 };
    const options = {
      lineNumbers: true,
      mode: 'javascript',
    };
    return (
      <div className="d-flex flex-column align-items-center">
        <h1>{challenge.name}</h1>
        <p>{challenge.description}</p>
        <div>
          <div className="row">
            <div className="col">users page goes here</div>
            <div className="col">our image goes here</div>
          </div>
          <div className="row">
            <div className="col">
              <h2>HTML Editor</h2>
              <CodeMirror
                value={this.state.code}
                onChange={this.updateCodeHTML}
                options={options}
              />
              <button name="codeHTML" type="button" onClick={this.changeValue}>
                save
              </button>
            </div>
            <div className="col">
              <h2>CSS Editor</h2>
              <CodeMirror value={this.state.code} onChange={this.updateCodeCSS} options={options} />
              <button name="codeCSS" type="button" onClick={this.changeValue}>
                save
              </button>
            </div>
            <div className="col">
              <h2>JS Editor</h2>
              <CodeMirror value={this.state.code} onChange={this.updateCodeJS} options={options} />
              <button name="codeJS" type="button" onClick={this.changeValue}>
                save
              </button>
            </div>
          </div>
          <button type="button" onClick={() => this.postValue()}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postValue: (userAnswer, challengeId) => dispatch(postUserchallenge(userAnswer, challengeId)),
});

export const IndividualChallenge = connect(
  null,
  mapDispatchToProps,
)(_IndividualChallenge);
