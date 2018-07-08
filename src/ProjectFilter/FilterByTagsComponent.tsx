import * as React from 'react';

class FilterByTagsComponent extends React.Component<{
  tags: any;
  tagFilter: any;
}> {
  renderTags = () => {
    var tagsFromStore = this.props.tags!;
    if (tagsFromStore instanceof Array) {
      var filterByTags = tagsFromStore.map(function(tag: any, index: number) {
        return (
          <div className="checkboxContainer" key={'tags_filter_' + index}>
            <label htmlFor={'tags_filter_id_' + index}>
              {tag.tagName}
              <input
                type="checkbox"
                name="tag"
                id={'tags_filter_id_' + index}
                value={tag.tagName}
                className="filterOptions-tags"
              />
              <span className="checkmark" />
            </label>
          </div>
        );
      });
      return filterByTags;
    } else {
      return null;
    }
  };
  render() {
    return (
      <React.Fragment>
        <input
          className="project-filter-search-input-box"
          type="text"
          placeholder="Search Tags"
          id="tagFilter"
          onKeyUp={this.props.tagFilter}
        />
        {this.renderTags()}
      </React.Fragment>
    );
  }
}
export default FilterByTagsComponent;
