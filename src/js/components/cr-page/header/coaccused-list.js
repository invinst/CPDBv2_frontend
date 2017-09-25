import React, { Component, PropTypes } from 'react';
import { map, find, filter, pick, compact } from 'lodash';

import CoaccusedListItem from './coaccused-list-item';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import { coaccusedListWrapperStyle, coaccusedTextStyle, breakSectionStyle } from './coaccused-list.style';


export default class CoaccusedList extends Component {
  render() {
    const { currentOfficerId, coaccused, openBottomSheetWithComplaint, crid, style } = this.props;
    const currentOfficer = find(coaccused, obj => obj.id === currentOfficerId);
    const otherCoaccused = filter(coaccused, obj => obj.id !== currentOfficerId);

    return (
      <div style={ { ...coaccusedListWrapperStyle, ...style } }>
        <ResponsiveFixedWidthComponent>
          <div className='test--coaccused-text' style={ coaccusedTextStyle }>Coaccused</div>
          {
            map(compact([currentOfficer, ...otherCoaccused]), (officer, index) => {
              const props = pick(officer, ['fullName', 'category', 'id', 'badge']);

              return (
                <CoaccusedListItem key={ officer.id }
                  showBottomBorder={ index !== coaccused.length - 1 }
                  viewing={ officer.id === currentOfficerId } { ...props }
                  openBottomSheetWithComplaint={ openBottomSheetWithComplaint } crid={ crid }/>
              );
            })
          }
        </ResponsiveFixedWidthComponent>
        <div style={ breakSectionStyle }/>
      </div>
    );
  }
}

CoaccusedList.propTypes = {
  currentOfficerId: PropTypes.number,
  crid: PropTypes.string,
  openBottomSheetWithComplaint: PropTypes.func,
  coaccused: PropTypes.array,
  style: PropTypes.object
};
