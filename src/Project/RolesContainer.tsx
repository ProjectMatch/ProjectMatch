import * as React from 'react';
import './Project.css';

class RolesContainer extends React.Component<{ project: any }> {
  renderRoles = () => {
    var data = this.props.project;
    var roles;
    if (data.lookingFor && data.lookingFor.length > 1) {
      roles = data.lookingFor[0] + ', ' + data.lookingFor[1];
    } else if (data.lookingFor!.length === 1) {
      roles = data.lookingFor;
    } else {
      roles = 'None';
    }
    return roles;
  };

  render() {
    return (
      <div className="project-roles-needed">
        looking for
        <div className="project-roles">{this.renderRoles()}</div>
      </div>
    );
  }
}

export default RolesContainer;
