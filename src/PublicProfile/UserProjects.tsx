import * as React from 'react';
import ProjectForPublicProfile from '../Project/ProjectForPublicProfile';
import { CompleteProject } from '../types/Projects';

class UserProjects extends React.Component<
  { projects: Array<CompleteProject> },
  {}
> {
  renderUserProjects = () => {
    var renderedProjects;
    var projects: any = this.props.projects;
    if (projects === undefined || projects.length === 0) {
      renderedProjects = null;
    } else {
      renderedProjects = projects.map(
        (project: CompleteProject, index: number) => {
          return (
            <ProjectForPublicProfile
              projId={project._id}
              data={project}
              key={'projects_user_' + index}
            />
          );
        }
      );
    }
    return renderedProjects;
  };
  render() {
    return <React.Fragment>{this.renderUserProjects()}</React.Fragment>;
  }
}
export default UserProjects;
