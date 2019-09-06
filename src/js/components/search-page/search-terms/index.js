import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { map, isEmpty, noop, get } from 'lodash';
import cx from 'classnames';

import CategoryColumn from './category-column';
import { ROOT_PATH, SEARCH_TERMS_NAVIGATION_KEYS } from 'utils/constants';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component-without-inline-style';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import * as IntercomTracking from 'utils/intercom-tracking';
import RecentSuggestion from 'components/search-page/search-results/recent-suggestion';
import PinboardBar from 'components/search-page/pinboard/pinboard-bar';
import ScrollIntoView from 'components/common/scroll-into-view';
import style from './search-terms.sass';


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
    const { onEmptyPinboardButtonClick, aliasEditModeOn, focusedItem, className } = this.props;
    return (
      <div className={ cx(style.wrapper, className) }>
        <PinboardBar onEmptyPinboardButtonClick={ onEmptyPinboardButtonClick } />
        <div className={ cx('search-term-wrapper', { 'edit-mode-on': aliasEditModeOn } ) }>
          <ScrollIntoView focusedItemClassName={ `term-item-${get(focusedItem, 'uniqueKey', '').replace(' ', '-')}` }>
            { this.renderRecentSuggestion() }
            <ResponsiveFluidWidthComponent
              className='content-wrapper'
              minimumClassName='minimum'
              mediumClassName='medium'
              maximumClassName='maximum'
              minWidthThreshold={ 1020 }
              maxWidthThreshold={ 1760 }
            >
              <div>
                <div className='search-term-title'>
                  Search Terms
                </div>
                { this.renderColumns() }
                <div className='bottom-link-wrapper'>
                  <Link to={ ROOT_PATH } className='search-term-back-front-page-link'>
                    Back to Front Page
                  </Link>
                </div>
              </div>
            </ResponsiveFluidWidthComponent>
          </ScrollIntoView>
        </div>
      </div>
    );
  }
}

SearchTerms.propTypes = {
  aliasEditModeOn: PropTypes.bool,
  move: PropTypes.func,
  categories: PropTypes.array,
  focusedItem: PropTypes.object,
  totalItemCount: PropTypes.number,
  resetNavigation: PropTypes.func,
  recentSuggestions: PropTypes.array,
  onEmptyPinboardButtonClick: PropTypes.func,
};

SearchTerms.defaultProps = {
  aliasEditModeOn: false,
  move: noop,
  resetNavigation: noop,
  focusedItem: {
    uniqueKey: '',
  },
  categories: [],
  onEmptyPinboardButtonClick: noop,
};
