import React, { PropTypes } from 'react';
import Radium from 'radium';

import CloseButton from 'components/common/close-btn';
import { wrapperStyle, topWrapperStyle } from './close-btn-wrapper.style';
import { TOP } from 'utils/constants';


class CloseButtonWrapper extends React.Component {
  render() {
    if (this.props.expanded || this.props.showButton) {
      return (
        <div style={ [wrapperStyle, this.props.position === TOP ? topWrapperStyle : null] }>
          { this.props.showButton ?
            <CloseButton className={ this.props.buttonClassName }/>
            : null
          }
        </div>
      );
    } else {
      return null;
    }
  }
}

CloseButtonWrapper.propTypes = {
  expanded: PropTypes.bool,
  showButton: PropTypes.bool,
  position: PropTypes.string,
  buttonClassName: PropTypes.string
};

export default Radium(CloseButtonWrapper);
