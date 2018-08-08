import React, { PropTypes } from 'react';
import ConfiguredRadium from 'utils/configured-radium';
import { assign } from 'lodash';

import { EditorBlock } from 'draft-js';


class EditorBlockWithStyle extends EditorBlock {
  render() {
    const { style, element, child } = this.props.blockProps;
    const { offsetKey } = this.props;
    const { draftEditorBlockStyle } = this.context;
    const _style = assign({}, style, draftEditorBlockStyle);

    return React.createElement(
      element,
      { 'data-offset-key': offsetKey, style: _style },
      [...this._renderChildren(), child]
    );
  }
}

EditorBlockWithStyle.propTypes = {
  offsetKey: PropTypes.string,
  blockProps: PropTypes.object
};

EditorBlockWithStyle.contextTypes = {
  draftEditorBlockStyle: PropTypes.object
};

export default ConfiguredRadium(EditorBlockWithStyle);
