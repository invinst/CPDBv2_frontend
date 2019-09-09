import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { debounce, isEmpty, noop } from 'lodash';
import { Promise } from 'es6-promise';
import DocumentMeta from 'react-document-meta';
import { toast, cssTransition } from 'react-toastify';
import cx from 'classnames';

import SearchBox from './search-box';
import { navigateToSearchItem } from 'utils/navigate-to-search-item';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import { generatePinboardUrl } from 'utils/pinboard';
import SearchMainPanel from './search-main-panel';
import HoverableButton from 'components/common/hoverable-button-without-inline-style';
import { SEARCH_ALIAS_EDIT_PATH, SEARCH_BOX, MORE_BUTTON, RECENT_CONTENT_TYPE } from 'utils/constants';
import { showIntercomLauncher } from 'utils/intercom';
import * as IntercomTracking from 'utils/intercom-tracking';
import 'toast.css';
import './search-page.sass';
import { scrollToTop } from 'utils/dom';


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
    this.getSuggestionWithContentType = debounce(this.props.getSuggestionWithContentType, 100);
    this.handleEmptyPinboardButtonClick = this.handleEmptyPinboardButtonClick.bind(this);
  }

  componentDidMount() {
    const { query, contentType } = this.props;

    LayeredKeyBinding.bind('esc', this.handleGoBack);
    LayeredKeyBinding.bind('enter', this.handleViewItem);

    this.sendSearchQuery(query, contentType);

    IntercomTracking.trackSearchPage();
    showIntercomLauncher(false);
  }

  componentWillReceiveProps(nextProps) {
    const {
      query, isRequesting, isEmpty, contentType, selectTag,
    } = nextProps;

    const queryChanged = query !== this.props.query;
    const suggestionGroupsEmpty = !this.props.isEmpty && isEmpty;

    if (!isRequesting && (queryChanged || suggestionGroupsEmpty)) {
      this.sendSearchQuery(query, contentType);
    }

    if (!isRequesting && suggestionGroupsEmpty)
      selectTag(null);


    this.handleToastChange(nextProps);
  }

  componentWillUnmount() {
    LayeredKeyBinding.unbind('esc');
    LayeredKeyBinding.unbind('enter');
    showIntercomLauncher(true);
  }

  handleToastChange(nextProps) {
    if (this.props.toast !== nextProps.toast) {
      const { type, actionType } = nextProps.toast;

      this.showToast(`${type} ${actionType}`, actionType);
    }
  }

  showToast(message, className) {
    const TopRightTransition = cssTransition({
      enter: 'toast-enter',
      exit: 'toast-exit',
      duration: 500,
      appendPosition: true,
    });

    toast(message, {
      className: `toast-wrapper ${className}`,
      bodyClassName: 'toast-body',
      transition: TopRightTransition,
    });
  }

  sendSearchQuery(query, contentType) {
    if (query) {
      if (contentType) {
        this.getSuggestionWithContentType(query, { contentType });
      } else {
        this.getSuggestion(query, { limit: DEFAULT_SUGGESTION_LIMIT });
      }
    }
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

  resetNavigation(payload) {
    const { resetSearchResultNavigation, resetSearchTermNavigation, searchTermsHidden } = this.props;
    const resetNavigation = searchTermsHidden ? resetSearchResultNavigation : resetSearchTermNavigation;
    resetNavigation(payload);
  }

  handleChange({ currentTarget: { value } }) {
    const { changeSearchQuery, selectTag } = this.props;

    changeSearchQuery(value);
    selectTag(null);

    if (value) {
      this.getSuggestion(value, { limit: DEFAULT_SUGGESTION_LIMIT });
    }
  }

  handleGoBack(e) {
    // Since mousetrap just send here an empty object, we might need this for the test to be passed
    const { onCancel } = this.props;
    !isEmpty(e) && e.preventDefault();
    // browserHistory.push(ROOT_PATH);
    onCancel();
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

  handleEmptyPinboardButtonClick() {
    const { createPinboard } = this.props;

    createPinboard({ 'officerIds': [], crids: [], 'trrIds': [] }).then(response => {
      const pinboard = response.payload;
      const url = generatePinboardUrl(pinboard);

      if (!isEmpty(url)) {
        browserHistory.push(url);
      }
    });
  }

  render() {
    const aliasEditModeOn = this.props.location.pathname.startsWith(`/edit/${SEARCH_ALIAS_EDIT_PATH}`);
    const {
      query, searchTermsHidden, contentType, tags,
      editModeOn, officerCards, requestActivityGrid,
      changeSearchQuery, focusedItem, firstItem, trackRecentSuggestion, className, onCancel,
    } = this.props;

    return (
      <DocumentMeta title='CPDP'>
        <div
          className={ cx('search-page', className, { 'edit-mode-on': aliasEditModeOn }) }>
          <div className={ cx('search-bar-wrapper', { 'edit-mode-on': aliasEditModeOn }) }>
            <div className={
              cx('search-bar', { 'has-bottom-border': query !== '' })
            }>
              <SearchBox
                onEscape={ onCancel }
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
                className={
                  cx('searchbar__button--back', 'cancel-button', { 'search-terms-hidden': searchTermsHidden })
                }
                onClick={ onCancel }>
                Cancel
              </HoverableButton>
            </div>
          </div>
          <div className='search-main-panel-wrapper'>
            <SearchMainPanel
              contentType={ contentType }
              query={ query }
              editModeOn={ editModeOn }
              aliasEditModeOn={ aliasEditModeOn }
              officerCards={ officerCards }
              requestActivityGrid={ requestActivityGrid }
              searchTermsHidden={ searchTermsHidden }
              handleSelect={ this.handleSelect }
              tags={ tags }
              onEmptyPinboardButtonClick={ this.handleEmptyPinboardButtonClick }
            />
          </div>
        </div>
      </DocumentMeta>
    );
  }
}

SearchPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  focusedItem: PropTypes.object,
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
  resetSearchResultNavigation: PropTypes.func,
  resetSearchTermNavigation: PropTypes.func,
  firstItem: PropTypes.object,
  tags: PropTypes.array,
  isRequesting: PropTypes.bool,
  toast: PropTypes.object,
  createPinboard: PropTypes.func,
  onCancel: PropTypes.func,
};

/* istanbul ignore next */
SearchPage.defaultProps = {
  contentType: null,
  focusedItem: {},
  getSuggestion: () => new Promise(noop),
  getSuggestionWithContentType: () => new Promise(noop),
  trackRecentSuggestion: noop,
  changeSearchQuery: noop,
  location: {
    pathname: '/',
  },
  searchTermsHidden: true,
  selectTag: (...args) => {},
  resetSearchResultNavigation: noop,
  resetSearchTermNavigation: noop,
  firstItem: {},
  toast: {},
  createPinboard: noop,
};
