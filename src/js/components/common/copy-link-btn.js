import React, { PropTypes } from 'react';
import Radium from 'radium';
import Clipboard from 'clipboard';

import { buttonStyle } from './copy-link-btn.style';


class CopyLinkButton extends React.Component {
  componentWillUnmount() {
    this.clipboard.destroy();
  }

  attachClipboardEvent(btn) {
    if (btn) {
      this.clipboard = new Clipboard(btn, { text: () => {
        /*istanbul ignore next*/
        return this.props.text;
      } });
    }
  }

  render() {
    return (
      <button style={ [buttonStyle, this.props.style] } className={ this.props.className }
        ref={ this.attachClipboardEvent.bind(this) }/>
    );
  }
}

CopyLinkButton.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.string
};

export default Radium(CopyLinkButton);
