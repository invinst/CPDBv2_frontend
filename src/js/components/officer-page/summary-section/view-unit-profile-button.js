import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Hoverable from 'components/common/higher-order/hoverable';
import { viewUnitButtonWrapperStyle, textStyle, arrowStyle } from './view-unit-profile-button.style';


class ViewUnitProfileButton extends Component {
  render() {
    const { unitName, hovering } = this.props;

    return (
      <Link
        className='test--view-profile-button'
        style={ viewUnitButtonWrapperStyle(hovering) }
        to={ `/unit/${unitName}/` }
      >
        <span style={ textStyle }>View Unit Profile</span>
        <div style={ arrowStyle(hovering) } />
      </Link>
    );
  }
}

ViewUnitProfileButton.propTypes = {
  hovering: PropTypes.bool,
  unitName: PropTypes.string
};

export default Hoverable(ViewUnitProfileButton);
