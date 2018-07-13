import * as React from 'react';

class FilterByCategoriesComponent extends React.Component<{
  categories: any;
  categoryFilter: any;
}> {
  renderCategories = () => {
    var categoriesFromStore = this.props.categories!;
    if (categoriesFromStore instanceof Array) {
      var filterByCategories = categoriesFromStore.map(function(
        category: any,
        index: number
      ) {
        return (
          <div className="checkboxContainer" key={'categories_filter_' + index}>
            <label htmlFor={'categories_filter_id_' + index}>
              {category.categoryName}
              <input
                type="checkbox"
                name="category"
                id={'categories_filter_id_' + index}
                value={category.categoryName}
                className="filterOptions-categories"
              />
              <span className="checkmark" />
            </label>
          </div>
        );
      });
      return filterByCategories;
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
          placeholder="Search Categories"
          id="categoryFilter"
          onKeyUp={this.props.categoryFilter}
        />
        {this.renderCategories}
      </React.Fragment>
    );
  }
}

export default FilterByCategoriesComponent;
