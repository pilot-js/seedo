import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import MeetTheTeam from './MeetTheTeam';
import Login from './Login';

const App = () => {
  return (
    <Router>
      <Route path="/" component={Nav} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/meetTheTeam" component={MeetTheTeam} />
      <Route exact path="/login" component={Login} />
    </Router>
  );
};

export default App;
