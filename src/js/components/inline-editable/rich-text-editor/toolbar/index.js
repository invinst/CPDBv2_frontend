import React, { Component, PropTypes } from 'react';

import { linkEntitySelected, getSelectionStartBlockKey } from 'utils/draft';
import { getOffsetKey } from 'utils/rich-text';
import ToolbarButton from './toolbar-button';
import UrlInput from './url-input';
import Bubble from './bubble';
import { wrapperStyle, urlInputStyle } from './toolbar.style';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUrlInput: false
    };
    this.position = {};
    this.handleLinkButtonClick = this.handleLinkButtonClick.bind(this);
    this.handleUrlInputEntryFinished = this.handleUrlInputEntryFinished.bind(this);
  }

  handleLinkButtonClick() {
    const { editorState, contentStateKey, removeLinkEntity } = this.props;
    const { showUrlInput } = this.state;
    if (linkEntitySelected(editorState)) {
      removeLinkEntity({ key: contentStateKey, editorState });
      this.setState({ showUrlInput: false });
    } else {
      this.setState({ showUrlInput: !showUrlInput });
    }
  }

  handleUrlInputEntryFinished(url) {
    const { contentStateKey, createLinkEntity, editorState } = this.props;
    if (url) {
      createLinkEntity({
        key: contentStateKey,
        data: { url },
        editorState
      });
    }
    this.setState({ showUrlInput: false });
  }

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
    const rect = this.currentSelectionRect();
    if (rect !== null) {
      this.position = {
        top: `${rect.top - 60}px`,
        left: `${rect.left + (rect.width - 50) / 2}px`
      };
    }
    return this.position;
  }

  render() {
    const { editorState, show } = this.props;
    const { showUrlInput } = this.state;
    const linkActive = editorState && (showUrlInput || linkEntitySelected(editorState));

    if (!show) {
      return null;
    }

    return (
      <Bubble style={ this.toolbarPosition() }>
        <div style={ { ...wrapperStyle } }>
          <ToolbarButton
            icon='link-blue.svg'
            activeIcon='link-white.svg'
            onClick={ this.handleLinkButtonClick }
            active={ linkActive }/>
          { showUrlInput ?
            <UrlInput
              style={ urlInputStyle }
              onEntryFinished={ this.handleUrlInputEntryFinished }/> :
            null
          }
        </div>
      </Bubble>
    );
  }
}

Toolbar.propTypes = {
  editorState: PropTypes.object,
  contentStateKey: PropTypes.string,
  show: PropTypes.bool,
  createLinkEntity: PropTypes.func,
  removeLinkEntity: PropTypes.func
};

export default Toolbar;
