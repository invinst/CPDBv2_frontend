import React, { PropTypes } from 'react';
import ConfiguredRadium from 'utils/configured-radium';

import { EditorBlock } from 'draft-js';


class EditorBlockWithStyle extends EditorBlock {
  render() {
    const { style, element } = this.props.blockProps;
    const { offsetKey } = this.props;

    return React.createElement(
      element,
      { 'data-offset-key': offsetKey, style },
      this._renderChildren()
    );
  }
}

EditorBlockWithStyle.propTypes = {
  offsetKey: PropTypes.string,
  blockProps: PropTypes.object
};

export default ConfiguredRadium(EditorBlockWithStyle);
