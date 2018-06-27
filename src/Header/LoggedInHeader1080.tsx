import * as React from 'react';
import ProjectLinks from './ProjectLinks';
import { Link } from 'react-router-dom';

class LoggedInHeader1080 extends React.Component<
  {
    userProjects: any;
    user: any;
    logout: any;
  },
  {}
> {
  render() {
    return (
      <div className="logged-in-header-container">
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
          <Link to="/projects/add" className="logged-in-header-createButton">
            CREATE NEW PROJECT
          </Link>
          <div className="logged-in-header-profileImageDiv header-1080">
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
              <div className="headerOptionsDropdown" id="headerOptionsDropdwn">
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

export default LoggedInHeader1080;
