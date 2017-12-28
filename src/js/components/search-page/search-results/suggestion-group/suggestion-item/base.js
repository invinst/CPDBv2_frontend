import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import JumpyMotion from 'components/animation/jumpy-motion';
import * as constants from 'utils/constants';
import { suggestionItemStyle, blackTextStyle, grayTextStyle, innerWrapperStyle, aliasLinkStyle } from './base.style';


export default class SuggestionItemBase extends Component {
  shouldComponentUpdate(nextProps) {
    const { isFocused, hovering } = this.props;
    return nextProps.isFocused !== isFocused || nextProps.hovering !== hovering;
  }

  renderFirstRow() {
    const { hovering, isFocused, aliasEditModeOn, setAliasAdminPageContent } = this.props;
    const { text, id, type, subText, tags } = this.props.suggestion;

    return (
      <div style={ blackTextStyle(hovering, isFocused) }>
        { text }
        {
          aliasEditModeOn ?
            <Link
              style={ aliasLinkStyle }
              to={ `/edit/${constants.INLINE_SEARCH_ALIAS_ADMIN_PATH}` }
              onClick={
                () => setAliasAdminPageContent({
                  id, text,
                  type: type.toLowerCase(),
                  description: subText,
                  existingAliases: tags
                })
              }
            >
              Alias
            </Link> :
            null
        }
      </div>
    );
  }

  renderSecondRow() {
    const { subText } = this.props.suggestion;

    if (subText === undefined) {
      return null;
    }

    return (
      <div style={ grayTextStyle } className='test--second-row'>
        { subText }
      </div>
    );
  }

  renderContent() {
    const { isFocused } = this.props;

    return (
      <div style={ innerWrapperStyle }>
        <JumpyMotion isActive={ isFocused }>
          { this.renderFirstRow() }
          { this.renderSecondRow() }
        </JumpyMotion>
      </div>
    );
  }

  handleClick() {
    const { suggestionClick, suggestion } = this.props;
    const { type, text, url, to } = suggestion;

    suggestionClick(type, text, url, to);
  }

  render() {
    const { aliasEditModeOn, hovering, isFocused, suggestion } = this.props;
    const { url, to, uniqueKey, text } = suggestion;

    const commonWrapperProps = {
      style: suggestionItemStyle(hovering, isFocused),
      className: `suggestion-item-${uniqueKey}`,
      onClick: this.handleClick.bind(this, text, url, to)
    };

    let result;
    const content = this.renderContent();
    if (aliasEditModeOn) {
      result = <div { ...commonWrapperProps }>{ content }</div>;
    } else if (to) {
      result = <Link { ...commonWrapperProps } to={ to }>{ content }</Link>;
    } else {
      result = <a { ...commonWrapperProps } href={ url } >{ content }</a>;
    }

    return result;
  }
}

SuggestionItemBase.propTypes = {
  hovering: PropTypes.bool,
  aliasEditModeOn: PropTypes.bool,
  suggestion: PropTypes.object,
  isFocused: PropTypes.bool,
  setAliasAdminPageContent: PropTypes.func,
  suggestionClick: PropTypes.func
};

SuggestionItemBase.defaultProps = {
  suggestion: {},
  suggestionClick: () => {}
};
