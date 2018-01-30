import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import CategoryColumn from './category-column';
import {
  contentWrapperStyle, searchTermTitleStyle, bottomLinkStyle, bottomLinksWrapperStyle,
  minimumStyle, mediumStyle, maximumStyle
} from './search-terms.style.js';
import { SEARCH_PATH } from 'utils/constants';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';


export default class SearchTerms extends Component {
  constructor(props) {
    super(props);

    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.state = {
      expandedId: null,
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

  renderColumns() {
    const { categories, selectedCategoryIndex } = this.props;
    const { expandedId } = this.state;

    return (
      <ResponsiveFluidWidthComponent
        style={ contentWrapperStyle }
        minimumStyle={ minimumStyle }
        mediumStyle={ mediumStyle }
        maximumStyle={ maximumStyle }
        minWidthThreshold={ 700 }
        maxWidthThreshold={ 1440 }
      >
        {
          map(categories, ({ items, name }, index) => (
            <CategoryColumn
              key={ name } name={ name } items={ items }
              selected={ selectedCategoryIndex === index }
              expandedId={ expandedId } toggleExpanded={ this.toggleExpanded }/>
          ))
        }
      </ResponsiveFluidWidthComponent>
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
