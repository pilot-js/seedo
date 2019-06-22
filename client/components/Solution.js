import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOneChallenge, fetchUserchallengeById } from '../store';

require('../../node_modules/codemirror/mode/javascript/javascript');
require('../../node_modules/codemirror/mode/xml/xml');
require('../../node_modules/codemirror/mode/css/css');
require('../../node_modules/codemirror/mode/markdown/markdown');

// todo convert to functional component
class _Solution extends Component {
  constructor() {
    super();
    this.state = {
      userchallenge: {},
    };
  }

  componentDidMount() {
    this.props.fetchOneChallenge(this.props.challengeId);
    this.props.fetchUserchallengeById(this.props.userchallengeId);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.props.fetchUserchallengeById(this.props.userchallengeId).then(({ userchallenge }) =>
        this.setState({
          userchallenge,
        }),
      );
    }
  }

  render() {
    const { userchallenge } = this.state;
    const { individualChallenge } = this.props;
    const options1 = {
      lineNumbers: true,
      mode: 'xml',
      theme: 'monokai',
      readOnly: true,
    };
    const options2 = {
      lineNumbers: true,
      mode: 'css',
      theme: 'monokai',
      readOnly: true,
    };
    if (!individualChallenge.solutions) {
      return null;
    }
    if (!Object.keys(userchallenge).length) {
      return null;
    }
    return (
      <div>
        <Link to="/userpage">
          <button type="button" className="btn">
            Back to User Page
          </button>
        </Link>
        <h2>Solution</h2>
        <div className="d-flex justify-content-around row">
          <div className="col">
            {individualChallenge ? (
              <CodeMirror defaultValue={individualChallenge.solutions[0].html} options={options1} />
            ) : null}
          </div>
          <div className="col">
            {individualChallenge ? (
              <CodeMirror defaultValue={individualChallenge.solutions[0].css} options={options2} />
            ) : null}
          </div>
        </div>
        <h2>My Solution</h2>
        <div className="d-flex justify-content-around row">
          <div className="col">
            <CodeMirror defaultValue={userchallenge.html} options={options1} />
          </div>
          <div className="col">
            <CodeMirror defaultValue={userchallenge.css} options={options2} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, individualChallenge, userchallenge }) => ({
  user,
  individualChallenge,
  userchallenge,
});

const mapDispatchToProps = dispatch => ({
  fetchOneChallenge: challengeId => dispatch(fetchOneChallenge(challengeId)),
  fetchUserchallengeById: (userId, challengeId) =>
    dispatch(fetchUserchallengeById(userId, challengeId)),
});

export const Solution = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Solution);
