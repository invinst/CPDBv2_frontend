import PropTypes from 'prop-types';
import React, { Component } from 'react';
import browserHistory from 'utils/history';
import { throttle, isEmpty, noop } from 'lodash';
import { Promise } from 'es6-promise';
import cx from 'classnames';

import SearchBox from './search-box';
import { navigateToSearchItem } from 'utils/navigate-to-search-item';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import { redirectToCreatedPinboard } from 'utils/pinboard';
import SearchMainPanel from './search-main-panel';
import HoverableButton from 'components/common/hoverable-button-without-inline-style';
import {
  SEARCH_ALIAS_EDIT_PATH,
  SEARCH_BOX,
  MORE_BUTTON,
  RECENT_CONTENT_TYPE,
} from 'utils/constants';
import { showIntercomLauncher } from 'utils/intercom';
import * as IntercomTracking from 'utils/intercom-tracking';
import 'toast.css';
import styles from './search-page.sass';


const DEFAULT_SUGGESTION_LIMIT = 9;


export default class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.getSuggestion = throttle(this.props.getSuggestion, 500, { 'leading': false });
  }

  componentDidMount() {
    const { query, hide } = this.props;

    if (!hide) {
      LayeredKeyBinding.bind('esc', this.handleGoBack);
      LayeredKeyBinding.bind('enter', this.handleViewItem);
    }

    this.sendSearchQuery(query);

    IntercomTracking.trackSearchPage();
    showIntercomLauncher(hide);
  }

  componentDidUpdate(prevProps) {
    const { query, hide } = this.props;

    if (query !== prevProps.query) {
      this.sendSearchQuery(query);
    }

    if (!prevProps.hide && hide) {
      LayeredKeyBinding.unbind('esc');
      LayeredKeyBinding.unbind('enter');
      showIntercomLauncher(this.props.hide);
    }
    if (prevProps.hide && !hide) {
      LayeredKeyBinding.bind('esc', this.handleGoBack);
      LayeredKeyBinding.bind('enter', this.handleViewItem);
      showIntercomLauncher(this.props.hide);
    }
  }

  componentWillUnmount() {
    if (!this.props.hide) {
      LayeredKeyBinding.unbind('esc');
      LayeredKeyBinding.unbind('enter');
    }
    showIntercomLauncher(true);
  }

  sendSearchQuery(query) {
    if (query) {
      this.getSuggestion(query, { limit: DEFAULT_SUGGESTION_LIMIT });
    }
  }

  goToItem(item) {
    const { saveToRecent } = this.props;
    navigateToSearchItem(item, (item) => {
      saveToRecent({
        type: item.type,
        id: item.id,
        data: item.recentItemData,
      });
    });
  }

  handleViewItem = () => {
    const { focusedItem, firstItem } = this.props;

    // handle the case where user focuses on nothing
    if (typeof focusedItem.type === 'undefined') {
      this.goToItem(firstItem);
    } else if (focusedItem.type === MORE_BUTTON) {
      this.handleSelect(focusedItem.id);
    } else {
      this.goToItem(focusedItem);
    }
  };

  resetNavigation = payload => {
    const { resetSearchResultNavigation, resetSearchTermNavigation, searchTermsHidden } = this.props;
    const resetNavigation = searchTermsHidden ? resetSearchResultNavigation : resetSearchTermNavigation;
    resetNavigation(payload);
  };

  handleChange = ({ currentTarget: { value } }) => {
    const { changeSearchQuery } = this.props;

    changeSearchQuery(value);
  };

  handleGoBack = e => {
    !isEmpty(e) && e.preventDefault();
    const { cancelPathname } = this.props;
    browserHistory.push(cancelPathname);
  };

  handleSelect = newContentType => {
    const { contentType, selectTag } = this.props;

    if (newContentType === RECENT_CONTENT_TYPE) {
      return;
    } else if (newContentType === contentType) {
      selectTag(null);
    } else {
      selectTag(newContentType);
    }
    this.resetNavigation();
  };

  handleEmptyPinboardButtonClick = () => {
    const { createNewEmptyPinboard } = this.props;

    createNewEmptyPinboard().then(redirectToCreatedPinboard);
  };

  render() {
    const aliasEditModeOn = this.props.location.pathname.startsWith(`/edit${SEARCH_ALIAS_EDIT_PATH}`);
    const {
      hide, query, queryPrefix, searchTermsHidden, contentType, tags,
      editModeOn, requestActivityGrid,
      changeSearchQuery, focusedItem, firstItem, saveToRecent, position, animationIn,
    } = this.props;

    const searchText = `${queryPrefix ? `${queryPrefix}:` : ''}${query}`;

    return (
      <div
        className={
          cx(styles.searchPage, position, { 'edit-mode-on': aliasEditModeOn, hide, 'animation-in': animationIn })
        }
      >
        <div className={ cx('search-bar-wrapper', { 'edit-mode-on': aliasEditModeOn }) }>
          <div className={
            cx('search-bar', { 'has-bottom-border': query !== '' })
          }>
            <SearchBox
              onEscape={ this.handleGoBack }
              onChange={ this.handleChange }
              firstSuggestionItem={ firstItem }
              value={ searchText }
              searchTermsHidden={ searchTermsHidden }
              changeSearchQuery={ changeSearchQuery }
              focused={ !hide && focusedItem.uniqueKey === SEARCH_BOX }
              resetNavigation={ this.resetNavigation }
              saveToRecent={ saveToRecent }
              className={ 'search-box' }
              position={ position }
              animationIn={ animationIn }
            />
            <HoverableButton
              className={
                cx('searchbar__button--back', 'cancel-button', { 'search-terms-hidden': searchTermsHidden })
              }
              onClick={ this.handleGoBack }
            >
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
            requestActivityGrid={ requestActivityGrid }
            searchTermsHidden={ searchTermsHidden }
            handleSelect={ this.handleSelect }
            tags={ tags }
            onEmptyPinboardButtonClick={ this.handleEmptyPinboardButtonClick }
          />
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  focusedItem: PropTypes.object,
  getSuggestion: PropTypes.func,
  selectTag: PropTypes.func,
  contentType: PropTypes.string,
  queryPrefix: PropTypes.string,
  router: PropTypes.object,
  query: PropTypes.string,
  changeSearchQuery: PropTypes.func,
  children: PropTypes.node,
  editModeOn: PropTypes.bool,
  requestActivityGrid: PropTypes.func,
  searchTermsHidden: PropTypes.bool,
  resetSearchResultNavigation: PropTypes.func,
  resetSearchTermNavigation: PropTypes.func,
  firstItem: PropTypes.object,
  tags: PropTypes.array,
  isRequesting: PropTypes.bool,
  toast: PropTypes.object,
  createNewEmptyPinboard: PropTypes.func,
  createPinboard: PropTypes.func,
  saveToRecent: PropTypes.func,
  hide: PropTypes.bool,
  position: PropTypes.string,
  animationIn: PropTypes.bool,
  cancelPathname: PropTypes.string,
};

/* istanbul ignore next */
SearchPage.defaultProps = {
  contentType: null,
  focusedItem: {},
  getSuggestion: () => new Promise(noop),
  changeSearchQuery: noop,
  location: {
    pathname: '/',
  },
  searchTermsHidden: true,
  selectTag: () => {},
  resetSearchResultNavigation: noop,
  resetSearchTermNavigation: noop,
  firstItem: {},
  toast: {},
  createNewEmptyPinboard: noop,
  createPinboard: noop,
  saveToRecent: noop,
  cancelPathname: '/',
};
