import * as React from 'react';

class ChosenTeam extends React.Component<{
  team: any;
  removeItemFromSet: any;
}> {
  renderChosenTeam() {
    let team = Array.from(this.props.team);
    if (!team || team.length === 0) {
      return null;
    }
    let chosenTeam = team.map((teamMemeber: string, index: number) => {
      return (
        <div className="tag-container" key={index}>
          <input
            type="button"
            className="new-project-chosen-tag"
            value={teamMemeber}
          />
          <button
            type="button"
            className="remove-tag-btn"
            onClick={e => this.props.removeItemFromSet(e, 'team')}
          >
            X
          </button>
        </div>
      );
    });
    return chosenTeam;
  }
  render() {
    var chosenTeam = this.renderChosenTeam();
    return <div className="array-of-tags">{chosenTeam}</div>;
  }
}

export default ChosenTeam;
