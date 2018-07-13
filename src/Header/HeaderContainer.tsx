import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// components
import Header from './Header';
import LoggedInHeader from './LoggedInHeader';
// types
import { HeaderContainerProps } from './HeaderContainer.d';
import { Store } from '../types/Redux';
// actions
import { completeRegistration } from '../actions/appActions';

class HeaderContainer extends React.Component<
  HeaderContainerProps,
  { isUserLoggedIn: boolean }
> {
  constructor(props: HeaderContainerProps) {
    super(props);
    this.state = {
      isUserLoggedIn: false
    };
  }
  componentDidMount() {
    if (this.props.user.email) {
      this.setState({ isUserLoggedIn: true });
    }
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.user !== prevProps.user) {
      this.setState({ isUserLoggedIn: !this.state.isUserLoggedIn });
    }
  }
  render() {
    if (this.props.justRegistered) {
      this.props.completeRegistration();
      return <Redirect to="/user/settings" />;
    }
    return (
      <div>
        {this.state.isUserLoggedIn === true ? <LoggedInHeader /> : <Header />}
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user,
    justRegistered: state.registerLoginWindow.justRegistered
  };
}

export default connect(mapStateToProps, { completeRegistration })(
  HeaderContainer
);
