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
  AdminChallenges,
  AdminChallengeEdit,
  AdminUsers,
  Community,
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
    // TODO getUser (if type = admin, allow access to admin components)
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
          path="/challenges/search/:searchTerm/filter/:difficulty"
          component={ChallengesList}
        />
        <Route exact path="/challenges/filter/:difficulty" component={ChallengesList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/userpage" component={UserPage} />
        <Route exact path="/community" component={Community} />
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
          render={({ match, history }) => (
            <IndividualChallenge challengeId={match.params.id} history={history} />
          )}
        />
        {/* TODO admin components */}
        {/* TODO if user.type = admin, allow access to routes */}
        <Route exact path="/admin/challenge" component={AdminChallengeEdit} />
        <Route
          // exact
          path="/admin/challenge/:id"
          render={({ match, history }) => (
            <AdminChallengeEdit challengeId={match.params.id} history={history} />
          )}
        />
        <Route exact path="/admin/challenges" component={AdminChallenges} />
        <Route exact path="/admin/users" component={AdminUsers} />
      </Switch>
      <Footer />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
