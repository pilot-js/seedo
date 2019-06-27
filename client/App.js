import React, { useEffect, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  IndividualChallenge,
  Nav,
  Footer,
  Home,
  ChallengesList,
  Login,
  Logout,
  UserPage,
  AdminChallenges,
  AdminChallengeEdit,
  AdminUsers,
  AdminUserEdit,
  Community,
  CommunityChallenge,
  Solution,
  UserCompletedChallenges,
  Signup,
} from './components';
import { getGithubUser, getUser } from './store';

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => {
  return {
    getGithubUser: () => dispatch(getGithubUser()),
    getUser: user => dispatch(getUser(user)),
  };
};

const App = ({ getGithubUser, getUser, user }) => {
  useEffect(() => {
    getGithubUser().catch(error => console.log(error));
    if (Object.keys(user).length) {
      getUser(user).catch(error => console.log(error));
    }
  }, []);

  return (
    <div>
      <header id="main-header" className="sticky-top">
        <Nav />
      </header>
      <section id="content" className="container-fluid">
        <Switch>
          <Route exact path="/" component={Home} />
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
            path="/community/challenge/:challengeId"
            render={({ match }) => <CommunityChallenge challengeId={match.params.challengeId} />}
          />
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
          {/* NOTE only allow access if admin */}
          {user.type === 'admin' ? (
            <Fragment>
              <Route
                exact
                path="/admin/userpage/:adminUserId"
                render={({ match }) => <UserPage adminUserId={match.params.adminUserId} />}
              />
              <Route exact path="/admin/challenge" component={AdminChallengeEdit} />
              <Route
                exact
                path="/admin/challenge/:id"
                render={({ match, history }) => (
                  <AdminChallengeEdit challengeId={match.params.id} history={history} />
                )}
              />
              <Route exact path="/admin/challenges" component={AdminChallenges} />
              <Route exact path="/admin/users" component={AdminUsers} />
              <Route exact path="/admin/users/create" component={AdminUserEdit} />
              <Route
                exact
                path="/userpage/usercompletedchallenge"
                component={UserCompletedChallenges}
              />
              <Route
                exact
                path="/admin/users/:id"
                render={({ match, history }) => (
                  <AdminUserEdit userId={match.params.id} history={history} />
                )}
              />
            </Fragment>
          ) : (
            ''
          )}
        </Switch>
      </section>
      <Footer />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
