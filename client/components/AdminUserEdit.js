import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import MdSync from 'react-ionicons/lib/MdSync';
import MdClose from 'react-ionicons/lib/MdClose';
import MdUndo from 'react-ionicons/lib/MdUndo';

import { fetchAdminUser } from '../store';

const _AdminUserEdit = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('user');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const isUpdate = props.userId ? true : false;
  const hasAdminUser = Object.keys(props.adminUser).length ? true : false;

  const clearState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setType('');
    setPassword('');
  };

  useEffect(() => {
    document.getElementById('firstName').focus();

    if (props.userId) {
      props.fetchAdminUser(props.userId);
    }
  }, []);

  useEffect(() => {
    if (isUpdate && hasAdminUser) {
      const { firstName, lastName, email, type, password } = props.adminUser;
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setType(type);
      setPassword(password);
    }
  }, [props.adminUser]);

  const cancel = () => {
    props.history.push('/admin/users');
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      type,
      password,
    };

    if (isUpdate) {
      const { id } = props.adminUser;
      axios
        .put(`/api/users/update/${id}`, user)
        .then(() => {
          props.history.push('/admin/users');
        })
        .catch(error => {
          console.log('updating error: ', error);
          setErrors(prevState => {
            return [...prevState, error];
          });
        });
    } else {
      axios
        .post('/api/users', user)
        .then(() => props.history.push('/admin/users'))
        .catch(error => {
          console.log('updating error: ', error);
          setErrors(prevState => {
            return [...prevState, error];
          });
        });
    }
  };

  const actionText = isUpdate ? 'Edit' : 'Create';
  const actionTextBtn = isUpdate ? 'Update' : 'Create';

  return (
    <div>
      <h1>{actionText} User</h1>
      <div className="row">
        <form onSubmit={handleSubmit} className="ml-4">
          <div className="form-group row">
            <label htmlFor="firstName" className="col-sm-5 col-form-label">
              First Name
            </label>
            <div className="col-sm-7">
              <input
                id="firstName"
                className="form-control"
                type="text"
                name="firstName"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lastName" className="col-sm-5 col-form-label">
              Last Name
            </label>
            <div className="col-sm-7">
              <input
                className="form-control"
                type="text"
                name="lastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-5 col-form-label">
              Email
            </label>
            <div className="col-sm-7">
              <input
                className="form-control"
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="type" className="col-sm-5 col-form-label">
              Type
            </label>
            <div className="col-sm-7">
              <select
                className="custom-select"
                name="type"
                value={type}
                onChange={e => setType(e.target.value)}
              >
                <option>user</option>
                <option>admin</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-5 col-form-label">
              Password
            </label>
            <div className="col-sm-7">
              <input
                className="form-control"
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-raised btn-sm mr-3 btn-primary" type="submit">
              <MdSync fontSize="2em" color="#fff" />
              {/* {actionTextBtn} User */}
            </button>
            <button
              type="button"
              className="btn btn-raised btn-sm mr-3 btn-info"
              onClick={clearState}
            >
              <MdUndo fontSize="2em" color="#fff" />
            </button>
            <button
              className="btn btn-raised btn-sm mr-3 btn-warning"
              type="button"
              onClick={cancel}
            >
              <MdClose fontSize="2em" color="#fff" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ adminUser }) => {
  return {
    adminUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAdminUser: userId => dispatch(fetchAdminUser(userId)),
  };
};

export const AdminUserEdit = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_AdminUserEdit);
