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
      showUrlInput: false,
      linkActive: false
    };
    this.position = {};
    this.handleLinkButtonClick = this.handleLinkButtonClick.bind(this);
    this.handleUrlInputEntryFinished = this.handleUrlInputEntryFinished.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorState !== this.props.editorState) {
      this.setState({ linkActive: false });
    }
  }

  handleLinkButtonClick() {
    const { editorState, contentStateKey, removeLinkEntity } = this.props;
    const { showUrlInput } = this.state;
    if (linkEntitySelected(editorState)) {
      removeLinkEntity({ key: contentStateKey, editorState });
      this.setState({ showUrlInput: false, linkActive: false });
    } else {
      this.setState({ showUrlInput: !showUrlInput, linkActive: !showUrlInput });
    }
  }

  handleUrlInputEntryFinished(url) {
    const { contentStateKey, createLinkEntity, editorState } = this.props;
    let linkActive = false;
    if (url) {
      createLinkEntity({
        key: contentStateKey,
        data: { url },
        editorState
      });
      linkActive = true;
    }
    this.setState({ showUrlInput: false, linkActive });
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
    const { showUrlInput, linkActive } = this.state;
    let _linkActive = linkActive || (editorState && linkEntitySelected(editorState));

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
            active={ _linkActive }/>
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
