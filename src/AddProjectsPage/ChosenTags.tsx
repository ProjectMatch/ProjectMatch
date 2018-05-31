import * as React from 'react';

class ChosenTags extends React.Component<{
  tags: any;
  handleOptionRemoval: any;
}> {
  render() {
    var chosenTags;
    let tags = this.props.tags;
    if (!tags || tags.slice().length === 0) {
      return null;
    }
    // make copy of tags
    tags = tags.slice();

    chosenTags = tags.map((tagName: string, index: number) => {
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
            onClick={e => this.props.handleOptionRemoval(e, 'tags', tags)}
          >
            X
          </button>
        </div>
      );
    });

    return <div className="array-of-tags">{chosenTags}</div>;
  }
}

export default ChosenTags;
