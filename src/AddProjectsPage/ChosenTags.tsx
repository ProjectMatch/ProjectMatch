import * as React from 'react';

class ChosenTags extends React.Component<{
  tags: any;
  removeItemFromSet: any;
}> {
  renderChosenTags() {
    let tags = Array.from(this.props.tags);
    if (!tags || tags.length === 0) {
      return null;
    }
    var chosenTags = tags.map((tagName: string, index: number) => {
      return (
        <div className="tag-container" key={index}>
          <input
            type="button"
            className="new-project-chosen-tag"
            value={tagName}
          />
          <button
            type="button"
            className="remove-tag-btn"
            onClick={e => this.props.removeItemFromSet(e, 'tags')}
          >
            X
          </button>
        </div>
      );
    });
    return chosenTags;
  }

  render() {
    var chosenTags = this.renderChosenTags();
    return <div className="array-of-tags">{chosenTags}</div>;
  }
}

export default ChosenTags;
