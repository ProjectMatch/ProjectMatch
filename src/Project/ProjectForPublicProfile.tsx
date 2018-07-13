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

class ProjectForPublicProfile extends React.Component<
  ProjectForPublicProfileProps,
  {}
> {
  render() {
    var data = this.props.data;
    var projId = this.props.projId;

    return (
      <div id={projId} className="project-edit-box">
        <div className="project-edit-container">
          <EditImageContainer project={data} projId={projId} />
          <div className="project-edit-info-forPublicProfile">
            <div className="project-name">{data.name}</div>
            <div className="project-description">{data.description}</div>
            <TagCategoryContainer project={data} />
            <RolesContainer project={data} />
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

export default connect(mapStateToProps, {})(ProjectForPublicProfile);
