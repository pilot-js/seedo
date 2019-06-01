import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  IndividualChallenge,
  Nav,
  Footer,
  Home,
  MeetTheTeam,
  ChallengesList,
  Login,
} from './components';
import { getGithubUser } from './store';

class App extends Component {
  componentDidMount() {
    this.props.getGithubUser();
  }

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/meetTheTeam" component={MeetTheTeam} />
          <Route exact path="/challengesList" component={ChallengesList} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/challenges/:id"
            render={({ match }) => <IndividualChallenge id={match.params.id} />}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGithubUser: () => dispatch(getGithubUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
