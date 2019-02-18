import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { debounce, isEmpty } from 'lodash';
import { Promise } from 'es6-promise';
import DocumentMeta from 'react-document-meta';

import SearchBox from './search-box';
import {
  cancelButtonStyle,
  searchBoxStyle,
  searchContentWrapperStyle
} from './search-page.style.js';
import { navigateToSearchItem } from 'utils/navigate-to-search-item';
import * as constants from 'utils/constants';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import SearchMainPanel from './search-main-panel';
import HoverableButton from 'components/common/hoverable-button';
import {
  ROOT_PATH, SEARCH_ALIAS_EDIT_PATH, SEARCH_BOX, MORE_BUTTON, RECENT_CONTENT_TYPE
} from 'utils/constants';
import { showIntercomLauncher } from 'utils/intercom';
import * as IntercomTracking from 'utils/intercom-tracking';


const DEFAULT_SUGGESTION_LIMIT = 9;


export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleViewItem = this.handleViewItem.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.resetNavigation = this.resetNavigation.bind(this);

    this.getSuggestion = debounce(this.props.getSuggestion, 100);
  }

  componentDidMount() {
    const { query, location, params, routes, pushBreadcrumbs } = this.props;
    pushBreadcrumbs({ location, params, routes });

    LayeredKeyBinding.bind('esc', this.handleGoBack);
    LayeredKeyBinding.bind('enter', this.handleViewItem);

    query && this.sendSearchRequest(query);

    IntercomTracking.trackSearchPage();
    showIntercomLauncher(false);
  }

  componentWillReceiveProps(nextProps) {
    const { location, params, routes, pushBreadcrumbs, query, isRequesting, isEmpty } = nextProps;
    pushBreadcrumbs({ location, params, routes });

    const queryChanged = query !== this.props.query;
    const suggestionGroupsEmpty = !this.props.isEmpty && isEmpty;

    if (
      query &&
      !isRequesting &&
      (queryChanged || suggestionGroupsEmpty)
    ) {
      this.sendSearchRequest(query);
    }
  }

  componentWillUnmount() {
    LayeredKeyBinding.unbind('esc');
    LayeredKeyBinding.unbind('enter');
    showIntercomLauncher(true);
  }

  goToItem(item) {
    const { trackRecentSuggestion } = this.props;
    navigateToSearchItem(item, ({ to, url, type, recentText }) => {
      trackRecentSuggestion(type, recentText, url, to);
    });
  }

  handleViewItem() {
    const { focusedItem, firstItem } = this.props;

    // handle the case where user focuses on nothing
    if (typeof focusedItem.type === 'undefined') {
      this.goToItem(firstItem);
    } else if (focusedItem.type === MORE_BUTTON) {
      this.handleSelect(focusedItem.id);
    } else {
      this.goToItem(focusedItem);
    }
  }

  sendSearchRequest(query) {
    const { changeSearchQuery, selectTag } = this.props;

    changeSearchQuery(query);
    selectTag(null);

    if (query) {
      this.getSuggestion(query, { limit: DEFAULT_SUGGESTION_LIMIT }).catch(() => {});
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
    const { contentType, selectTag } = this.props;

    if (newContentType === RECENT_CONTENT_TYPE) {
      return;
    } else if (newContentType === contentType) {
      selectTag(null);
    } else {
      selectTag(newContentType);
    }
    this.resetNavigation();
  }

  render() {
    const aliasEditModeOn = this.props.location.pathname.startsWith(`/edit/${SEARCH_ALIAS_EDIT_PATH}`);
    const {
      query, searchTermsHidden, tags, contentType, recentSuggestions,
      editModeOn, officerCards, requestActivityGrid,
      children, changeSearchQuery, focusedItem, firstItem, trackRecentSuggestion, isRequesting
    } = this.props;

    return (
      <DocumentMeta title='CPDP'>
        <div
          className='search-page'
          style={ searchContentWrapperStyle(aliasEditModeOn) }>
          <div style={ searchBoxStyle(aliasEditModeOn) }>
            <SearchBox
              onEscape={ this.handleGoBack }
              onChange={ this.handleChange }
              firstSuggestionItem={ firstItem }
              value={ query }
              searchTermsHidden={ searchTermsHidden }
              changeSearchQuery={ changeSearchQuery }
              focused={ focusedItem.uniqueKey === SEARCH_BOX }
              resetNavigation={ this.resetNavigation }
              trackRecentSuggestion={ trackRecentSuggestion }
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
                  isRequesting={ isRequesting }
                />
            }
          </div>
        </div>
      </DocumentMeta>
    );
  }
}

SearchPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  focusedItem: PropTypes.object,
  tags: PropTypes.array,
  recentSuggestions: PropTypes.array,
  getSuggestion: PropTypes.func,
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
  isRequesting: PropTypes.bool,
  params: PropTypes.object,
  routes: PropTypes.array,
  pushBreadcrumbs: PropTypes.func,
  resetSearchResultNavigation: PropTypes.func,
  resetSearchTermNavigation: PropTypes.func,
  firstItem: PropTypes.object
};

/* istanbul ignore next */
SearchPage.defaultProps = {
  contentType: null,
  focusedItem: {},
  getSuggestion: () => new Promise(() => {}),
  trackRecentSuggestion: () => {},
  changeSearchQuery: () => {},
  location: {
    pathname: '/'
  },
  searchTermsHidden: true,
  selectTag: (...args) => {},
  pushBreadcrumbs: (...args) => {},
  resetSearchResultNavigation: () => {},
  resetSearchTermNavigation: () => {},
  firstItem: {}
};
