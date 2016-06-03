import React, { PropTypes } from 'react';
import Radium from 'radium';

import {
  buttonStyle
} from './copy-link-btn.style';


class CopyLinkButton extends React.Component {
  render() {
    return (
      <button style={ [buttonStyle, this.props.style] } className={ this.props.className }
        onClick={ this.props.onClick }/>
    );
  }
}

CopyLinkButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Radium(CopyLinkButton);
