import * as React from 'react';
import ProjectLinks from './ProjectLinks';
import { Link } from 'react-router-dom';

class LoggedInHeaderSub1080 extends React.Component<
  {
    userProjects: any;
    user: any;
    logout: any;
  },
  {}
> {
  render() {
    return (
      <div className="logged-in-header-container-sub-1080">
        <Link to="/" className="logged-in-header-logo">
          project match
        </Link>
        <div className="dropdown">
          <button className="dropbtn">Choose A Portal &#x25BC;</button>
          <div className="dropdown-content">
            <ProjectLinks userProjects={this.props.userProjects} />
            <Link
              className="header-project-portal-link top-border"
              to="/user/profile"
            >
              {'Public Profile'}
            </Link>
          </div>
        </div>
        <div className="logged-in-header-container-right">
          <div className="logged-in-header-profileImageDiv sub-1080">
            <div className="logged-in-header-profileImageButton">
              <img
                className="profileImage"
                src={
                  this.props.user.profileImage
                    ? this.props.user.profileImage
                    : require('../assets/blank image.png')
                }
              />
              <div className="dropdownMask" />
              <div
                className="headerOptionsDropdown"
                id="headerOptionsDropdwn-sub1080"
              >
                <Link to="/projects/add" className="headerOptionsDropdownText">
                  Create New Project
                </Link>
                <Link className="headerOptionsDropdownText" to="/user/settings">
                  User Settings
                </Link>
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

export default LoggedInHeaderSub1080;
