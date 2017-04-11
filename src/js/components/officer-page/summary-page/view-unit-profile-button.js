import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { viewUnitButtonWrapperStyle, textStyle, arrowStyle } from './view-unit-profile-button.style';


class ViewUnitProfileButton extends Component {
  render() {
    const { unitName, hovering, onClick } = this.props;

    return (
      <div className='test--view-profile-button' style={ viewUnitButtonWrapperStyle(hovering) }
        onClick={ () => onClick(unitName) }>
        <span style={ textStyle }>view unit profile</span>
        <div style={ arrowStyle(hovering) } />
      </div>
    );
  }
}

ViewUnitProfileButton.propTypes = {
  hovering: PropTypes.bool,
  onClick: PropTypes.func,
  unitName: PropTypes.string
};

ViewUnitProfileButton.defaultProps = {
  onClick: () => {}
};

export default Hoverable(ViewUnitProfileButton);
