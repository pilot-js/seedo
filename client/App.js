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
  Logout,
  UserPage,
} from './components';
import { getGithubUser } from './store';

class App extends Component {
  componentDidMount() {
    this.props
      .getGithubUser()
      .then(() => console.log('this is the redux user in APP', this.props.user));
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user)) {
      this.props.getGithubUser().then(() => console.log('User updated', this.props.user));
    }
  }

  render() {
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
