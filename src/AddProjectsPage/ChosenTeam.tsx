import * as React from 'react';

class ChosenTeam extends React.Component<{
  team: any;
  handleOptionRemoval: any;
}> {
  renderChosenTeam() {
    let chosenTeam;
    let team = this.props.team;
    if (team.length === 0) {
      chosenTeam = null;
    } else {
      chosenTeam = team.map((teamMemeber: string, index: number) => {
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
              onClick={e =>
                this.props.handleOptionRemoval(
                  e,
                  'team',
                  Object.assign([], this.props.team)
                )
              }
            >
              X
            </button>
          </div>
        );
      });
    }
    return chosenTeam;
  }
  render() {
    var chosenTeam = this.renderChosenTeam();
    return <React.Fragment>{chosenTeam}</React.Fragment>;
  }
}

export default ChosenTeam;
