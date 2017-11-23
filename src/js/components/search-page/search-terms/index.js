import React, { PropTypes, Component } from 'react';
import { map } from 'lodash';

import Navigation from './navigation';
import CategoryColumn from './category-column';
import SmoothScroller from 'components/common/smooth-scroller';
import { contentWrapperStyle } from './search-terms.style.js';


export default class SearchTerms extends Component {
  constructor(props) {
    super(props);

    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.getCategoryLeft = this.getCategoryLeft.bind(this);
    this.state = {
      expandedId: null,
      selectedLeft: null
    };
  }

  componentDidMount() {
    this.props.requestSearchTermCategories();
  }

  toggleExpanded(itemId) {
    this.setState({
      expandedId: this.state.expandedId === itemId ? null : itemId
    });
  }

  getCategoryLeft(left) {
    this.setState({ selectedLeft: left });
  }

  renderColumns() {
    const { categories, selectedCategoryIndex } = this.props;
    const { expandedId, selectedLeft } = this.state;

    return (
      <SmoothScroller direction='left' style={ contentWrapperStyle } selectedOffset={ selectedLeft }>
        {
          map(categories, ({ items, name }, index) => (
            <CategoryColumn
              key={ name } name={ name } items={ items }
              selected={ selectedCategoryIndex === index }
              onSelected={ this.getCategoryLeft }
              expandedId={ expandedId } toggleExpanded={ this.toggleExpanded }/>
          ))
        }
      </SmoothScroller>
    );
  }

  render() {
    const { navigationItems, onSelectCategory } = this.props;

    return (
      <div>
        <Navigation items={ navigationItems } onSelectItem={ onSelectCategory }/>
        {
          this.renderColumns()
        }
      </div>
    );
  }
}

SearchTerms.propTypes = {
  requestSearchTermCategories: PropTypes.func,
  navigationItems: PropTypes.array,
  onSelectCategory: PropTypes.func,
  selectedCategoryIndex: PropTypes.number,
  categories: PropTypes.array
};

SearchTerms.defaultProps = {
  requestSearchTermCategories: () => {}
};
