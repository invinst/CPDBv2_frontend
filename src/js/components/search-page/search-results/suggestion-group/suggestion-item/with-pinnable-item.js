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
import appConfig from 'utils/app-config';
import { APP_CONFIG_KEYS } from 'utils/constants';


export default function withPinnableItem(
  isPinnable=false, getFirstRowContent=null, getSecondRowContent=null) {
  class _Base extends Component {
    constructor(props) {
      super(props);
      this.state = { displayIntroduction: false };
    }

    componentDidMount() {
      this.setDisplayIntroductionTimeout();
    }

    shouldComponentUpdate(nextProps, nextState) {
      const { isFocused, suggestion, pinboardUrl, hide } = this.props;
      const { displayIntroduction } = this.state;

      return nextProps.isFocused !== isFocused
          || !isEqual(suggestion, nextProps.suggestion)
          || displayIntroduction !== nextState.displayIntroduction
          || hide !== nextProps.hide
          || pinboardUrl !== nextProps.pinboardUrl;
    }

    componentDidUpdate() {
      this.setDisplayIntroductionTimeout();
    }

    componentWillUnmount() {
      this.displayIntroductionTimeout && clearTimeout(this.displayIntroductionTimeout);
    }

    setDisplayIntroductionTimeout() {
      const { suggestion: { showIntroduction }, hide } = this.props;
      const { displayIntroduction } = this.state;
      if (showIntroduction && !hide && !displayIntroduction) {
        this.displayIntroductionTimeout = setTimeout (() => {
          this.setState({ displayIntroduction: true });
          this.displayIntroductionTimeout = null;
        }, appConfig.get(APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY));
      } else if (showIntroduction && hide && displayIntroduction) {
        this.setState({ displayIntroduction: false });
      }
    }

    renderFirstRow() {
      const { isFocused, aliasEditModeOn, setAliasAdminPageContent, suggestion } = this.props;
      const { text, id, type, subText, tags } = suggestion;
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
      const { suggestion, selectItem, clickItem, isFocused, visitPinButtonIntroduction } = this.props;
      const { showIntroduction } = suggestion;
      const { displayIntroduction } = this.state;
      if (showIntroduction && displayIntroduction) {
        visitPinButtonIntroduction();
      } else if (clickItem) {
        clickItem(suggestion);
      }
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
      const {
        isFocused,
        suggestion,
        addOrRemoveItemInPinboard,
        showPinButtonArea,
        pinboardUrl,
        visitPinButtonIntroduction,
      } = this.props;
      const { showIntroduction } = suggestion;
      const { displayIntroduction } = this.state;
      const shouldShowIntroduction = showIntroduction && displayIntroduction;

      return (
        <div className={ styles.innerWrapper }>
          <JumpyMotion isActive={ isFocused }>
            {
              isPinnable ?
                <ItemPinButton
                  className={ styles.itemPinButton }
                  showIntroduction={ shouldShowIntroduction }
                  visitPinButtonIntroduction={ visitPinButtonIntroduction }
                  addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
                  item={ suggestion }
                  pinboardUrl={ pinboardUrl }
                />
                :
                showPinButtonArea && <div className='empty-pin-button-area pinboard-feature' />
            }
            <div className={ styles.twoRowsWrapper }>
              { this.renderFirstRow() }
              { this.renderSecondRow() }
            </div>
            {
              shouldShowIntroduction &&
                <div className={ cx('pinboard-feature', 'pin-button-introduction') }>
                  Tap this button to add to your pinboard
                </div>
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
        onClick: this.handleClick,
        redirectLink,
        redirectUrl,
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
    clickItem: PropTypes.func,
    showPinButtonArea: PropTypes.bool,
    pinboardUrl: PropTypes.string,
    visitPinButtonIntroduction: PropTypes.func,
    isPinButtonIntroductionVisited: PropTypes.bool,
    hide: PropTypes.bool,
  };

  return _Base;
}
