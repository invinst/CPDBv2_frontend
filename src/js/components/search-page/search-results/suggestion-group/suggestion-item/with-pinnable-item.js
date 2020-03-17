import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isEmpty, isEqual } from 'lodash';
import { trigger } from 'mousetrap';
import cx from 'classnames';

import JumpyMotion from 'components/animation/jumpy-motion';
import TextWithInlineSearchAlias from './text-with-inline-search-alias';
import EditModeItem from './edit-mode-item';
import ItemPinButton from 'components/common/item-pin-button';
import styles from './with-pinnable-item.sass';


export default function withPinnableItem(
  isPinnable=false, getFirstRowContent=null, getSecondRowContent=null) {
  class _Base extends Component {
    shouldComponentUpdate(nextProps, nextState) {
      const { isFocused, suggestion } = this.props;

      return nextProps.isFocused !== isFocused
          || !isEqual(suggestion, nextProps.suggestion);
    }

    renderFirstRow() {
      const { isFocused, aliasEditModeOn, setAliasAdminPageContent } = this.props;
      const { text, id, type, subText, tags } = this.props.suggestion;
      const firstRowText = getFirstRowContent !== null ?
        getFirstRowContent(this.props) : text;
      const secondRowText = getSecondRowContent !== null ?
        getSecondRowContent(this.props) : subText;

      return (
        <TextWithInlineSearchAlias
          textClassName={ cx(
            styles.blackText,
            { 'active': isFocused },
            { 'without-summary': isEmpty(secondRowText) },
            'test--first-row'
          ) }
          aliasClassName={ cx(styles.aliasLink, 'test--create-alias-link') }
          text={ firstRowText }
          aliasEditModeOn={ aliasEditModeOn }
          setAliasAdminPageContent={ setAliasAdminPageContent }
          content={ {
            id, text,
            type: type.toLowerCase(),
            description: subText,
            existingAliases: tags,
          } }
        />
      );
    }

    renderSecondRow() {
      const { subText } = this.props.suggestion;
      const secondRowText = getSecondRowContent !== null ?
        getSecondRowContent(this.props) : subText;

      return (
        <div className={ cx(styles.grayText, 'test--second-row') }>
          { secondRowText }
        </div>
      );
    }

    handleClick = e => {
      e.preventDefault();
      const { suggestion, selectItem, clickItem, isFocused } = this.props;

      if (clickItem)
        clickItem(suggestion);
      else {
        if (!isFocused)
          selectItem();
        else
        // Trigger Enter, so they share behaviour and only search-page handle logic
        // `components/search-page/index.js` -> handleViewItem()
          trigger('enter');
      }
    };

    renderContent() {
      const { isFocused, suggestion, addOrRemoveItemInPinboard, showPinButtonArea, showIntroduction } = this.props;

      return (
        <div className={ styles.innerWrapper }>
          <JumpyMotion isActive={ isFocused }>
            {
              isPinnable && <ItemPinButton
                className={ styles.itemPinButton }
                showIntroduction={ showIntroduction }
                addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
                item={ suggestion }
              />
            }
            <div className={ cx(styles.twoRowsWrapper, { 'show-pin-button-area': !isPinnable && showPinButtonArea }) }>
              { this.renderFirstRow() }
              { this.renderSecondRow() }
            </div>
          </JumpyMotion>
        </div>
      );
    }

    render() {
      const { aliasEditModeOn, isFocused, suggestion } = this.props;
      const { to: redirectLink, uniqueKey, url: redirectUrl } = suggestion;

      const content = this.renderContent();
      const wrapperProps = {
        aliasEditModeOn,
        className: cx(
          styles.suggestionItem,
          { 'active': isFocused },
          `suggestion-item-${uniqueKey}`,
          { 'test--focused': isFocused }
        ),
        onClick: this.handleClick,
        redirectLink,
        redirectUrl,
      };

      return <EditModeItem { ...wrapperProps }>{ content }</EditModeItem>;
    }
  }

  _Base.propTypes = {
    isFocused: PropTypes.bool,
    showIntroduction: PropTypes.bool,
    suggestion: PropTypes.object,
    addOrRemoveItemInPinboard: PropTypes.func,
    aliasEditModeOn: PropTypes.bool,
    setAliasAdminPageContent: PropTypes.func,
    selectItem: PropTypes.func,
    clickItem: PropTypes.func,
    showPinButtonArea: PropTypes.bool,
  };

  return _Base;
}
