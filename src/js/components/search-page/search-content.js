import React, { Component, PropTypes } from 'react';
import { isEmpty, debounce, head, values, keys } from 'lodash';
import { browserHistory } from 'react-router';

import SearchResults from './search-results';
import SearchBox from './search-box';
import SearchTags from './search-tags';
import SearchNoInput from './search-no-input';
import {
  backButtonStyle, searchContentWrapperStyle, searchBoxStyle, resultWrapperStyle
} from './search-content.style.js';
import { dataToolSearchUrl } from 'utils/v1-url';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import { NAVIGATION_KEYS } from 'utils/constants';

const DEFAULT_SUGGESTION_LIMIT = 9;

export default class SearchContent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.getSuggestion = debounce(props.getSuggestion, 100);
  }

  componentDidMount() {
    const { move } = this.props;
    LayeredKeyBinding.bind('esc', this.handleGoBack);
    NAVIGATION_KEYS.map((direction) => (LayeredKeyBinding.bind(
      direction,
      () => move(direction, this.props.suggestionColumns)
    )));
  }

  componentWillUnmount() {
    LayeredKeyBinding.unbind('esc');
    NAVIGATION_KEYS.map((direction) => (LayeredKeyBinding.unbind(direction)));
  }

  handleChange({ currentTarget: { value } }) {
    const { contentType, changeSearchQuery } = this.props;
    const limit = contentType ? null : DEFAULT_SUGGESTION_LIMIT;
    changeSearchQuery(value);

    if (value) {
      this.props.getSuggestion(value, { contentType, limit });
    } else {
      this.props.selectTag(null);
    }
  }

  handleSelect(contentType) {
    if (contentType === this.props.contentType) {
      this.getSuggestion(this.props.query, { limit: DEFAULT_SUGGESTION_LIMIT });
    } else {
      this.getSuggestion(this.props.query, { contentType });
    }
  }

  handleGoBack(e) {
    // Since mousetrap just send here an empty object, we might need this for the test to be passed
    !isEmpty(e) && e.preventDefault();
    this.props.router.goBack();
  }

  handleEnter(e) {
    const { suggestionGroups, trackRecentSuggestion, query } = this.props;
    const firstRecord = head(head(values(suggestionGroups)));
    const contentType = head(keys(suggestionGroups));
    let url;
    let to;

    if (firstRecord) {
      const text = firstRecord.payload['result_text'];
      url = firstRecord.payload.url;
      to = firstRecord.payload.to;
      trackRecentSuggestion(contentType, text, url, to);
    } else {
      url = dataToolSearchUrl(query);
    }

    if (to) {
      browserHistory.push(to);
    } else {
      window.location.assign(url);
    }
  }

  renderContent() {
    const {
      suggestionGroups, isRequesting, tags, contentType, navigation,
      isEmpty, recentSuggestions, trackRecentSuggestion, query
    } = this.props;

    if (!query) {
      return (
        <SearchNoInput recentSuggestions={ recentSuggestions }/>
      );
    }

    return (
      <div style={ resultWrapperStyle }>
        <SearchTags tags={ tags } onSelect={ this.handleSelect } selected={ contentType }/>
        <SearchResults
          navigation={ navigation }
          suggestionClick={ trackRecentSuggestion }
          isEmpty={ isEmpty }
          searchText={ query }
          onLoadMore={ this.handleSelect }
          suggestionGroups={ suggestionGroups }
          isShowingSingleContentType={ contentType !== null }
          isRequesting={ isRequesting } />
      </div>
    );
  }

  render() {
    return (
      <div
        className='search-page'
        style={ searchContentWrapperStyle }>
        <div style={ searchBoxStyle }>
          <span
            onClick={ this.handleGoBack }
            className='searchbar__button--back'
            style={ backButtonStyle }/>
          <SearchBox
            onEscape={ this.handleGoBack }
            onChange={ this.handleChange }
            onEnter={ this.handleEnter }
            navigate={ this.props.move }
            value={ this.props.query }/>
        </div>
        <div style={ resultWrapperStyle }>
          { this.renderContent() }
        </div>
      </div>
    );
  }
}

SearchContent.propTypes = {
  move: PropTypes.func,
  suggestionColumns: PropTypes.array,
  navigation: PropTypes.object,
  suggestionGroups: PropTypes.object,
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
  changeSearchQuery: PropTypes.func
};

SearchContent.defaultProps = {
  suggestionGroups: {},
  contentType: null,
  isRequesting: false,
  getSuggestion: () => {},
  trackRecentSuggestion: () => {},
  router: {
    goBack: () => {}
  },
  changeSearchQuery: () => {}
};
