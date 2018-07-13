import * as React from 'react';

class ProjectLinks extends React.Component<{ userProjects: any }, {}> {
  renderLinks = () => {
    var activeProjects = this.props.userProjects;
    if (activeProjects === undefined) {
      return null;
    }
    var links = activeProjects.map((project: any, index: number) => {
      var linkTo = '/projects/' + project._id;
      return (
        <a className="header-project-portal-link" href={linkTo} key={index}>
          {project.name}
        </a>
      );
    });
    return links;
  };
  render() {
    var links = this.renderLinks();
    return <React.Fragment>{links}</React.Fragment>;
  }
}

export default ProjectLinks;
