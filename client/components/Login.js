import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../store';

class LoginClass extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }

  changeHandler(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  saveHandler(ev) {
    ev.preventDefault();
    this.props.getUser(this.state)
      .then(() => console.log('We loggeed in a user.'));
  }

  render() {
    const { email, password } = this.state;
    const { changeHandler, saveHandler } = this;
    return (
      <div>
        <form onSubmit={saveHandler}>
          <label htmlFor="email">Email</label>
          <input className="form-control" name="email" value={email} onChange={changeHandler} />
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            name="password"
            value={password}
            onChange={changeHandler}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getUser: aUser => dispatch(getUser(aUser)),
});

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginClass);
