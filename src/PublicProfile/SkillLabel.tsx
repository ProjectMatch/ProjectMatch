import * as React from 'react';

class SkillLabel extends React.Component<{ skills: any }, {}> {
  renderSkills = () => {
    var skills = this.props.skills;
    var renderedSkills;
    if (skills === undefined || skills.length === 0) {
      renderedSkills = null;
    } else {
      renderedSkills = skills.map((skill: string, index: number) => {
        return (
          <div className="public-profile-skill" key={'skill_' + index}>
            {skill}
          </div>
        );
      });
    }
    return renderedSkills;
  };
  render() {
    return (
      <div className="public-profile-skill-container">
        <div className="public-profile-header">Skills</div>
        {this.renderSkills()}
      </div>
    );
  }
}

export default SkillLabel;
