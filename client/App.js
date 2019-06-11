import React, { useEffect } from 'react';
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
  Logout,
  UserPage,
  Solution,
  Signup,
} from './components';
import { getGithubUser } from './store';

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => {
  return {
    getGithubUser: () => dispatch(getGithubUser()),
  };
};

const App = ({ getGithubUser }) => {
  useEffect(() => {
    getGithubUser().catch(error => console.log(error));
  }, []);

  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/team" component={MeetTheTeam} />
        <Route exact path="/challenges" component={ChallengesList} />
        <Route
          exact
          path="/challenges/filter/:difficulty/search/:searchTerm"
          component={ChallengesList}
        />
        <Route exact path="/challenges/filter/:difficulty" component={ChallengesList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/userpage" component={UserPage} />
        <Route
          exact
          path="/solutions/:userchallengeId/challenges/:id"
          render={({ match }) => (
            <Solution
              challengeId={match.params.id}
              userchallengeId={match.params.userchallengeId}
            />
          )}
        />
        <Route
          exact
          path="/challenges/:id"
          render={({ match }) => <IndividualChallenge challengeId={match.params.id} />}
        />
      </Switch>
      <Footer />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
