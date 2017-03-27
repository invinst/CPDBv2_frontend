import React, { Component, PropTypes } from 'react';
import { find } from 'lodash';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import CoaccusedList from './coaccused-list';
import { boxShadowStyle, headerStyle, titleStyle, moreCoaccusedStyle } from './header.style';


export default class Header extends Component {
  renderCoaccusedDropdownButton() {
    const { coaccused, officerId, onDropDownButtonClick } = this.props;

    if (!coaccused || coaccused.length <= 1) {
      return null;
    }

    let coaccusedText;
    const anotherCoaccusedFullname = find(coaccused, obj => obj.id !== officerId).fullName;
    if (coaccused.length === 2) {
      coaccusedText = `Coaccused with ${anotherCoaccusedFullname}`;
    } else {
      coaccusedText = `${anotherCoaccusedFullname} and ${coaccused.length - 2} more coaccused`;
    }

    return (
      <span style={ moreCoaccusedStyle } onClick={ onDropDownButtonClick }>{ coaccusedText }</span>
    );
  }

  render() {
    const { crid, officerId, coaccused, openBottomSheetWithComplaint, displayCoaccusedDropdown } = this.props;

    return (
      <div style={ boxShadowStyle }>
        <ResponsiveFixedWidthComponent>
          <div style={ headerStyle }>
            <span style={ titleStyle }>{ `CR ${crid}` }</span>
            {
              this.renderCoaccusedDropdownButton()
            }
          </div>
        </ResponsiveFixedWidthComponent>
        {
          displayCoaccusedDropdown
            ? <CoaccusedList
              currentOfficerId={ officerId } coaccused={ coaccused }
              openBottomSheetWithComplaint={ openBottomSheetWithComplaint } crid={ crid }/>
            : null
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
