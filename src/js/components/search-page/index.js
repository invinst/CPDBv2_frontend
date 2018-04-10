import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { debounce, head, isEmpty } from 'lodash';
import { Promise } from 'es6-promise';

import SearchBox from './search-box';
import {
  cancelButtonStyle,
  searchBoxStyle,
  searchContentWrapperStyle
} from './search-page.style.js';
import { dataToolSearchUrl } from 'utils/v1-url';
import { scrollToElement } from 'utils/dom';
import * as constants from 'utils/constants';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import SearchMainPanel from './search-main-panel';
import HoverableButton from 'components/common/hoverable-button';
import {
  ROOT_PATH, SEARCH_ALIAS_EDIT_PATH, SEARCH_BOX, MORE_BUTTON, RECENT_CONTENT_TYPE
} from 'utils/constants';


const DEFAULT_SUGGESTION_LIMIT = 9;

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleSearchBoxEnter = this.handleSearchBoxEnter.bind(this);
    this.handleViewItem = this.handleViewItem.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.resetNavigation = this.resetNavigation.bind(this);

    this.getSuggestion = debounce(this.props.getSuggestion, 100);
    this.getSuggestionWithContentType = debounce(this.props.getSuggestionWithContentType, 100);
  }

  componentDidMount() {
    const { query, location, params, routes, pushBreadcrumbs } = this.props;
    pushBreadcrumbs({ location, params, routes });

    LayeredKeyBinding.bind('esc', this.handleGoBack);
    LayeredKeyBinding.bind('enter', this.handleViewItem);
    if (query && query.length >= 2) {
      setTimeout(() => { this.sendSearchRequest(query); }, 500);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location, params, routes, pushBreadcrumbs, query } = nextProps;
    pushBreadcrumbs({ location, params, routes });
    // Make sure keyboard-focused item is kept within viewport:
    if (this.props.focusedItem.uniqueKey !== nextProps.focusedItem.uniqueKey) {
      scrollToElement(
        `.suggestion-item-${nextProps.focusedItem.uniqueKey}`,
        { block: 'center', inline: 'nearest' }
      );
    }
    if (this.props.location.pathname !== location.pathname && query && query.length > 2) {
      setTimeout(() => { this.sendSearchRequest(query); }, 500);  // TODO; need refactor
    }
  }

  componentWillUnmount() {
    LayeredKeyBinding.unbind('esc');
    LayeredKeyBinding.unbind('enter');
  }

  handleViewItem() {
    const { trackRecentSuggestion } = this.props;
    const { to, url, type, id, text } = this.props.focusedItem;

    // handle the case where user focuses on nothing
    if (type === undefined) {
      this.handleSearchBoxEnter();
    } else if (type === MORE_BUTTON) {
      this.handleSelect(id);
    } else {
      trackRecentSuggestion(type, text, url, to);
      if (to) {
        browserHistory.push(to);
      } else {
        /* istanbul ignore next */
        window.location.assign(url);
      }
    }
  }

  sendSearchRequest(query) {
    const { contentType, changeSearchQuery } = this.props;
    const limit = contentType ? null : DEFAULT_SUGGESTION_LIMIT;
    changeSearchQuery(query);

    if (query) {
      if (contentType) {
        this.props.getSuggestionWithContentType(query, { contentType }).catch(() => {
        });
      } else {
        this.props.getSuggestion(query, { contentType, limit }).catch(() => {
        });
      }
    } else {
      this.props.selectTag(null);
    }
  }

  resetNavigation(payload) {
    const { resetSearchResultNavigation, resetSearchTermNavigation, searchTermsHidden } = this.props;
    const resetNavigation = searchTermsHidden ? resetSearchResultNavigation : resetSearchTermNavigation;
    resetNavigation(payload);
  }

  handleChange({ currentTarget: { value } }) {
    if (!this.props.searchTermsHidden) {
      browserHistory.push(`/${constants.SEARCH_PATH}`);
    }
    this.sendSearchRequest(value);
  }

  handleGoBack(e) {
    // Since mousetrap just send here an empty object, we might need this for the test to be passed
    !isEmpty(e) && e.preventDefault();
    browserHistory.push(ROOT_PATH);
  }

  handleSelect(newContentType) {
    const { contentType, query, selectTag } = this.props;

    if (newContentType === RECENT_CONTENT_TYPE) {
      return;
    } else if (newContentType === contentType) {
      selectTag(null);
      this.getSuggestion(query, { limit: 9 });
    } else {
      selectTag(newContentType);
      this.getSuggestionWithContentType(this.props.query, { contentType: newContentType });
    }
    this.resetNavigation();
  }

  handleSearchBoxEnter(e) {
    const { suggestionGroups, trackRecentSuggestion, query } = this.props;
    let url, to;

    if (suggestionGroups.length === 0) {
      /* istanbul ignore next */
      url = dataToolSearchUrl(query);
    } else {
      const firstGroup = head(suggestionGroups);
      const firstRecord = head(firstGroup.items);
      const contentType = firstGroup.header;

      const text = firstRecord.text;
      url = firstRecord.url;
      to = firstRecord.to;
      trackRecentSuggestion(contentType, text, url, to);
    }

    if (to) {
      browserHistory.push(to);
    } else {
      /* istanbul ignore next */
      window.location.assign(url);
    }
  }

  render() {
    const aliasEditModeOn = this.props.location.pathname.startsWith(`/edit/${SEARCH_ALIAS_EDIT_PATH}`);
    const {
      query, searchTermsHidden, tags, contentType, recentSuggestions,
      editModeOn, officerCards, requestActivityGrid,
      children, changeSearchQuery, focusedItem
    } = this.props;
    return (
      <div
        className='search-page'
        style={ searchContentWrapperStyle(aliasEditModeOn) }>
        <div style={ searchBoxStyle(aliasEditModeOn) }>
          <SearchBox
            onEscape={ this.handleGoBack }
            onChange={ this.handleChange }
            onEnter={ this.handleSearchBoxEnter }
            value={ query }
            searchTermsHidden={ searchTermsHidden }
            changeSearchQuery={ changeSearchQuery }
            focused={ focusedItem.uniqueKey === SEARCH_BOX }
            resetNavigation={ this.resetNavigation }
          />
          <HoverableButton
            style={ cancelButtonStyle(searchTermsHidden) }
            onClick={ this.handleGoBack }
            className='searchbar__button--back'>
            Cancel
          </HoverableButton>
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
                handleSelect={ this.handleSelect }
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
  focusedItem: PropTypes.object,
  suggestionGroups: PropTypes.array,
  tags: PropTypes.array,
  recentSuggestions: PropTypes.array,
  getSuggestion: PropTypes.func,
  getSuggestionWithContentType: PropTypes.func,
  selectTag: PropTypes.func,
  trackRecentSuggestion: PropTypes.func,
  contentType: PropTypes.string,
  isEmpty: PropTypes.bool,
  router: PropTypes.object,
  query: PropTypes.string,
  changeSearchQuery: PropTypes.func,
  children: PropTypes.node,
  editModeOn: PropTypes.bool,
  officerCards: PropTypes.array,
  requestActivityGrid: PropTypes.func,
  searchTermsHidden: PropTypes.bool,
  params: PropTypes.object,
  routes: PropTypes.array,
  pushBreadcrumbs: PropTypes.func,
  resetSearchResultNavigation: PropTypes.func,
  resetSearchTermNavigation: PropTypes.func,
};

/* istanbul ignore next */
SearchPage.defaultProps = {
  suggestionGroups: [],
  contentType: null,
  focusedItem: {},
  getSuggestion: () => new Promise(() => {
  }),
  getSuggestionWithContentType: () => new Promise(() => {
  }),
  trackRecentSuggestion: () => {
  },
  router: {
    goBack: () => {
    }
  },
  changeSearchQuery: () => {
  },
  location: {
    pathname: '/'
  },
  searchTermsHidden: true,
  selectTag: (...args) => {
  },
  pushBreadcrumbs: (...args) => {
  },
  resetSearchResultNavigation: () => {
  },
  resetSearchTermNavigation: () => {
  },
};
