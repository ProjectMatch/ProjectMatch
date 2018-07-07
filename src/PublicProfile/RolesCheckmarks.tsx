import * as React from 'react';

class RolesCheckmarks extends React.Component<{ roles: any }, {}> {
  renderRoles = () => {
    var userRoles = this.props.roles;
    var roles;
    if (userRoles === undefined) {
      roles = null;
    } else {
      roles = userRoles.map((role: any, index: number) => {
        return (
          <div key={'roles_' + index} className="public-profile-roles">
            <div className="checkmark-roles">
              <div className="checkmark_stem" />
              <div className="checkmark_kick" />
            </div>
            <div className="public-profile-roles-text">{role}</div>
          </div>
        );
      });
    }
    return roles;
  };
  render() {
    return (
      <div className="public-profile-roles-container">{this.renderRoles()}</div>
    );
  }
}

export default RolesCheckmarks;
