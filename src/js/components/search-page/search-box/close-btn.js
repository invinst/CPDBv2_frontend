import React, { PropTypes } from 'react';

import { closeButtonStyle } from './close-btn.style';


export default class CloseButton extends React.Component {
  render() {
    return (
      <button
        style={ closeButtonStyle }
        className={ this.props.className }
        onClick={ this.props.onClick }
      />
    );
  }
}

CloseButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};
