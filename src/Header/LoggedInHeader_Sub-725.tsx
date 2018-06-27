import * as React from 'react';
import ProjectLinks from './ProjectLinks';
import { Link } from 'react-router-dom';

class LoggedInHeaderSub725 extends React.Component<
  {
    userProjects: any;
    user: any;
    logout: any;
  },
  {}
> {
  render() {
    return (
      <div className="logged-in-header-container-sub-725">
        <Link to="/" className="logged-in-header-logo">
          project match
        </Link>
        <div className="logged-in-header-container-right">
          <div className="logged-in-header-profileImageDiv sub-725">
            <div className="logged-in-header-profileImageButton">
              <img
                className="profileImage"
                src={
                  this.props.user.profileImage
                    ? this.props.user.profileImage
                    : require('../assets/blank image.png')
                }
              />
              <div
                className="headerOptionsDropdown"
                id="headerOptionsDropdwn-sub725"
              >
                <Link to="/projects/add" className="headerOptionsDropdownText">
                  Create New Project
                </Link>
                <Link className="headerOptionsDropdownText" to="/user/settings">
                  User Settings
                </Link>
                <Link className="headerOptionsDropdownText" to="/user/profile">
                  {'Public Profile'}
                </Link>
                <div className="dropdown-content">
                  <div className="dropdown-content-title">Project Portals</div>
                  <ProjectLinks userProjects={this.props.userProjects} />
                </div>
                <div
                  className="headerOptionsDropdownText lineAbove"
                  onClick={this.props.logout}
                >
                  Log Out
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoggedInHeaderSub725;
