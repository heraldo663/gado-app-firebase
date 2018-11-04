import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from '../../actions/notifyActions'

import Alert from '../layout/Alert'

class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  static propTypes = {
    firebase: PropTypes.object.isRequired
  }

  onSubmit = e => {
    e.preventDefault();

    const { firebase } = this.props;

    const { email, password } = this.state;

    firebase.login({
      email, password
    }).catch(e => this.props.notifyUser('Invalid login credentials', 'error'))

  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });


  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card mt-4">
            <div className="card-body">
              {message ? (<Alert message={message} messageType={messageType}></Alert>) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock"></i>{' '} Login
                </span>
              </h1>

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="text"
                    name="email"
                    required
                    value={this.state.email}
                    className="form-control"
                    onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password"
                    name="password"
                    required
                    value={this.state.password}
                    className="form-control"
                    onChange={this.onChange} />
                </div>
                <input type="submit" value="Entrar" className="btn btn-primary btn-block" />

              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    notify: state.notify
  }), { notifyUser })
)(Login);
