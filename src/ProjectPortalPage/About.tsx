import * as React from 'react';
import Team from './Team';
import * as moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';
class About extends React.PureComponent<
  {
    name: string | undefined;
    dueDate: string | undefined;
    description: string | undefined;
    githubLink: string | undefined;
    liveLink: string | undefined;
    mockupLink: string | undefined;
    lookingFor: Array<string> | undefined;
    projectId: string;
    user: any;
  },
  {}
> {
  sendJoinRequest = (e: any) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/email/', {
        link: this.props.user.websiteLink,
        email: this.props.user.email,
        username: this.props.user.username,
        projectName: this.props.name,
        projectId: this.props.projectId
      })
      .then(res => {
        if (res.status === 200) {
          alert('Request sent successfully!');
        } else {
          alert(
            'There was an issue sending your request, please try again later'
          );
        }
      });
  };
  render() {
    return (
      <React.Fragment>
        <div className="about__heading">
          <h1>{this.props.name}</h1>
          <p>Due {moment(this.props.dueDate).format('ll')}</p>
        </div>
        <div className="about__body">
          <p className="about__description">{this.props.description}</p>
          <div>
            <ul className="about__links">
              <li>
                <a href={this.props.githubLink}>Github Repo</a>
              </li>
              <li>
                <a href={this.props.liveLink}>Published Site</a>
              </li>
              <li>
                <a href={this.props.mockupLink}>Final Mockup</a>
              </li>
              <li className="looking-for">
                looking for{' '}
                {this.props.lookingFor && this.props.lookingFor.length > 0
                  ? this.props.lookingFor[0].toUpperCase()
                  : 'NONE'}
              </li>
              <li>
                <a className="button" href="" onClick={this.sendJoinRequest}>
                  Join Team
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <Team projectId={this.props.projectId} />
        </div>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(About);
