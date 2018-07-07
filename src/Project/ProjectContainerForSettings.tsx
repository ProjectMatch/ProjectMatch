import { Link } from 'react-router-dom';
import * as React from 'react';
import { connect } from 'react-redux';
// styles
import './Project.css';
// components
import TagCategoryContainer from './TagContainer';
import RolesContainer from './RolesContainer';
import { EditImageContainer } from './ImageContainer';
// types
import { Store, ProjectForEditProps } from '../types/Redux';
// actions
import { deleteProject } from '../actions/projectActions';

class ProjectForEdit extends React.Component<ProjectForEditProps> {
  deleteProject(e: React.MouseEvent<HTMLButtonElement>, projId: string): void {
    this.props.deleteProject(projId);
  }

  render() {
    var data = this.props.data;
    var projId = this.props.projId;
    return (
      <div id={projId} className="project-edit-box">
        <div className="project-edit-container">
          <EditImageContainer project={data} projId={projId} />
          <div className="project-edit-info">
            <div className="project-name">{data.name}</div>
            <div className="project-description">{data.description}</div>
            <TagCategoryContainer project={data} />
            <RolesContainer project={data} />
          </div>
          <div>
            <button
              onClick={e => this.deleteProject(e, projId)}
              className="project-delete-btn"
            >
              Delete Project
            </button>
          </div>
          <div />
          <div />
          <div />
          <div>
            <Link
              className="project-edit-btn"
              to={'/projects/update/' + projId}
            >
              Edit Project
            </Link>
          </div>s
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    projects: state.projects
  };
};

export default connect(mapStateToProps, { deleteProject })(ProjectForEdit);
