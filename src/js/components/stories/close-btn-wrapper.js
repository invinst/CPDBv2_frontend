import React, { PropTypes } from 'react';

import CloseButton from 'components/common/close-btn';
import { wrapperStyle } from './close-btn-wrapper.style';


export default class CloseButtonWrapper extends React.Component {
  render() {
    if (this.props.expanded || this.props.showButton) {
      return (
        <div style={ wrapperStyle }>
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
  buttonClassName: PropTypes.string
};

CloseButtonWrapper.defaultProps = {
  expanded: true,
  showButton: true
};
