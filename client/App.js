import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import {
  IndividualChallenge,
  Nav,
  Footer,
  Home,
  MeetTheTeam,
  ChallengesList,
  Login,
} from './components';

class App extends Component {
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
            to="/challenges/:id"
            exact
            render={({ match }) => <IndividualChallenge id={match.params.id} />}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
