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
    // Make sure keyboard-focused item is kept within viewport:
    if (this.props.focusedItem.uniqueKey !== nextProps.focusedItem.uniqueKey) {
      scrollToElement(
        `.suggestion-item-${nextProps.focusedItem.uniqueKey}`,
        { block: 'nearest', inline: 'nearest' }
      );
    }
  }

  componentWillUnmount() {
    LayeredKeyBinding.unbind('esc');
    LayeredKeyBinding.unbind('enter');
  }

  handleViewItem() {
    const { to, url, type, id } = this.props.focusedItem;

    if (type === MORE_BUTTON) {
      this.handleSelect(id);
    } else if (to) {
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
      if (contentType) {
        this.props.getSuggestionWithContentType(query, { contentType }).catch(() => {});
      } else {
        this.props.getSuggestion(query, { contentType, limit }).catch(() => {});
      }
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

  handleSelect(newContentType) {
    const { contentType, query, selectTag, resetNavigation } = this.props;

    if (newContentType === RECENT_CONTENT_TYPE) {
      return;
    } else if (newContentType === contentType) {
      selectTag(null);
      this.getSuggestion(query, { limit: 9 });
    } else {
      selectTag(newContentType);
      this.getSuggestionWithContentType(this.props.query, { contentType: newContentType });
    }
    resetNavigation();
  }

  handleSearchBoxEnter(e) {
    const { suggestionGroups, trackRecentSuggestion, query } = this.props;
    let url, to;

    if (suggestionGroups.length === 0) {
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
      window.location.assign(url);
    }
  }

  render() {
    const aliasEditModeOn = this.props.location.pathname.startsWith(`/edit/${SEARCH_ALIAS_EDIT_PATH}`);
    const {
      query, searchTermsHidden, tags, contentType, recentSuggestions,
      editModeOn, officerCards, requestActivityGrid, resetNavigation,
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
            resetNavigation={ resetNavigation }
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
  resetNavigation: PropTypes.func,
  editModeOn: PropTypes.bool,
  officerCards: PropTypes.array,
  requestActivityGrid: PropTypes.func,
  searchTermsHidden: PropTypes.bool,
  params: PropTypes.object,
  routes: PropTypes.array,
  pushBreadcrumbs: PropTypes.func
};

/* istanbul ignore next */
SearchPage.defaultProps = {
  suggestionGroups: [],
  contentType: null,
  focusedItem: {},
  getSuggestion: () => new Promise(() => {}),
  getSuggestionWithContentType: () => new Promise(() => {}),
  trackRecentSuggestion: () => {},
  resetNavigation: () => {},
  router: {
    goBack: () => {}
  },
  changeSearchQuery: () => {},
  location: {
    pathname: '/'
  },
  searchTermsHidden: true,
  selectTag: (...args) => {},
  pushBreadcrumbs: (...args) => {},
};
