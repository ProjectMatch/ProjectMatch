import * as React from 'react';
import { connect } from 'react-redux';
// styles
import './Project.css';
// types
import { Props } from '../types/Projects.d';
import { Store, ProjectsInheritedProps } from '../types/Redux';
// components
import { ImageContainer } from './ImageContainer';
import TagCategoryContainer from './TagContainer';
import RolesContainer from './RolesContainer';

class Project extends React.Component<Props> {
  render() {
    var data = this.props.project;

    return (
      <div className="project">
        <ImageContainer project={data} projId={this.props.projId} />
        <div className="project-info">
          <div className="project-name">{data.name}</div>
          <div className="project-description">{data.description}</div>
          <TagCategoryContainer project={this.props.project} />
          <RolesContainer project={this.props.project} />
          <a>
            <img
              className="project-save"
              src={require('../assets/Bookmark Icon.png')}
            />
          </a>
        </div>
      </div>
    );
  }
}

class Projects extends React.Component<ProjectsInheritedProps> {
  renderProject = () => {
    var projectComponent;
    var projectArray = this.props.projects;

    if (projectArray === undefined) {
      projectComponent = null;
    } else {
      projectComponent = projectArray.map(function(
        projectData: any,
        index: number
      ) {
        return (
          <Project
            projId={projectData._id}
            key={'projects_' + index}
            project={projectData}
          />
        );
      });
    }
    return <div className="projects-container">{projectComponent}</div>;
  };
  render() {
    return <React.Fragment>{this.renderProject()}</React.Fragment>;
  }
}

const mapStateToProps = (state: Store) => {
  return {
    user: state.user,
    projects: state.projects,
    searchResults: state.searchResults
  };
};

export default connect(mapStateToProps, {})(Projects);
