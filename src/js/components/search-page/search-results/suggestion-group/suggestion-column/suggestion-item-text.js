import React, { Component, PropTypes } from 'react';
import { Motion, spring, presets } from 'react-motion';
import { Link } from 'react-router';

import { INLINE_SEARCH_ALIAS_ADMIN_PATH } from 'utils/constants';
import {
  suggestionTextStyle,
  metaTextStyle,
  reasonStyle,
  aliasLinkStyle
} from './suggestion-item.style';


class SuggestionItemText extends Component {
  render() {
    const {
      id,
      text,
      extraText,
      reason,
      hovering,
      isFocused,
      enteringFocusedState,
      aliases,
      aliasEditModeOn,
      suggestionType,
      setAliasAdminPageContent
    } = this.props;

    const aliasLink = (
      <Link
        style={ aliasLinkStyle }
        to={ `/edit/${INLINE_SEARCH_ALIAS_ADMIN_PATH}` }
        onClick={
          () => setAliasAdminPageContent({
            id, text,
            type: suggestionType,
            description: extraText,
            existingAliases: aliases
          })
        }
      >
        Alias
      </Link>
    );

    return (
      <Motion
        key='text-container'
        defaultStyle={ { translateY: 0 } }
        style={ {
          // "enter" transition effect: slide up from 15px under
          translateY: enteringFocusedState ? 15 : spring(0, presets.stiff)
        } }
      >
        {
          (style) => (
            <div style={ {
              transform: `translateY(${style.translateY}px)`
            } }>
              <div
                key='suggestion'
                className='link--transition test--suggestion-item-text'
                style={ suggestionTextStyle(hovering, isFocused) }>
                { text }
              </div>
              <div
                key='meta'
                className='link--transition test--suggestion-item-extra-text'
                style={ metaTextStyle(hovering, isFocused) }>
                { extraText }
              </div>
              <div
                key='reason'
                className='link--transition test--suggestion-item-reason'
                style={ reasonStyle(hovering, isFocused) }>
                { (reason || aliases.join(', ')) + ' ' }
                { (aliasEditModeOn && suggestionType !== 'co-accused') ? aliasLink : null }
              </div>
            </div>
          )
        }
      </Motion>
    );
  }
}

SuggestionItemText.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  extraText: PropTypes.string,
  reason: PropTypes.string,
  hovering: PropTypes.bool,
  isFocused: PropTypes.bool,
  enteringFocusedState: PropTypes.bool,
  aliases: PropTypes.array,
  aliasEditModeOn: PropTypes.bool,
  suggestionType: PropTypes.string,
  setAliasAdminPageContent: PropTypes.func,
};

export default SuggestionItemText;
