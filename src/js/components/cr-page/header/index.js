import React, { Component, PropTypes } from 'react';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import CoaccusedList from './coaccused-list';
import ExpandMotion from 'components/animation/expand-motion';
import CoaccusedDropdownButton from './coaccused-dropdown-button';
import { boxShadowStyle, headerStyle, titleStyle } from './header.style';


export default class Header extends Component {
  render() {
    const {
      crid, officerId, coaccused, openBottomSheetWithComplaint, displayCoaccusedDropdown, onDropDownButtonClick
    } = this.props;

    return (
      <div style={ boxShadowStyle }>
        <ResponsiveFixedWidthComponent>
          <div style={ headerStyle }>
            <span className='test--header-title' style={ titleStyle }>{ `CR ${crid}` }</span>
            <CoaccusedDropdownButton
              coaccused={ coaccused } officerId={ officerId }
              displayCoaccusedDropdown={ displayCoaccusedDropdown }
              onClick={ onDropDownButtonClick } />
          </div>
        </ResponsiveFixedWidthComponent>
        {
          <ExpandMotion show={ displayCoaccusedDropdown }>
            <CoaccusedList currentOfficerId={ officerId } coaccused={ coaccused }
              openBottomSheetWithComplaint={ openBottomSheetWithComplaint } crid={ crid }/>
          </ExpandMotion>
        }
      </div>
    );
  }
}

Header.propTypes = {
  crid: PropTypes.string,
  openBottomSheetWithComplaint: PropTypes.func,
  officerId: PropTypes.number,
  coaccused: PropTypes.array,
  displayCoaccusedDropdown: PropTypes.bool,
  onDropDownButtonClick: PropTypes.func
};
