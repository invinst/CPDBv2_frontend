import React, { Component, PropTypes } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import CoaccusedList from './coaccused-list';
import ExpandMotion from 'components/animation/expand-motion';
import CoaccusedDropdownButton from './coaccused-dropdown-button';
import { boxShadowStyle, headerStyle, titleStyle, outerPlaceholderStyle } from './header.style';
import Hoverable from 'components/common/higher-order/hoverable';


class Header extends Component {
  render() {
    const {
      crid, officerId, coaccused, openComplaintPage, displayCoaccusedDropdown, onDropDownButtonClick, scrollPosition,
      hovering
    } = this.props;

    return (
      <div>
        <div style={ outerPlaceholderStyle(scrollPosition) }/>
        <div style={ boxShadowStyle(scrollPosition, hovering) }>
          <ResponsiveFluidWidthComponent>
            <div style={ headerStyle }>
              <span
                className='test--header-title'
                style={ titleStyle(displayCoaccusedDropdown, scrollPosition, hovering) }>{ `CR ${crid}` }
              </span>
              <CoaccusedDropdownButton
                coaccused={ coaccused }
                officerId={ officerId }
                displayCoaccusedDropdown={ displayCoaccusedDropdown }
                onClick={ onDropDownButtonClick }
                scrollPosition={ scrollPosition }
                parentHovering={ hovering }
              />
            </div>
          </ResponsiveFluidWidthComponent>
          <ExpandMotion show={ displayCoaccusedDropdown }>
            <CoaccusedList currentOfficerId={ officerId } coaccused={ coaccused }
              openComplaintPage={ openComplaintPage } crid={ crid }/>
          </ExpandMotion>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  crid: PropTypes.string,
  openComplaintPage: PropTypes.func,
  officerId: PropTypes.number,
  coaccused: PropTypes.array,
  displayCoaccusedDropdown: PropTypes.bool,
  onDropDownButtonClick: PropTypes.func,
  scrollPosition: PropTypes.string,
  hovering: PropTypes.bool
};

export default Hoverable(Header);
