import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { RichUtils } from 'draft-js';

import { linkEntitySelected, getSelectionStartBlockKey, inlineStyleSelected } from 'utils/draft';
import { getOffsetKey } from 'utils/rich-text';
import ToolbarButton from './toolbar-button';
import UrlInput from './url-input';
import Bubble from './bubble';
import { createLinkEntity, removeLinkEntity, defocus } from 'utils/draft';
import { wrapperStyle, urlInputStyle } from './toolbar.style';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkActive: false,
      urlInputValue: '',
    };
    this.position = {};
    this.urlInputHasFocus = false;
    this.mouseOver = false;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.editorState !== this.props.editorState) {
      const linkEntity = linkEntitySelected(nextProps.editorState);
      if (linkEntity) {
        const { url } = linkEntity.getData();
        this.setState({ urlInputValue: url, linkActive: true });
      } else {
        this.setState({ urlInputValue: '', linkActive: false });
      }
    }
  }

  handleLinkButtonClick = () => {
    const { editorState, onChange } = this.props;
    const { linkActive, urlInputValue } = this.state;
    if (urlInputValue) {
      onChange(removeLinkEntity(editorState));
      this.setState({ linkActive: false });
    } else {
      this.setState({ linkActive: !linkActive });
    }
  };

  handleUrlInputChange = value => {
    let { editorState, onChange } = this.props;

    this.setState({ urlInputValue: value });

    if (value) {
      editorState = createLinkEntity(editorState, { url: value });
    } else {
      editorState = removeLinkEntity(editorState);
    }

    onChange(defocus(editorState));
  };

  handleBoldButtonClick = () => {
    const { editorState, onChange } = this.props;
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  handleItalicButtonClick = () => {
    const { editorState, onChange } = this.props;
    onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  currentSelectionRect() {
    const { editorState } = this.props;
    const blockKey = getSelectionStartBlockKey(editorState);
    const selection = window.getSelection();
    if (!selection.rangeCount) {
      return null;
    }
    const range = selection.getRangeAt(0);
    const node = range.startContainer;
    const offsetKey = getOffsetKey(node);
    if (offsetKey && offsetKey.split('-')[0] === blockKey) {
      return range.getBoundingClientRect();
    }
    return null;
  }

  toolbarPosition() {
    const { parentLeft, parentTop } = this.props;
    const rect = this.currentSelectionRect();
    if (rect !== null) {
      this.position = {
        top: `${rect.top - 60 - parentTop}px`,
        left: `${rect.left - parentLeft + (rect.width - 150) / 2}px`,
      };
    }
    return this.position;
  }

  handleMouseOver = () => {
    const { onFocus } = this.props;
    this.mouseOver = true;
    onFocus();
  };

  handleMouseOut = () => {
    const { onBlur } = this.props;
    this.mouseOver = false;
    if (!this.urlInputHasFocus) {
      onBlur();
    }
  };

  handleUrlInputFocus = () => {
    const { onFocus } = this.props;
    this.urlInputHasFocus = true;
    onFocus();
  };

  handleUrlInputBlur = () => {
    const { onBlur } = this.props;
    this.urlInputHasFocus = false;
    if (!this.mouseOver) {
      onBlur();
    }
  };

  render() {
    const { editorState, show } = this.props;
    const { linkActive, urlInputValue } = this.state;
    let _linkActive = linkActive || (editorState && !!urlInputValue);
    let boldActive = editorState && inlineStyleSelected(editorState, 'BOLD');
    let italicActive = editorState && inlineStyleSelected(editorState, 'ITALIC');

    if (!show) {
      return null;
    }

    return (
      <Bubble style={ this.toolbarPosition() } className='test--rich-text-toolbar'>
        <div style={ { ...wrapperStyle } }>
          <ToolbarButton
            className='test--rich-text-bold'
            onMouseOver={ this.handleMouseOver }
            onMouseOut={ this.handleMouseOut }
            icon='bold-blue.svg'
            activeIcon='bold-white.svg'
            onClick={ this.handleBoldButtonClick }
            active={ boldActive }/>
          <ToolbarButton
            className='test--rich-text-italic'
            onMouseOver={ this.handleMouseOver }
            onMouseOut={ this.handleMouseOut }
            icon='italic-blue.svg'
            activeIcon='italic-white.svg'
            onClick={ this.handleItalicButtonClick }
            active={ italicActive }/>
          <ToolbarButton
            className='test--rich-text-link'
            onMouseOver={ this.handleMouseOver }
            onMouseOut={ this.handleMouseOut }
            icon='link-blue.svg'
            activeIcon='link-white.svg'
            onClick={ this.handleLinkButtonClick }
            active={ _linkActive }/>
          { _linkActive ?
            <UrlInput
              onMouseOver={ this.handleMouseOver }
              onMouseOut={ this.handleMouseOut }
              onFocus={ this.handleUrlInputFocus }
              onBlur={ this.handleUrlInputBlur }
              value={ urlInputValue }
              onChange={ this.handleUrlInputChange }
              style={ urlInputStyle }/> :
            null
          }
        </div>
      </Bubble>
    );
  }
}

Toolbar.propTypes = {
  editorState: PropTypes.object,
  show: PropTypes.bool,
  onChange: PropTypes.func,
  parentLeft: PropTypes.number,
  parentTop: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Toolbar;
