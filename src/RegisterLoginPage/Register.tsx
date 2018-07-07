import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from '../types/Redux';
// styles
import './Register-Login.css';
// component
import GoogleSignIn from '../GoogleSignIn';
// types
import { RegisterState } from './Register.d';
import { RegisterProps } from '../types/Redux.d';
// actions
import { register } from '../actions/userActions';
import {
  showRegisterWindow,
  completeRegistration
} from '../actions/appActions';
import { getAllUsers } from '../actions/userActions';

class Register extends React.Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      username: '',
      shouldRedirect: false,
      showErrorAllInputRqd: false,
      showErrorPwLength: false,
      showErrorDuplicateUsername: false,
      showErrorDuplicateEmail: false,
      disableSubmitBtn: false
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  handleFormChange(e: React.FormEvent<HTMLInputElement>): void {
    var { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    } as any);
  }

  allInputsAreValid = (e: any) => {
    e.preventDefault();
    const { firstName, lastName, username, email, password } = this.state;
    if (!firstName || !lastName || !username || !email || !password) {
      this.setState({ showErrorAllInputRqd: true });
      return;
    }

    let noDuplicateUsername = this.props.allUsers.every(
      user => user.username !== username
    );
    if (!noDuplicateUsername) {
      this.setState({ showErrorDuplicateUsername: true });
      return;
    }

    let noDuplicateEmail = this.props.allUsers.every(
      user => user.email !== email
    );
    if (!noDuplicateEmail) {
      this.setState({ showErrorDuplicateEmail: true });
      return;
    }

    if (password.length < 6) {
      this.setState({ showErrorPwLength: true });
      return;
    }

    return this.handleSubmit(e);
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    const { firstName, lastName, username, email, password } = this.state;
    this.props
      .register(firstName, lastName, username, email, password)
      .then(() => {
        this.props.completeRegistration();
      });
    this.windowVisibility(e);
  };

  windowVisibility = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    this.props.showRegisterWindow();
  };

  render() {
    return (
      <div>
        <div
          className="popupScreenMask"
          onClick={this.props.showRegisterWindow}
        />
        <div className="registerPopupScreen">
          <form className="register-form">
            <br />
            <div className="logo-login_register">project match</div>
            <button
              className="login-register-exit-window-btn"
              onClick={e => this.windowVisibility(e)}
            >
              X
            </button>
            <br />

            <GoogleSignIn />

            <hr className="horizontalDivider" />

            <label className="form-label">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              required={true}
              className="nameDiv"
              onChange={e => this.handleFormChange(e)}
            />

            <label className="form-label">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              required={true}
              className="nameDiv"
              onChange={e => this.handleFormChange(e)}
            />

            <br />

            <div className="form-error-message">
              {this.state.showErrorDuplicateUsername
                ? '// This username is already being used.'
                : null}
            </div>
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              required={true}
              className="usernameDiv"
              onChange={e => this.handleFormChange(e)}
            />

            <br />

            <div className="form-error-message">
              {this.state.showErrorDuplicateEmail
                ? '// This email address is already being used.'
                : null}
            </div>
            <label className="form-label">Your Email</label>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              required={true}
              className="emailDiv"
              onChange={e => this.handleFormChange(e)}
            />

            <br />

            <div className="form-error-message">
              {this.state.showErrorPwLength
                ? '// Your password must be at least 6 characters.'
                : null}
            </div>
            <label className="form-label">Password</label>
            <input
              id="pasword"
              type="password"
              placeholder="Password"
              name="password"
              required={true}
              className="passwordDiv"
              onChange={e => this.handleFormChange(e)}
              minLength={6}
            />

            <br />

            <button
              onClick={e => this.allInputsAreValid(e)}
              type="submit"
              className="signUpBtn"
              name="registerBtn"
            >
              Sign Up
            </button>
            <div className="form-error-message-all">
              {this.state.showErrorAllInputRqd
                ? 'All inputs are required.'
                : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    visibleRegisterWindow: state.registerLoginWindow.visibleRegisterWindow,
    allUsers: state.allUsers
  };
}

export default connect(mapStateToProps, {
  register,
  showRegisterWindow,
  completeRegistration,
  getAllUsers
})(Register as any);
