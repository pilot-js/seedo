import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

export class IndividualChallenge extends Component {
  constructor() {
    super();
    this.state = {
      codeHTML: '',
      codeCSS: '',
      codeJS: '',
    };
    this.updateCodeHTML = this.updateCodeHTML.bind(this);
    this.updateCodeCSS = this.updateCodeCSS.bind(this);
    this.updateCodeJS = this.updateCodeJS.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  updateCodeHTML(newCode) {
    this.setState({
      codeHTML: newCode,
    });
  }

  updateCodeCSS(newCode) {
    this.setState({
      codeCSS: newCode,
    });
  }

  updateCodeJS(newCode) {
    this.setState({
      codeJS: newCode,
    });
  }

  changeValue() {
    // TODO: axios post call to the backend
    console.log(this.state);
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
        </div>
      </div>
    );
  }
}
