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
} from './components';
import { getGithubUser } from './store';

const App = props => {
  useEffect(() => {
    props.getGithubUser().catch(error => console.log(error));
  }, []);

  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/team" component={MeetTheTeam} />
        <Route exact path="/challenges" component={ChallengesList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/userpage" component={UserPage} />
        <Route
          exact
          path=":userchallengeId/solution/:id"
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

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => {
  return {
    getGithubUser: () => dispatch(getGithubUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
