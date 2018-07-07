import * as React from 'react';

class TagOptionsComponent extends React.Component<{
  formChange: any;
  tags: any;
  tagFilter: any;
}> {
  renderTagOptions = () => {
    let tagOptionsComponent: JSX.Element[];
    let tagsFromStore = this.props.tags!;
    if (tagsFromStore instanceof Array) {
      tagOptionsComponent = tagsFromStore.map(
        (tagObject: any, index: number) => {
          return (
            <input
              key={'tags_' + index}
              type="button"
              name="tags"
              value={tagObject.tagName}
              onClick={this.props.formChange}
              className="new-project-dropdown-text"
            />
          );
        }
      );
      return tagOptionsComponent;
    } else {
      return null;
    }
  };
  render() {
    let tagOptionsComponent = this.renderTagOptions();
    return (
      <div>
        <input
          className="search-input-box"
          type="text"
          placeholder="Search / Add Tags"
          id="tagSearch"
          onKeyUp={this.props.tagFilter}
        />
        {tagOptionsComponent!}
      </div>
    );
  }
}

export default TagOptionsComponent;
