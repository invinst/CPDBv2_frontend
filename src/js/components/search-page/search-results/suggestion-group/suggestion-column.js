import React, { Component, PropTypes } from 'react';
import { map, get } from 'lodash';

import {
  suggestionColumnStyle, suggestionItemStyle, suggestionTextStyle, metaTextStyle
} from './suggestion-column.style';


export default class SuggestionColumn extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(contentType, text, url) {
    this.props.suggestionClick(contentType, text, url);
  }

  renderSuggestions() {
    const { contentType, suggestions } = this.props;

    return map(suggestions, (suggestion, key) => {
      const text = get(suggestion, 'payload.result_text', '');
      const url = get(suggestion, 'payload.url', '');

      return (
        <a key={ key }
          href={ url }
          style={ suggestionItemStyle }
          onClick={ this.handleClick.bind(this, contentType, text, url) }>
          <div style={ suggestionTextStyle }>
            { text }
          </div>
          <div style={ metaTextStyle }>
            { get(suggestion, 'payload.result_extra_information', '') }
          </div>
        </a>
      );
    });
  }

  render() {
    return (
      <div style={ suggestionColumnStyle(this.props.index === 0) } className='suggestion-column'>
        {
          this.renderSuggestions()
        }
      </div>
    );
  }
}

SuggestionColumn.propTypes = {
  index: PropTypes.number,
  suggestions: PropTypes.array,
  contentType: PropTypes.string,
  suggestionClick: PropTypes.func
};
