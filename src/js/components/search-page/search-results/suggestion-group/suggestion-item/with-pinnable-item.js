import React, { Component, PropTypes } from 'react';

import { isEqual, get } from 'lodash';
import { trigger } from 'mousetrap';
import cx from 'classnames';

import JumpyMotion from 'components/animation/jumpy-motion';
import TextWithInlineSearchAlias from './text-with-inline-search-alias';
import EditModeItem from './edit-mode-item';
import ItemPinButton from './item-pin-button';
import PinActionHint from './pin-action-hint';
import styles from './with-pinnable-item.sass';


export default function withPinnableItem(
  isPinnable=false, getFirstRowContent=null, getSecondRowContent=null) {
  class _Base extends Component {
    constructor(props) {
      super(props);

      if (isPinnable) {
        this.state = {
          isPinButtonHovered: false
        };
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      const { isFocused, suggestion } = this.props;

      return (isPinnable && nextState.isPinButtonHovered !== this.state.isPinButtonHovered)
          || nextProps.isFocused !== isFocused
          || !isEqual(suggestion, nextProps.suggestion);
    }

    renderFirstRow() {
      const { isFocused, aliasEditModeOn, setAliasAdminPageContent } = this.props;
      const { text, id, type, subText, tags } = this.props.suggestion;
      const firstRowText = getFirstRowContent !== null ?
        getFirstRowContent(this.props) : text;

      return (
        <TextWithInlineSearchAlias
          textClassName={ cx(styles.blackText, { 'active': isFocused }, 'test--first-row') }
          aliasClassName={ cx(styles.aliasLink, 'test--create-alias-link') }
          text={ firstRowText }
          aliasEditModeOn={ aliasEditModeOn }
          setAliasAdminPageContent={ setAliasAdminPageContent }
          content={ {
            id, text,
            type: type.toLowerCase(),
            description: subText,
            existingAliases: tags
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

    renderContent() {
      const { isFocused, suggestion, addOrRemoveItemInPinboard } = this.props;
      const { isPinned } = this.props.suggestion;
      const isPinButtonHovered = get(this.state, 'isPinButtonHovered');

      return (
        <div className={ styles.innerWrapper }>
          <JumpyMotion isActive={ isFocused }>
            {
              isPinnable && <ItemPinButton
                onPinButtonHoverToggle={ (isHovering) => this.setState({
                  isPinButtonHovered: isHovering
                }) }
                className={ styles.itemPinButton }
                addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
                suggestion={ suggestion }
              />
            }
            <div className={ styles.twoRowsWrapper }>
              { this.renderFirstRow() }
              { this.renderSecondRow() }
            </div>
            {
              isPinnable && <PinActionHint className={ styles.pinActionHintWrapper }
                isPinButtonHovered={ isPinButtonHovered } isPinned={ isPinned } />
            }
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
        onClick: this.handleClick.bind(this),
        redirectLink,
        redirectUrl
      };

      return <EditModeItem { ...wrapperProps }>{ content }</EditModeItem>;
    }
  }

  _Base.propTypes = {
    isFocused: PropTypes.bool,
    suggestion: PropTypes.object,
    addOrRemoveItemInPinboard: PropTypes.func,
    aliasEditModeOn: PropTypes.bool,
    setAliasAdminPageContent: PropTypes.func,
    selectItem: PropTypes.func,
  };

  return _Base;
}
