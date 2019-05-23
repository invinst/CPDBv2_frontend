import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { map, isEmpty } from 'lodash';


import CategoryColumn from './category-column';
import {
  bottomLinkStyle,
  bottomLinksWrapperStyle,
  contentWrapperStyle,
  maximumStyle,
  mediumStyle,
  minimumStyle,
  searchTermTitleStyle,
  scrollIntoViewStyle,
  wrapperStyle,
} from './search-terms.style.js';
import { ROOT_PATH, SEARCH_TERMS_NAVIGATION_KEYS } from 'utils/constants';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import ScrollIntoView from 'components/common/scroll-into-view';
import * as IntercomTracking from 'utils/intercom-tracking';
import RecentSuggestion from 'components/search-page/search-results/recent-suggestion';
import PinboardBar from 'components/search-page/pinboard/pinboard-bar';


export default class SearchTerms extends Component {
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

  renderRecentSuggestion() {
    const { recentSuggestions } = this.props;

    if (!isEmpty(recentSuggestions)) {
      return (
        <RecentSuggestion recentSuggestions={ recentSuggestions }/>
      );
    }

    return null;
  }

  render() {
    const { focusedItem } = this.props;
    return (
      <div style={ wrapperStyle }>
        <PinboardBar />
        <ScrollIntoView
          style={ scrollIntoViewStyle }
          focusedClassName={ `term-item-${focusedItem.uniqueKey.replace(' ', '-')}` }
          >
          { this.renderRecentSuggestion() }
          <div>
            <ResponsiveFluidWidthComponent
              style={ contentWrapperStyle }
              minimumStyle={ minimumStyle }
              mediumStyle={ mediumStyle }
              maximumStyle={ maximumStyle }
              minWidthThreshold={ 1020 }
              maxWidthThreshold={ 1760 }
            >
              <div>
                <div style={ searchTermTitleStyle } className='test--search-term-title'>
                  Search Terms
                </div>
                { this.renderColumns() }
                <div style={ bottomLinksWrapperStyle }>
                  <Link style={ bottomLinkStyle } to={ ROOT_PATH } className='test--search-term-back-front-page-link'>
                    Back to Front Page
                  </Link>
                </div>
              </div>
            </ResponsiveFluidWidthComponent>
          </div>
        </ScrollIntoView>
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
  recentSuggestions: PropTypes.array,
};

SearchTerms.defaultProps = {
  move: () => {},
  resetNavigation: () => {},
  focusedItem: {
    uniqueKey: ''
  },
  categories: [],
};
