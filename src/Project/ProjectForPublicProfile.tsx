import * as React from 'react';
import { connect } from 'react-redux';
// styles
import './Project.css';
// component
import TagCategoryContainer from './TagContainer';
import RolesContainer from './RolesContainer';
import { EditImageContainer } from './ImageContainer';
// types
import { Store, ProjectForPublicProfileProps } from '../types/Redux';
// actions
import { getProjects } from '../actions/projectActions';

class ProjectForPublicProfile extends React.Component<
  ProjectForPublicProfileProps
> {
  render() {
    var data = this.props.data;

    return (
      <div id={this.props.projId} className="project-edit-box">
        <div className="project-edit-container">
          <EditImageContainer project={data} projId={this.props.projId} />
          <div className="project-edit-info-forPublicProfile">
            <div className="project-name">{data.name}</div>
            <div className="project-description">{data.description}</div>
            <TagCategoryContainer project={this.props.data} />
            <div className="project-roles-needed">
              looking for
              <RolesContainer project={this.props.data} />
            </div>
            <a>
              <img
                className="project-save"
                src={require('../assets/Bookmark Icon.png')}
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    projects: state.projects,
    user: state.user
  };
};

export default connect(mapStateToProps, { getProjects })(
  ProjectForPublicProfile as any
);
