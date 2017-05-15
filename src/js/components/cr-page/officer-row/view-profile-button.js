import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { viewOfficerButtonWrapperStyle, textStyle, arrowStyle } from './view-profile-button.style';


class ViewProfileButton extends Component {
  render() {
    const { officerId, hovering, onClick } = this.props;

    return (
      <div className='test--view-profile-button' style={ viewOfficerButtonWrapperStyle(hovering) }
        onClick={ () => onClick(officerId) }>
        <span style={ textStyle }>view officer profile</span>
        <div style={ arrowStyle(hovering) } />
      </div>
    );
  }
}

ViewProfileButton.propTypes = {
  hovering: PropTypes.bool,
  onClick: PropTypes.func,
  officerId: PropTypes.number
};

export default Hoverable(ViewProfileButton);
