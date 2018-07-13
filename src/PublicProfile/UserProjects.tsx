import * as React from 'react';
import ProjectForPublicProfile from '../Project/ProjectForPublicProfile';

class UserProjects extends React.Component<{ projects: any }, {}> {
  renderUserProjects = () => {
    var renderedProjects;
    var projects: any = this.props.projects;
    if (projects === undefined || projects.length === 0) {
      renderedProjects = null;
    } else {
      renderedProjects = projects.map((project: any, index: number) => {
        return (
          <ProjectForPublicProfile
            key={'projects_Edit_' + index}
            projId={project._id}
            data={project}
          />
        );
      });
    }
    return renderedProjects;
  };
  render() {
    return <React.Fragment>{this.renderUserProjects()}</React.Fragment>;
  }
}
export default UserProjects;
