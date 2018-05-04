import * as React from 'react';
import Footer from '../Footer/Footer';
import HeaderContainer from '../Header/HeaderContainer';
import { Store, UserProfileProps, Action } from '../types/Redux';
import { connect, Dispatch } from 'react-redux';
import { getProjects } from '../actions/projectActions';
import '../styles/PublicProfile.css';
import RolesCheckmarks from './RolesCheckmarks';
import SkillLabel from './SkillLabel';
import UserProjects from './UserProjects';
import UserLinks from './UserLinks';
import axios from 'axios';
import config from '../.config';

interface UserProfileState {
  user: any;
}

class PublicProfile extends React.Component<
  UserProfileProps,
  UserProfileState
> {
  constructor(props: UserProfileProps) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios
      .get(
        `${config.host.name}/api/user/${this.props.match.params.username ||
          this.props.user.username}/profile`
      )
      .then(res => {
        var user = res.data.details;
        user.profileImage = res.data.profileImage;
        this.setState(
          {
            user
          },
          () => {
            // FIX ME: needs to be revised, get projects is retrieving projects that do not belong to user.
            // this action is also fired multiple times successively.
            this.props.getProjects(
              { createdAt: -1 },
              {
                $or: [
                  { creator: this.state.user.username },
                  { team: { $in: [this.state.user.username] } }
                ]
              }
            );
          }
        );
      });
  }
  render() {
    return (
      <div>
        <HeaderContainer />
        <div className="public-profile-container">
          <div className="public-profile-user-data">
            <img
              className="public-profile-image"
              src={
                this.state.user.profileImage
                  ? this.state.user.profileImage
                  : require('../assets/blank image.png')
              }
            />
            <div className="public-profile-details">
              <div className="public-profile-details-text details-bold">
                {this.state.user.username}
              </div>
              <div className="public-profile-details-text details-location">
                {this.state.user.location}
              </div>
              <RolesCheckmarks roles={this.state.user.roles} />
              <br />
              <div className="public-profile-details-text">
                {this.state.user.description}
              </div>
            </div>
            <SkillLabel skills={this.state.user.techstack} />
            <UserLinks user={this.state.user} />
          </div>

          <div className="public-profile-projects">
            <div className="public-profile-header">Projects</div>
            <UserProjects
              // FIX ME: the getProjects action should only return projects for this user
              projects={(this.props.projects as any).filter((project: any) => {
                return (
                  project.team.some(
                    (username: string) => username === this.state.user.username
                  ) || project.creator === this.state.user.username
                );
              })}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    user: state.user,
    projects: state.projects
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    getProjects: (options: object, query: object | null) => {
      return dispatch(getProjects(options, query));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PublicProfile);