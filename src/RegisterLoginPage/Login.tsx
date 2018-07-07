import * as React from 'react';
import { connect } from 'react-redux';
// styles
import './Register-Login.css';
// component
import GoogleSignIn from '../GoogleSignIn';
// types
import { LoginState } from './Login.d';
import { LoginProps } from '../types/Redux';
import { Store } from '../types/Redux';
// actions
import { login } from '../actions/userActions';
import { showLoginWindow } from '../actions/appActions';

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showError: false
    };
  }
  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    var { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    } as any);
  };

  handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password).then(() => {
      if (typeof this.props.user === 'string') {
        this.setState({ showError: true });
      } else {
        this.props.showLoginWindow();
      }
    });
  };

  windowVisibility = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    this.props.showLoginWindow();
  };
  render() {
    return (
      <div>
        <div className="popupScreenMask" onClick={this.props.showLoginWindow} />
        <div className="popupScreen">
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

          <form>
            <label className="form-label">Your Email</label>
            <input
              className="emailDiv"
              type="email"
              name="email"
              value={this.state.email}
              onChange={e => this.handleChange(e)}
              placeholder="Email"
            />
            <br />
            <label className="form-label">Password</label>
            <input
              className="passwordDiv"
              type="password"
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
              placeholder="Password"
              autoComplete="on"
              required={true}
              minLength={6}
            />
            <br />
            <input
              type="submit"
              className="loginBtn"
              value="Log In"
              onClick={e => this.handleSubmit(e)}
            />
            <div className="form-error-message-all">
              {this.state.showError ? this.props.user : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state: Store) {
  return {
    visibleLoginWindow: state.registerLoginWindow.visibleLoginWindow,
    user: state.user
  };
}

export default connect(mapStateToProps, { showLoginWindow, login })(
  Login as any
);
