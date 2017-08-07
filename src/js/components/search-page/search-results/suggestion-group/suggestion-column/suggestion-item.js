import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import classnames from 'classnames';
import { Link } from 'react-router';

import Hoverable from 'components/common/higher-order/hoverable';
import SuggestionItemTextContainer from 'containers/search-page/suggestion-item-text-container';
import SuggestionEnterBadge from './suggestion-item-enter-badge';
import {
  suggestionItemStyle
} from './suggestion-item.style';


class SuggestionItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      enteringFocusedState: false
    };
  }

  componentWillReceiveProps(nextProps) {
    /*
      When isFocused is changed from false to true, set `enteringFocusedState` to true
      then immediately set it back to false. This allows custom starting position
      for "enter" animations. See `textContainer` below for an example.
    */
    if (!this.props.isFocused && nextProps.isFocused) {
      this.setState({ enteringFocusedState: true });
      setTimeout(() => { this.setState({ enteringFocusedState: false }); }, 10);
    }
  }

  handleClick(text, href, to) {
    const { suggestionClick, contentType } = this.props;
    suggestionClick(contentType, text, href, to);
  }

  render() {
    const { suggestion, hovering, isFocused, aliasEditModeOn, suggestionType } = this.props;
    const text = get(suggestion, 'payload.result_text', '');
    const href = get(suggestion, 'payload.url', '');
    const to = get(suggestion, 'payload.to', '');
    const aliases = get(suggestion, 'payload.tags', []) || []; // lodash.get() treats null as a positive too
    const extraText = get(suggestion, 'payload.result_extra_information', '');
    const suggestionItemClassName = classnames('suggestion-item', { 'focused': isFocused });
    const reason = get(suggestion, 'payload.result_reason', '');

    const commonWrapperProps = {
      style: suggestionItemStyle,
      onClick: this.handleClick.bind(this, text, href, to)
    };

    const children = [
      <SuggestionEnterBadge
        key='enter-badge'
        isFocused={ isFocused }
      />,
      <SuggestionItemTextContainer
        key='text'
        id={ suggestion.id }
        text={ text }
        suggestionType={ suggestionType }
        extraText={ extraText }
        reason={ reason }
        aliases={ aliases }
        hovering={ hovering }
        isFocused={ isFocused }
        enteringFocusedState={ this.state.enteringFocusedState }
        aliasEditModeOn={ aliasEditModeOn }
      />
    ];

    const linkTag = (to ?
      <Link to={ to } { ...commonWrapperProps }>{ children }</Link> :
      <a href={ href } { ...commonWrapperProps } >{ children }</a>
    );

    return (
      <div className={ suggestionItemClassName } id={ this.props.id }>
        { aliasEditModeOn ? <div style={ suggestionItemStyle }>{ children }</div> : linkTag }
      </div>
    );
  }
}

SuggestionItem.defaultProps = {
  suggestionClick: () => {},
  suggestion: {}
};

SuggestionItem.propTypes = {
  id: PropTypes.string,
  isFocused: PropTypes.bool,
  suggestion: PropTypes.object,
  suggestionClick: PropTypes.func,
  hovering: PropTypes.bool,
  contentType: PropTypes.string,
  aliasEditModeOn: PropTypes.bool,
  suggestionType: PropTypes.string
};

export default Hoverable(SuggestionItem);

export const UnwrappedSuggestionItem = SuggestionItem;
