import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import CategoryColumn from './category-column';
import {
  contentWrapperStyle, searchTermTitleStyle, bottomLinkStyle, bottomLinksWrapperStyle,
  minimumStyle, mediumStyle, maximumStyle, searchTermWrapperStyle
} from './search-terms.style.js';
import { ROOT_PATH, SEARCH_TERMS_NAVIGATION_KEYS, SEARCH_PATH } from 'utils/constants';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import { scrollToElement } from 'utils/dom';
import PreviewPane from './preview-pane';


export default class SearchTerms extends Component {

  componentDidMount() {
    const { requestSearchTermCategories, move } = this.props;
    requestSearchTermCategories();
    SEARCH_TERMS_NAVIGATION_KEYS.map((direction) => (LayeredKeyBinding.bind(
      direction,
      (event) => {
        event.preventDefault && event.preventDefault();
        // totalItemCount cannot be declared in the "const" way as it needs updating
        move(direction, this.props.totalItemCount);
      }
    )));
  }

  componentWillReceiveProps(nextProps) {
    // Make sure keyboard-focused item is kept within viewport:
    if (this.props.focusedItem.uniqueKey !== nextProps.focusedItem.uniqueKey) {
      scrollToElement(
        '.term-item.focused',
        { behavior: 'instant', block: 'center' }
      );
    }
  }

  componentWillUnmount() {
    SEARCH_TERMS_NAVIGATION_KEYS.map((direction) => (LayeredKeyBinding.unbind(direction)));
    this.props.resetNavigation(0);
  }

  renderColumns() {
    const { categories, focusedItem } = this.props;

    return (
      map(categories, ({ items, name }) => (
        <CategoryColumn
          key={ name }
          name={ name }
          items={ items }
          focusedItem={ focusedItem }
        />
      ))
    );
  }

  render() {
    const { focusedItem } = this.props;
    return (
      <div>
        <ResponsiveFluidWidthComponent
          style={ contentWrapperStyle }
          minimumStyle={ minimumStyle }
          mediumStyle={ mediumStyle }
          maximumStyle={ maximumStyle }
          minWidthThreshold={ 1020 }
          maxWidthThreshold={ 1760 }
        >
          <div style={ searchTermWrapperStyle }>
            <div style={ searchTermTitleStyle } className='test--search-term-title'>Search terms</div>
            { this.renderColumns() }
            <div style={ bottomLinksWrapperStyle }>
              <Link style={ bottomLinkStyle } to={ ROOT_PATH } className='test--search-term-back-front-page-link'>
                Back to Front Page
              </Link>
              <Link style={ bottomLinkStyle } to={ SEARCH_PATH } className='test--search-term-back-search-page-link'>
                Search
              </Link>
            </div>
          </div>
        </ResponsiveFluidWidthComponent>
        <PreviewPane item={ focusedItem } />
      </div>
    );
  }
}

SearchTerms.propTypes = {
  requestSearchTermCategories: PropTypes.func,
  move: PropTypes.func,
  categories: PropTypes.array,
  focusedItem: PropTypes.object,
  totalItemCount: PropTypes.number,
  resetNavigation: PropTypes.func,
};

SearchTerms.defaultProps = {
  requestSearchTermCategories: () => {},
  move: () => {},
  resetNavigation: () => {},
  focusedItem: {
    uniqueKey: null
  }
};
