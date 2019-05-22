import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';


import CategoryColumn from './category-column';
import {
  bottomLinkStyle,
  bottomLinksWrapperStyle,
  contentWrapperStyle,
  maximumStyle,
  mediumStyle,
  minimumStyle,
  searchTermTitleStyle,
  wrapperStyle,
} from './search-terms.style.js';
import { ROOT_PATH, SEARCH_PATH, SEARCH_TERMS_NAVIGATION_KEYS } from 'utils/constants';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import SearchTermItemPane from 'components/common/preview-pane/search-term-item-pane';
import ScrollIntoView from 'components/common/scroll-into-view';
import * as IntercomTracking from 'utils/intercom-tracking';


export default class SearchTerms extends Component {

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount() {
    const { move } = this.props;
    SEARCH_TERMS_NAVIGATION_KEYS.map((direction) => (LayeredKeyBinding.bind(
      direction,
      (event) => {
        event.preventDefault && event.preventDefault();
        // totalItemCount cannot be declared in the "const" way as it needs updating
        move(direction, this.props.totalItemCount);
      }
    )));
    IntercomTracking.trackSearchTerms();
  }

  componentWillUnmount() {
    SEARCH_TERMS_NAVIGATION_KEYS.map((direction) => (LayeredKeyBinding.unbind(direction)));
    this.props.resetNavigation(0);
  }

  handleItemClick(uniqueKey) {
    const { setNavigation, navigationKeys } = this.props;
    setNavigation({ navigationKeys, uniqueKey });
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
          handleItemClick={ this.handleItemClick }
        />
      ))
    );
  }

  render() {
    const { focusedItem } = this.props;
    return (
      <div>
        <ScrollIntoView
          style={ wrapperStyle }
          focusedClassName={ `term-item-${focusedItem.uniqueKey.replace(' ', '-')}` }
          >
          <ResponsiveFluidWidthComponent
            style={ contentWrapperStyle }
            minimumStyle={ minimumStyle }
            mediumStyle={ mediumStyle }
            maximumStyle={ maximumStyle }
            minWidthThreshold={ 1020 }
            maxWidthThreshold={ 1760 }
          >
            <div>
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
        </ScrollIntoView>
        <SearchTermItemPane { ...focusedItem } />
      </div>
    );
  }
}

SearchTerms.propTypes = {
  move: PropTypes.func,
  categories: PropTypes.array,
  focusedItem: PropTypes.object,
  totalItemCount: PropTypes.number,
  resetNavigation: PropTypes.func,
  setNavigation: PropTypes.func,
  navigationKeys: PropTypes.array,
};

SearchTerms.defaultProps = {
  move: () => {},
  resetNavigation: () => {},
  setNavigation: () => {},
  focusedItem: {
    uniqueKey: ''
  },
  navigationKeys: [],
  categories: [],
};
