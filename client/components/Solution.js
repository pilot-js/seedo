import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import { connect } from 'react-redux';
import { fetchOneChallenge, fetchUserchallengeById } from '../store';

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
    const options = {
      lineNumbers: true,
      mode: 'javascript',
    };
    if (!individualChallenge.solutions) {
      return null;
    }
    if (!Object.keys(userchallenge).length) {
      return null;
    }
    return (
      <div>
        <h2>Our solution</h2>
        <div className="d-flex justify-content-around row">
          <div className="col">
            {individualChallenge ? (
              <CodeMirror defaultValue={individualChallenge.solutions[0].html} options={options} />
            ) : null}
          </div>
          <div className="col">
            {individualChallenge ? (
              <CodeMirror defaultValue={individualChallenge.solutions[0].css} options={options} />
            ) : null}
          </div>
        </div>
        <h2>Your solution</h2>
        <div className="d-flex justify-content-around row">
          <div className="col">
            <CodeMirror defaultValue={userchallenge.html} options={options} />
          </div>
          <div className="col">
            <CodeMirror defaultValue={userchallenge.css} options={options} />
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
