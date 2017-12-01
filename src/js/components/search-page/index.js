import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { head, isEmpty } from 'lodash';

import SearchBox from './search-box';
import {
  backButtonStyle,
  searchBoxStyle,
  searchContentWrapperStyle
} from './search-page.style.js';
import { dataToolSearchUrl } from 'utils/v1-url';
import { scrollToElement } from 'utils/dom';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import SearchMainPanel from './search-main-panel';
import { NAVIGATION_KEYS, ROOT_PATH, SEARCH_ALIAS_EDIT_PATH } from 'utils/constants';

const DEFAULT_SUGGESTION_LIMIT = 9;

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleViewItem = this.handleViewItem.bind(this);
  }

  componentDidMount() {
    const { move, query } = this.props;
    LayeredKeyBinding.bind('esc', this.handleGoBack);
    NAVIGATION_KEYS.map((direction) => (LayeredKeyBinding.bind(
      direction,
      () => move(direction, this.props.suggestionColumns)
    )));
    LayeredKeyBinding.bind('enter', this.handleViewItem);

    if (query && query.length >= 2) {
      setTimeout(() => { this.sendSearchRequest(query); }, 500);
    }
  }

  componentWillReceiveProps(nextProps) {
    // Make sure keyboard-focused item is kept within viewport:
    const oldPosition = this.props.navigation;
    const newPosition = nextProps.navigation;
    if (oldPosition !== newPosition) {
      scrollToElement(`#suggestion-item-${newPosition.columnIndex}-${newPosition.itemIndex}`);
    }
  }

  componentWillUnmount() {
    LayeredKeyBinding.unbind('esc');
    NAVIGATION_KEYS.map((direction) => (LayeredKeyBinding.unbind(direction)));
    LayeredKeyBinding.unbind('enter');
  }

  handleViewItem() {
    const { to, url } = this.props.focusedSuggestion.payload;
    if (to) {
      browserHistory.push(to);
    } else {
      window.location.assign(url);
    }
  }

  sendSearchRequest(query) {
    const { contentType, changeSearchQuery } = this.props;
    const limit = contentType ? null : DEFAULT_SUGGESTION_LIMIT;
    changeSearchQuery(query);

    if (query) {
      this.props.getSuggestion(query, { contentType, limit });
    } else {
      this.props.selectTag(null);
    }
  }

  handleChange({ currentTarget: { value } }) {
    this.sendSearchRequest(value);
  }

  handleGoBack(e) {
    // Since mousetrap just send here an empty object, we might need this for the test to be passed
    !isEmpty(e) && e.preventDefault();
    browserHistory.push(ROOT_PATH);
  }

  handleEnter(e) {
    const { suggestionGroups, trackRecentSuggestion, query } = this.props;

    let url, to;

    if (suggestionGroups.length === 0) {
      url = dataToolSearchUrl(query);

    } else {
      const firstGroup = head(suggestionGroups);
      const firstRecord = head(head(firstGroup.columns));
      const contentType = firstGroup.header;

      const text = firstRecord.payload['result_text'];
      url = firstRecord.payload.url;
      to = firstRecord.payload.to;
      trackRecentSuggestion(contentType, text, url, to);
    }

    if (to) {
      browserHistory.push(to);
    } else {
      window.location.assign(url);
    }
  }

  render() {
    const aliasEditModeOn = this.props.location.pathname.startsWith(`/edit/${SEARCH_ALIAS_EDIT_PATH}`);
    const {
      query, searchTermsHidden, tags, contentType, recentSuggestions,
      editModeOn, officerCards, requestActivityGrid, resetNavigation, getSuggestion, children
    } = this.props;

    return (
      <div
        className='search-page'
        style={ searchContentWrapperStyle(aliasEditModeOn) }>
        <div style={ searchBoxStyle(aliasEditModeOn) }>
          <SearchBox
            onEscape={ this.handleGoBack }
            onChange={ this.handleChange }
            onEnter={ this.handleEnter }
            value={ query }
            searchTermsHidden={ searchTermsHidden }/>
          <span
            onClick={ this.handleGoBack }
            className='searchbar__button--back'
            style={ backButtonStyle }>
            Cancel
          </span>
        </div>
        <div>
          {
            children ?
              children :
              <SearchMainPanel
                tags={ tags }
                contentType={ contentType }
                recentSuggestions={ recentSuggestions }
                query={ query }
                editModeOn={ editModeOn }
                aliasEditModeOn={ aliasEditModeOn }
                officerCards={ officerCards }
                requestActivityGrid={ requestActivityGrid }
                searchTermsHidden={ searchTermsHidden }
                resetNavigation={ resetNavigation }
                getSuggestion={ getSuggestion }
              />
          }
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  move: PropTypes.func,
  suggestionColumns: PropTypes.array,
  navigation: PropTypes.object,
  focusedSuggestion: PropTypes.object,
  suggestionGroups: PropTypes.array,
  tags: PropTypes.array,
  recentSuggestions: PropTypes.array,
  isRequesting: PropTypes.bool,
  getSuggestion: PropTypes.func,
  selectTag: PropTypes.func,
  trackRecentSuggestion: PropTypes.func,
  contentType: PropTypes.string,
  isEmpty: PropTypes.bool,
  router: PropTypes.object,
  query: PropTypes.string,
  changeSearchQuery: PropTypes.func,
  children: PropTypes.node,
  resetNavigation: PropTypes.func,
  editModeOn: PropTypes.bool,
  officerCards: PropTypes.array,
  requestActivityGrid: PropTypes.func,
  searchTermsHidden: PropTypes.bool
};

SearchPage.defaultProps = {
  suggestionGroups: [],
  contentType: null,
  isRequesting: false,
  getSuggestion: () => {},
  trackRecentSuggestion: () => {},
  resetNavigation: () => {},
  router: {
    goBack: () => {}
  },
  changeSearchQuery: () => {},
  location: {
    pathname: '/'
  },
  searchTermsHidden: true
};
