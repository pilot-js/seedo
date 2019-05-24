import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Challenges, IndividualChallenge, Nav, Footer } from './components';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route to="/" exact component={Challenges} />
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
