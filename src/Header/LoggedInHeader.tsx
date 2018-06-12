import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// components
import LoggedInHeaderSub1080 from './LoggedInHeader_Sub-1080';
import LoggedInHeaderSub725 from './LoggedInHeader_Sub-725';
import LoggedInHeader1080 from './LoggedInHeader1080';
// style
import './LoggedInHeader.css';
// types
import { LoggedInHeaderState } from './LoggedInHeader.d';
import { Store, LoggedInHeaderProps } from '../types/Redux';
// actions
import { logout } from '../actions/userActions';
import { getUserProjects } from '../actions/projectActions';

class LoggedInHeader extends React.Component<
  LoggedInHeaderProps,
  LoggedInHeaderState
> {
  constructor(props: LoggedInHeaderProps) {
    super(props);
    this.state = {
      username: ''
    };
  }

  componentDidMount() {
    this.props.getUserProjects(this.props.user.username);
  }

  logout = () => {
    this.props.logout();
  };

  render() {
    return (
      <div className="logged-in-container-blue">
        <LoggedInHeader1080
          userProjects={this.props.userProjects}
          user={this.props.user}
          logout={this.logout}
        />
        <LoggedInHeaderSub1080
          userProjects={this.props.userProjects}
          user={this.props.user}
          logout={this.logout}
        />
        <LoggedInHeaderSub725
          userProjects={this.props.userProjects}
          user={this.props.user}
          logout={this.logout}
        />
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user,
    projects: state.projects,
    userProjects: state.userProjects
  };
}

export default withRouter(connect(mapStateToProps, { logout, getUserProjects })(
  LoggedInHeader as any
) as any);
