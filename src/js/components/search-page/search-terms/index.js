import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import CategoryColumn from './category-column';
import SmoothScroller from 'components/common/smooth-scroller';
import { contentWrapperStyle, searchTermTitleStyle,
  bottomLinkStyle, bottomLinksWrapperStyle } from './search-terms.style.js';
import { SEARCH_PATH } from 'utils/constants';


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
    return (
      <div>
        <div style={ searchTermTitleStyle }>Search terms</div>
        { this.renderColumns() }
        <div style={ bottomLinksWrapperStyle }>
          <Link style={ bottomLinkStyle } to={ SEARCH_PATH }>
            Back to Front Page
          </Link>
          <Link style={ bottomLinkStyle } to={ SEARCH_PATH }>
            Search
          </Link>
        </div>
      </div>
    );
  }
}

SearchTerms.propTypes = {
  requestSearchTermCategories: PropTypes.func,
  selectedCategoryIndex: PropTypes.number,
  categories: PropTypes.array
};

SearchTerms.defaultProps = {
  requestSearchTermCategories: () => {}
};
