import * as React from 'react';
import './Project.css';

class TagCategoryContainer extends React.Component<{ project: any }> {
  renderTagsAndCategory = () => {
    var data = this.props.project;
    var tags;
    if (data.tags !== undefined && data.tags.length > 0) {
      tags = data.tags.map((tagName: string, index: number) => {
        return (
          <div key={index} className="projects-tag-links">
            {tagName}
          </div>
        );
      });
    }
    return (
      <div className="project-tags">
        <div className="projects-category-links">
          {data.category ? data.category : null}
        </div>
        {data.tags ? tags : null}
      </div>
    );
  };
  render() {
    return <React.Fragment>{this.renderTagsAndCategory()}</React.Fragment>;
  }
}

export default TagCategoryContainer;
