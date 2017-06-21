import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import classnames from 'classnames';
import { Link } from 'react-router';

import Hoverable from 'components/common/higher-order/hoverable';
import SuggestionItemText from './suggestion-item-text';
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
    const { suggestion, hovering, isFocused } = this.props;
    const text = get(suggestion, 'payload.result_text', '');
    const href = get(suggestion, 'payload.url', '');
    const to = get(suggestion, 'payload.to', '');
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
      <SuggestionItemText
        key='text'
        text={ text }
        extraText={ extraText }
        reason={ reason }
        hovering={ hovering }
        isFocused={ isFocused }
        enteringFocusedState={ this.state.enteringFocusedState }
      />
    ];

    const linkTag = (to ?
      <Link to={ to } { ...commonWrapperProps }>{ children }</Link> :
      <a href={ href } { ...commonWrapperProps } >{ children }</a>
    );

    return (
      <div className={ suggestionItemClassName } id={ this.props.id }>
        { linkTag }
      </div>
    );
  }
}

SuggestionItem.defaultProps = {
  suggestionClick: () => {}
};

SuggestionItem.propTypes = {
  id: PropTypes.string,
  isFocused: PropTypes.bool,
  suggestion: PropTypes.object,
  suggestionClick: PropTypes.func,
  hovering: PropTypes.bool,
  contentType: PropTypes.string
};

export default Hoverable(SuggestionItem);

export const UnwrappedSuggestionItem = SuggestionItem;
