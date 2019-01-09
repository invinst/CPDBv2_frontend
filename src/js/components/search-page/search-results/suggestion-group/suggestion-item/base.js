import React, { Component, PropTypes } from 'react';
import { isEqual } from 'lodash';
import { Link } from 'react-router';

import { trigger } from 'mousetrap';
import cx from 'classnames';

import JumpyMotion from 'components/animation/jumpy-motion';
import * as constants from 'utils/constants';
import styles from './base.sass';


export default class SuggestionItemBase extends Component {
  constructor(props) {
    super(props);

    this.handleAliasButtonClick = this.handleAliasButtonClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { isFocused, suggestion } = this.props;
    return nextProps.isFocused !== isFocused || !isEqual(suggestion, nextProps.suggestion);
  }

  handleAliasButtonClick(e) {
    e.stopPropagation();
    const { setAliasAdminPageContent } = this.props;
    const { text, id, type, subText, tags } = this.props.suggestion;

    setAliasAdminPageContent({
      id, text,
      type: type.toLowerCase(),
      description: subText,
      existingAliases: tags
    });
  }

  renderFirstRow() {
    const { isFocused, aliasEditModeOn } = this.props;
    const { text } = this.props.suggestion;

    return (
      <div className={ cx(styles.blackText, { 'active': isFocused }, 'test--first-row') }>
        { text }
        {
          aliasEditModeOn ?
            <Link
              className={ cx(styles.aliasLink, 'test--create-alias-link') }
              to={ `/edit/${constants.INLINE_SEARCH_ALIAS_ADMIN_PATH}` }
              onClick={ this.handleAliasButtonClick }>
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
      <div className={ cx(styles.grayText, 'test--second-row') }>
        { subText }
      </div>
    );
  }

  getExtraInnerWrapperClassName() {
    return null;
  }

  renderContent() {
    const { isFocused } = this.props;

    return (
      <div className={ cx(styles.innerWrapper, this.getExtraInnerWrapperClassName()) }>
        <JumpyMotion isActive={ isFocused }>
          { this.renderFirstRow() }
          { this.renderSecondRow() }
        </JumpyMotion>
      </div>
    );
  }

  handleClick(e) {
    e.preventDefault();
    const { selectItem, isFocused } = this.props;

    if (!isFocused)
      selectItem();
    else
    // Trigger Enter, so they share behaviour and only search-page handle logic
    // `components/search-page/index.js` -> handleViewItem()
      trigger('enter');
  }

  render() {
    const { aliasEditModeOn, isFocused, suggestion } = this.props;
    const { to, uniqueKey, url } = suggestion;

    const commonWrapperProps = {
      className: cx(
        styles.suggestionItem,
        { 'active': isFocused },
        `suggestion-item-${uniqueKey}`,
        { 'test--focused': isFocused }
      ),
      onClick: this.handleClick.bind(this)
    };

    let result;
    const content = this.renderContent();
    if (aliasEditModeOn) {
      result = <div { ...commonWrapperProps }>{ content }</div>;
    } else if (to) {
      result = <Link { ...commonWrapperProps } to={ to }>{ content }</Link>;
    } else {
      result = <a { ...commonWrapperProps } href={ url }>{ content }</a>;
    }

    return result;
  }
}

SuggestionItemBase.propTypes = {
  aliasEditModeOn: PropTypes.bool,
  suggestion: PropTypes.object,
  isFocused: PropTypes.bool,
  setAliasAdminPageContent: PropTypes.func,
  selectItem: PropTypes.func,
};

SuggestionItemBase.defaultProps = {
  suggestion: {},
  selectItem: () => {},
};
