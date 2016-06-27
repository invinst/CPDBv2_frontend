import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import CloseButton from 'components/common/close-btn';
import { wrapperStyle, topWrapperStyle, topButtonStyle } from './close-btn-wrapper.style';
import { TOP, BOTTOM } from 'utils/constants';


class CloseButtonWrapper extends React.Component {
  render() {
    if (this.props.expanded || this.props.showButton) {
      return (
        <div style={ [wrapperStyle, this.props.position === TOP ? topWrapperStyle : null] }>
          { this.props.showButton ?
            <CloseButton className={ this.props.buttonClassName }
              style={ this.props.position === TOP ? topButtonStyle : null }/>
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

CloseButtonWrapper.defaultProps = {
  position: BOTTOM
};

export default ConfiguredRadium(CloseButtonWrapper);
