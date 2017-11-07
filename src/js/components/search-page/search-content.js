import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { isEmpty, debounce, head } from 'lodash';
import { browserHistory } from 'react-router';

import SearchResults from './search-results';
import SearchBox from './search-box';
import SearchTags from './search-tags';
import SearchNoInput from './search-no-input';
import {
  backButtonStyle, searchContentWrapperStyle, searchBoxStyle,
  plusPlaceHolderStyle, plusWrapperStyle, plusSignStyle, cancelButtonStyle, buttonsWrapperStyle
} from './search-content.style.js';
import { dataToolSearchUrl } from 'utils/v1-url';
import { scrollToElement } from 'utils/dom';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import {
  NAVIGATION_KEYS,
  SEARCH_ALIAS_EDIT_PATH,
  SEARCH_PATH,
  ROOT_PATH
} from 'utils/constants';

const DEFAULT_SUGGESTION_LIMIT = 9;

export default class SearchContent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleViewItem = this.handleViewItem.bind(this);
    this.getSuggestion = debounce(props.getSuggestion, 100);
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

  handleSelect(contentType) {
    if (contentType === this.props.contentType) {
      this.getSuggestion(this.props.query, { limit: DEFAULT_SUGGESTION_LIMIT });
    } else {
      this.getSuggestion(this.props.query, { contentType });
    }
    this.props.resetNavigation();
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

  handleSelectRecent() {
    // TODO
  }

  renderContent(aliasEditModeOn) {
    const {
      suggestionGroups, isRequesting, tags, contentType, navigation,
      isEmpty, recentSuggestions, trackRecentSuggestion, query, editModeOn,
      officerCards, requestActivityGrid
    } = this.props;

    if (!query) {
      return (
        <div>
          <SearchTags
            onSelect={ this.handleSelectRecent.bind(this) }
            tags={ ['RECENT'] }/>
          <SearchNoInput
            recentSuggestions={ recentSuggestions }
            officerCards={ officerCards }
            requestActivityGrid={ requestActivityGrid }
          />
        </div>
      );
    }

    let cancelButton = null;
    let plusButton = null;
    if (editModeOn) {
      if (aliasEditModeOn) {
        cancelButton = (
          <Link to={ `/edit/${SEARCH_PATH}` } style={ cancelButtonStyle } className='test--cancel-alias-button'>
            Cancel
          </Link>
        );
      } else {
        plusButton = (
          <div style={ plusWrapperStyle }>
            <Link to={ `/edit/${SEARCH_ALIAS_EDIT_PATH}` } style={ plusSignStyle }>[+]</Link>
          </div>
        );
      }
    }

    return (
      <div>

        <div style={ buttonsWrapperStyle }>
          <SearchTags
            tags={ tags }
            onSelect={ this.handleSelect }
            selected={ contentType }
          />
          { cancelButton }
        </div>

        <div style={ plusPlaceHolderStyle }>
          { plusButton }
        </div>

        <SearchResults
          navigation={ navigation }
          suggestionClick={ trackRecentSuggestion }
          isEmpty={ isEmpty }
          searchText={ query }
          onLoadMore={ this.handleSelect }
          suggestionGroups={ suggestionGroups }
          isRequesting={ isRequesting }
          aliasEditModeOn={ aliasEditModeOn }
        />

      </div>
    );
  }

  render() {
    const aliasEditModeOn = (this.props.location.pathname.startsWith(`/edit/${SEARCH_ALIAS_EDIT_PATH}`));
    return (
      <div
        className='search-page'
        style={ searchContentWrapperStyle(aliasEditModeOn) }>
        <div style={ searchBoxStyle(aliasEditModeOn) }>
          <SearchBox
            onEscape={ this.handleGoBack }
            onChange={ this.handleChange }
            onEnter={ this.handleEnter }
            navigate={ this.props.move }
            value={ this.props.query }/>
          <span
            onClick={ this.handleGoBack }
            className='searchbar__button--back'
            style={ backButtonStyle }>
            Cancel
          </span>
        </div>
        <div>
          { this.renderContent(aliasEditModeOn) }
        </div>
      </div>
    );
  }
}

SearchContent.propTypes = {
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
  resetNavigation: PropTypes.func,
  editModeOn: PropTypes.bool,
  officerCards: PropTypes.array,
  requestActivityGrid: PropTypes.func
};

SearchContent.defaultProps = {
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
  }
};
