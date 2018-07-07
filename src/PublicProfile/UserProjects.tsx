import * as React from 'react';
import ProjectForPublicProfile from '../Project/ProjectForPublicProfile';
import { Projects } from '../types/Projects';

class UserProjects extends React.Component<{ projects: any }, {}> {
  render() {
    var renderedProjects;
    var projects: any = this.props.projects;
    if (projects === undefined || projects.length === 0) {
      renderedProjects = null;
    } else {
      renderedProjects = projects.map((project: Projects, index: number) => {
        return (
          <ProjectForPublicProfile
            projId={project._id}
            data={project}
            key={'projects_user_' + index}
          />
        );
      });
    }
    return <div>{renderedProjects}</div>;
  }
}
export default UserProjects;
