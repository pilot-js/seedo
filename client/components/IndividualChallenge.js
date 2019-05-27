import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

export class IndividualChallenge extends Component {
  constructor() {
    super();
    this.state = {
      code: '',
      codeHTML: '',
      codeCSS: '',
      codeJS: '',
    };
    this.updateCode = this.updateCode.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  updateCode(newCode) {
    this.setState({
      code: newCode,
    });
  }

  changeValue(ev) {
    // deal with the code:
    this.setState({ [ev.target.name]: this.state.code });
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
              <h4>HTML Editor</h4>
              <CodeMirror
                value={this.state.code}
                onChange={this.updateCode}
                options={options}
              />
              <button name="codeHTML" type="button" onClick={this.changeValue}>
                run
              </button>
            </div>
            <div className="col">
              <h4>CSS Editor</h4>
              <CodeMirror
                value={this.state.code}
                onChange={this.updateCode}
                options={options}
              />
              <button name="codeCSS" type="button" onClick={this.changeValue}>
                run
              </button>
            </div>
            <div className="col">
              <h4>JS Editor</h4>
              <CodeMirror
                value={this.state.code}
                onChange={this.updateCode}
                options={options}
              />
              <button name="codeJS" type="button" onClick={this.changeValue}>
                run
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
