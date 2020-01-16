import PropTypes from 'prop-types';
import React from 'react';
import ConfiguredRadium from 'utils/configured-radium';

import { EditorBlock } from 'draft-js';


class EditorBlockWithStyle extends EditorBlock {
  render() {
    const { style, element, child } = this.props.blockProps;
    const { offsetKey } = this.props;

    return React.createElement(
      element,
      { 'data-offset-key': offsetKey, style },
      [...this._renderChildren(), child]
    );
  }
}

EditorBlockWithStyle.propTypes = {
  offsetKey: PropTypes.string,
  blockProps: PropTypes.object,
};

export default ConfiguredRadium(EditorBlockWithStyle);
