import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserClass extends Component {
  render() {
    const { user } = this.props;
    return <div>{user}</div>;
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export const User = connect(mapStateToProps)(UserClass);