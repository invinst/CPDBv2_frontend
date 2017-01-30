import React, { Component, PropTypes } from 'react';
import { isEmpty, debounce, head, values } from 'lodash';
import Mousetrap from 'mousetrap';

import SearchResults from './search-results';
import SearchBox from './search-box';
import SearchTags from './search-tags';
import SearchNoInput from './search-no-input';
import {
  backButtonStyle, searchContentWrapperStyle, searchBoxStyle,
  resultWrapperStyle
} from './search-content.style.js';


const DEFAULT_SUGGESTION_LIMIT = 9;

export default class SearchContent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.getSuggestion = debounce(props.getSuggestion, 100);
    this.state = {
      value: ''
    };
  }

  componentDidMount() {
    Mousetrap.bind('esc', this.handleGoBack);
  }

  componentWillUnmount() {
    Mousetrap.unbind('esc');
  }

  handleChange({ currentTarget: { value } }) {
    const { contentType } = this.props;
    const limit = contentType ? null : DEFAULT_SUGGESTION_LIMIT;

    this.setState({
      value
    });

    if (value) {
      this.getSuggestion(value, { contentType, limit });
    } else {
      this.props.selectTag(null);
    }
  }

  handleSelect(contentType) {
    if (contentType === this.props.contentType) {
      this.getSuggestion(this.state.value, { limit: DEFAULT_SUGGESTION_LIMIT });
    } else {
      this.getSuggestion(this.state.value, { contentType });
    }
  }

  handleGoBack(e) {
    // Since mousetrap just send here an empty object, we might need this for the test to passed
    !isEmpty(e) && e.preventDefault();
    this.props.router.goBack();
  }

  handleEnter(e) {
    const firstRecord = head(head(values(this.props.suggestionGroups)));
    if (firstRecord) {
      window.location.assign(firstRecord.payload.url);
    }
  }

  renderContent() {
    const {
      suggestionGroups, isRequesting, tags, contentType,
      isEmpty, recentSuggestions, suggestionClick
    } = this.props;

    if (!this.state.value) {
      return (
        <SearchNoInput recentSuggestions={ recentSuggestions }/>
      );
    }

    return (
      <div style={ resultWrapperStyle }>
        <SearchTags tags={ tags } onSelect={ this.handleSelect } selected={ contentType }/>
        <SearchResults
          suggestionClick={ suggestionClick }
          isEmpty={ isEmpty }
          searchText={ this.state.value }
          onLoadMore={ this.handleSelect }
          suggestionGroups={ suggestionGroups }
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
            value={ this.state.value }/>
        </div>
        <div style={ resultWrapperStyle }>
          { this.renderContent() }
        </div>
      </div>
    );
  }
}

SearchContent.propTypes = {
  suggestionGroups: PropTypes.object,
  tags: PropTypes.array,
  recentSuggestions: PropTypes.array,
  isRequesting: PropTypes.bool,
  getSuggestion: PropTypes.func,
  selectTag: PropTypes.func,
  suggestionClick: PropTypes.func,
  contentType: PropTypes.string,
  isEmpty: PropTypes.bool,
  router: PropTypes.object
};

SearchContent.defaultProps = {
  suggestionGroups: {},
  isRequesting: false,
  getSuggestion: () => {},
  router: {
    goBack: () => {}
  }
};

